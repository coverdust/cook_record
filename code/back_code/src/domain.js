import { randomUUID } from "node:crypto";
import { HttpError, assertRequired } from "./errors.js";

const scoreKeys = ["color", "aroma", "taste", "texture", "fidelity"];
const systemBadges = [
  { code: "first_log", name: "初入江湖", note: "完成第一次下厨记录" },
  { code: "review_master", name: "复盘达人", note: "累计写满20篇下厨日记" },
  { code: "three_success", name: "小有所成", note: "同一道菜成功3次" },
  { code: "ten_mastered", name: "独当一面", note: "掌握10道菜" },
  { code: "seven_day_streak", name: "连续挑战", note: "连续7天下厨" }
];

export function nowIso() {
  return new Date().toISOString();
}

export function toRecipeDto(data, recipe) {
  const versions = data.recipeVersions.filter((version) => version.recipeId === recipe.id);
  const logs = data.cookLogs.filter((log) => log.recipeId === recipe.id);
  const averageRating = average(logs.map((log) => average(Object.values(log.scores ?? {}))));

  return {
    ...recipe,
    versions,
    cookCount: logs.length,
    successCount: logs.filter((log) => log.isSuccess).length,
    rating: Number((averageRating || 0).toFixed(1))
  };
}

export function listRecipes(data, query) {
  const tag = query.get("tag");
  const keyword = query.get("q")?.trim().toLowerCase();
  const status = query.get("status");

  return data.recipes
    .filter((recipe) => !tag || recipe.tags.includes(tag))
    .filter((recipe) => !status || recipe.status === status)
    .filter((recipe) => !keyword || recipe.name.toLowerCase().includes(keyword) || recipe.tags.some((item) => item.toLowerCase().includes(keyword)))
    .map((recipe) => toRecipeDto(data, recipe))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export function getRecipe(data, id) {
  const recipe = data.recipes.find((item) => item.id === id);
  if (!recipe) throw new HttpError(404, "菜谱不存在");

  return {
    ...toRecipeDto(data, recipe),
    logs: data.cookLogs
      .filter((log) => log.recipeId === id)
      .sort((a, b) => new Date(b.logDate) - new Date(a.logDate))
  };
}

export function createRecipe(data, body) {
  assertRequired(body.name, "菜名");

  const timestamp = nowIso();
  const recipeId = randomUUID();
  const versionId = randomUUID();
  const versionName = body.version || "v1";

  const recipe = {
    id: recipeId,
    name: String(body.name).trim(),
    type: body.type || "未分类",
    coverPath: body.coverPath || "",
    status: body.status || "learning",
    tags: normalizeStringArray(body.tags),
    currentVersionId: versionId,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  const version = {
    id: versionId,
    recipeId,
    version: versionName,
    ingredients: normalizeIngredients(body.ingredients),
    steps: normalizeSteps(body.steps),
    videoUrl: body.videoUrl || "",
    createdAt: timestamp
  };

  data.recipes.push(recipe);
  data.recipeVersions.push(version);
  return toRecipeDto(data, recipe);
}

export function updateRecipe(data, id, body) {
  const recipe = data.recipes.find((item) => item.id === id);
  if (!recipe) throw new HttpError(404, "菜谱不存在");

  if (body.name !== undefined) recipe.name = String(body.name).trim();
  if (body.type !== undefined) recipe.type = body.type;
  if (body.coverPath !== undefined) recipe.coverPath = body.coverPath;
  if (body.status !== undefined) recipe.status = body.status;
  if (body.tags !== undefined) recipe.tags = normalizeStringArray(body.tags);
  recipe.updatedAt = nowIso();

  return toRecipeDto(data, recipe);
}

export function addRecipeVersion(data, recipeId, body) {
  const recipe = data.recipes.find((item) => item.id === recipeId);
  if (!recipe) throw new HttpError(404, "菜谱不存在");

  const version = {
    id: randomUUID(),
    recipeId,
    version: body.version || `v${data.recipeVersions.filter((item) => item.recipeId === recipeId).length + 1}`,
    ingredients: normalizeIngredients(body.ingredients),
    steps: normalizeSteps(body.steps),
    videoUrl: body.videoUrl || "",
    createdAt: nowIso()
  };

  data.recipeVersions.push(version);
  recipe.currentVersionId = version.id;
  recipe.updatedAt = nowIso();
  return version;
}

export function deleteRecipe(data, id) {
  const exists = data.recipes.some((item) => item.id === id);
  if (!exists) throw new HttpError(404, "菜谱不存在");

  data.recipes = data.recipes.filter((item) => item.id !== id);
  data.recipeVersions = data.recipeVersions.filter((item) => item.recipeId !== id);
  data.cookLogs = data.cookLogs.filter((item) => item.recipeId !== id);
  return { deleted: true };
}

export function createCookLog(data, body) {
  assertRequired(body.recipeId, "recipeId");
  const recipe = data.recipes.find((item) => item.id === body.recipeId);
  if (!recipe) throw new HttpError(404, "菜谱不存在");

  const reason = String(body.reason || "").trim();
  if (!reason) throw new HttpError(400, body.isSuccess === false ? "失败原因不能为空" : "成功秘诀不能为空");

  const versionId = body.versionId || recipe.currentVersionId;
  if (!data.recipeVersions.some((item) => item.id === versionId && item.recipeId === recipe.id)) {
    throw new HttpError(400, "菜谱版本不存在或不属于该菜谱");
  }

  const log = {
    id: randomUUID(),
    recipeId: recipe.id,
    versionId,
    logDate: body.logDate || new Date().toISOString().slice(0, 10),
    isSuccess: Boolean(body.isSuccess),
    scores: normalizeScores(body.scores),
    reason,
    notes: body.notes || "",
    mediaPaths: normalizeStringArray(body.mediaPaths),
    createdAt: nowIso()
  };

  data.cookLogs.push(log);
  recipe.updatedAt = nowIso();
  const unlockedBadges = unlockBadges(data);

  return { log, unlockedBadges };
}

export function listCookLogs(data, query) {
  const recipeId = query.get("recipeId");
  return data.cookLogs
    .filter((log) => !recipeId || log.recipeId === recipeId)
    .sort((a, b) => new Date(b.logDate) - new Date(a.logDate));
}

export function createInspiration(data, body) {
  assertRequired(body.title || body.content || body.link, "灵感内容");
  const timestamp = nowIso();
  const item = {
    id: randomUUID(),
    title: body.title || inferTitle(body.content || body.link),
    content: body.content || "",
    link: body.link || "",
    source: body.source || inferSource(body.link),
    tag: body.tag || "待整理",
    isConverted: false,
    createdAt: timestamp
  };
  data.inspirations.push(item);
  return item;
}

export function convertInspiration(data, id) {
  const item = data.inspirations.find((entry) => entry.id === id);
  if (!item) throw new HttpError(404, "灵感不存在");

  const parsed = parseRecipeText(`${item.title}\n${item.content}\n${item.link}`);
  const recipe = createRecipe(data, {
    name: parsed.name || item.title || "未命名菜谱",
    tags: [item.tag, "灵感转入"].filter(Boolean),
    ingredients: parsed.ingredients,
    steps: parsed.steps,
    videoUrl: item.link
  });
  item.isConverted = true;
  item.recipeId = recipe.id;
  return { inspiration: item, recipe };
}

export function deleteInspiration(data, id) {
  const exists = data.inspirations.some((item) => item.id === id);
  if (!exists) throw new HttpError(404, "灵感不存在");
  data.inspirations = data.inspirations.filter((item) => item.id !== id);
  return { deleted: true };
}

export function buildShoppingList(data, body) {
  const recipeIds = Array.isArray(body.recipeIds) && body.recipeIds.length ? body.recipeIds : data.recipes.slice(0, 3).map((recipe) => recipe.id);
  const checked = new Set(normalizeStringArray(body.checked));
  const groups = new Map();

  for (const recipeId of recipeIds) {
    const recipe = data.recipes.find((item) => item.id === recipeId);
    if (!recipe) continue;
    const version = data.recipeVersions.find((item) => item.id === recipe.currentVersionId);
    if (!version) continue;
    const groupName = recipe.type || "其他";

    if (!groups.has(groupName)) groups.set(groupName, []);
    for (const ingredient of version.ingredients) {
      const label = `${ingredient.name}${ingredient.amount ? ` ${ingredient.amount}` : ""}`;
      groups.get(groupName).push({ name: ingredient.name, amount: ingredient.amount, label, checked: checked.has(label) });
    }
  }

  return Array.from(groups.entries()).map(([title, items]) => ({
    title,
    items: items.sort((a, b) => Number(a.checked) - Number(b.checked))
  }));
}

export function createGoal(data, body) {
  assertRequired(body.title, "目标名称");
  const goal = {
    id: randomUUID(),
    title: String(body.title).trim(),
    targetCount: Number(body.targetCount || 1),
    currentCount: Number(body.currentCount || 0),
    isDone: false,
    createdAt: nowIso()
  };
  data.goals.push(goal);
  return goal;
}

export function updateGoal(data, id, body) {
  const goal = data.goals.find((item) => item.id === id);
  if (!goal) throw new HttpError(404, "目标不存在");
  if (body.title !== undefined) goal.title = String(body.title).trim();
  if (body.targetCount !== undefined) goal.targetCount = Number(body.targetCount);
  if (body.currentCount !== undefined) goal.currentCount = Number(body.currentCount);
  if (body.isDone !== undefined) goal.isDone = Boolean(body.isDone);
  return goal;
}

export function getGrowthOverview(data) {
  const uniqueCookDays = new Set(data.cookLogs.map((log) => log.logDate)).size;
  const masteredCount = data.recipes.filter((recipe) => recipe.status === "mastered" || recipe.tags.includes("拿手菜")).length;
  const wall = buildSignatureWall(data);

  return {
    stats: {
      cookDays: uniqueCookDays,
      cookLogs: data.cookLogs.length,
      masteredRecipes: masteredCount
    },
    signatureWall: wall,
    radar: buildRadar(data.cookLogs),
    comparisons: buildComparisons(data),
    badges: buildBadges(data),
    timeline: buildTimeline(data)
  };
}

export function extractRecipe(body) {
  assertRequired(body.text, "解析文本");
  const parsed = parseRecipeText(String(body.text));
  const confidence = Math.min(0.95, 0.35 + parsed.ingredients.length * 0.1 + parsed.steps.length * 0.12);

  return {
    status: confidence >= 0.65 ? "success" : "partial",
    confidence: Number(confidence.toFixed(2)),
    ...parsed,
    warnings: confidence >= 0.65 ? [] : ["识别结果不完整，请手动补充食材或步骤"]
  };
}

export function buildExportSnapshot(data) {
  const exportedAt = nowIso();
  return {
    app: "成长食记",
    schemaVersion: data.schemaVersion,
    exportedAt,
    media: {
      mode: "metadata-only",
      paths: Array.from(new Set(data.cookLogs.flatMap((log) => log.mediaPaths || [])))
    },
    data
  };
}

export function replaceFromImport(data, payload) {
  const next = payload?.data || payload;
  validateSnapshot(next);

  for (const key of Object.keys(data)) {
    delete data[key];
  }
  Object.assign(data, next);
  return { imported: true, schemaVersion: data.schemaVersion };
}

export function updateSettings(data, body) {
  data.settings = { ...data.settings, ...body };
  return data.settings;
}

function buildSignatureWall(data) {
  return data.recipes
    .map((recipe) => {
      const logs = data.cookLogs.filter((log) => log.recipeId === recipe.id);
      const successCount = logs.filter((log) => log.isSuccess).length;
      const rating = average(logs.map((log) => average(Object.values(log.scores ?? {}))));
      const weight = successCount * 0.6 + rating * 0.4;
      return { ...toRecipeDto(data, recipe), weight: Number(weight.toFixed(2)) };
    })
    .filter((recipe) => recipe.successCount > 0 || recipe.status === "mastered")
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 10);
}

function buildRadar(logs) {
  const values = {};
  for (const key of scoreKeys) {
    values[key] = Number(average(logs.map((log) => log.scores?.[key]).filter(Number.isFinite)).toFixed(1));
  }
  return [
    { key: "color", label: "色泽", value: values.color || 0 },
    { key: "aroma", label: "香气", value: values.aroma || 0 },
    { key: "taste", label: "味道", value: values.taste || 0 },
    { key: "texture", label: "口感", value: values.texture || 0 },
    { key: "fidelity", label: "还原度", value: values.fidelity || 0 }
  ];
}

function buildComparisons(data) {
  return data.recipes
    .map((recipe) => {
      const logs = data.cookLogs.filter((log) => log.recipeId === recipe.id).sort((a, b) => new Date(a.logDate) - new Date(b.logDate));
      if (logs.length < 2) return null;
      const first = logs[0];
      const latest = logs[logs.length - 1];
      return {
        recipeId: recipe.id,
        name: recipe.name,
        first: toLogSummary(first),
        latest: toLogSummary(latest),
        delta: Number((average(Object.values(latest.scores)) - average(Object.values(first.scores))).toFixed(1))
      };
    })
    .filter(Boolean);
}

function buildBadges(data) {
  const unlocked = new Map((data.badges || []).map((badge) => [badge.code, badge]));
  return systemBadges.map((badge) => ({
    ...badge,
    unlocked: unlocked.has(badge.code),
    unlockedAt: unlocked.get(badge.code)?.unlockedAt || null
  }));
}

function unlockBadges(data) {
  const before = new Set((data.badges || []).map((badge) => badge.code));
  const timestamp = nowIso();
  const successByRecipe = new Map();

  for (const log of data.cookLogs) {
    if (!log.isSuccess) continue;
    successByRecipe.set(log.recipeId, (successByRecipe.get(log.recipeId) || 0) + 1);
  }

  const rules = [
    ["first_log", data.cookLogs.length >= 1],
    ["review_master", data.cookLogs.filter((log) => log.reason || log.notes).length >= 20],
    ["three_success", Array.from(successByRecipe.values()).some((count) => count >= 3)],
    ["ten_mastered", data.recipes.filter((recipe) => recipe.status === "mastered").length >= 10],
    ["seven_day_streak", hasSevenDayStreak(data.cookLogs)]
  ];

  data.badges ||= [];
  for (const [code, passed] of rules) {
    if (!passed || before.has(code)) continue;
    const badge = systemBadges.find((item) => item.code === code);
    data.badges.push({ ...badge, unlockedAt: timestamp });
  }

  return data.badges.filter((badge) => !before.has(badge.code));
}

function buildTimeline(data) {
  const items = [];
  const firstLog = [...data.cookLogs].sort((a, b) => new Date(a.logDate) - new Date(b.logDate))[0];
  if (firstLog) {
    const recipe = data.recipes.find((item) => item.id === firstLog.recipeId);
    items.push({ date: firstLog.logDate, text: `第一次记录下厨：${recipe?.name || "未命名菜谱"}。` });
  }

  if (data.cookLogs.length >= 10) items.push({ date: data.cookLogs[9].logDate, text: "累计完成第 10 次下厨记录。" });
  if (data.cookLogs.length >= 100) items.push({ date: data.cookLogs[99].logDate, text: "累计完成第 100 次下厨记录。" });

  for (const recipe of buildSignatureWall(data).slice(0, 3)) {
    items.push({ date: recipe.updatedAt.slice(0, 10), text: `${recipe.name}成为拿手菜，已成功 ${recipe.successCount} 次。` });
  }

  return items.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
}

function parseRecipeText(text) {
  const lines = text
    .split(/\r?\n|。|；|;/)
    .map((line) => line.trim())
    .filter(Boolean);

  const firstLine = lines[0] || "";
  const nameMatch = firstLine.match(/^([\u4e00-\u9fa5A-Za-z0-9\s]{2,20})[:：]/);
  const name = nameMatch?.[1]?.trim() || "";
  const ingredientPattern = /([\u4e00-\u9fa5A-Za-z]+)\s*(\d+(?:\.\d+)?\s*(?:g|克|斤|毫升|ml|勺|颗|个|把|盒|片)|适量|少许)/gi;
  const ingredients = [];
  let match;
  while ((match = ingredientPattern.exec(text)) !== null) {
    const item = { name: match[1], amount: match[2].replace(/\s+/g, "") };
    if (!ingredients.some((ingredient) => ingredient.name === item.name && ingredient.amount === item.amount)) {
      ingredients.push(item);
    }
  }

  const stepWords = ["先", "再", "然后", "加入", "放入", "小火", "大火", "焯水", "翻炒", "炖", "煎", "炸", "收汁", "出锅"];
  const steps = lines
    .filter((line) => /^\d+[.、]/.test(line) || /^步骤[一二三四五六七八九十]/.test(line) || stepWords.some((word) => line.includes(word)))
    .map((line, index) => ({ order: index + 1, text: line.replace(/^\d+[.、]\s*/, "").replace(/^步骤[一二三四五六七八九十][：:]\s*/, "") }));

  return {
    name,
    ingredients,
    steps: steps.length ? steps : lines.slice(0, 4).map((line, index) => ({ order: index + 1, text: line })),
    rawText: text
  };
}

function validateSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== "object") throw new HttpError(400, "备份数据格式错误");
  for (const key of ["recipes", "recipeVersions", "cookLogs", "inspirations", "badges", "goals", "settings"]) {
    if (snapshot[key] === undefined) throw new HttpError(400, `备份缺少 ${key}`);
  }
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
}

function normalizeIngredients(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      name: String(item?.name || "").trim(),
      amount: String(item?.amount || "").trim()
    }))
    .filter((item) => item.name);
}

function normalizeSteps(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item, index) => ({
      order: Number(item?.order || index + 1),
      text: String(item?.text || item?.desc || "").trim(),
      mediaPath: item?.mediaPath || item?.img || ""
    }))
    .filter((item) => item.text);
}

function normalizeScores(value = {}) {
  const result = {};
  for (const key of scoreKeys) {
    const score = Number(value[key] ?? 3);
    result[key] = Math.max(1, Math.min(5, Number.isFinite(score) ? score : 3));
  }
  return result;
}

function average(values) {
  const valid = values.filter((value) => Number.isFinite(value));
  if (!valid.length) return 0;
  return valid.reduce((sum, value) => sum + value, 0) / valid.length;
}

function toLogSummary(log) {
  return {
    id: log.id,
    date: log.logDate,
    score: Number(average(Object.values(log.scores ?? {})).toFixed(1)),
    reason: log.reason,
    notes: log.notes,
    isSuccess: log.isSuccess,
    mediaPaths: log.mediaPaths
  };
}

function hasSevenDayStreak(logs) {
  const days = Array.from(new Set(logs.map((log) => log.logDate))).sort();
  let streak = 1;
  for (let index = 1; index < days.length; index += 1) {
    const previous = new Date(`${days[index - 1]}T00:00:00.000Z`);
    const current = new Date(`${days[index]}T00:00:00.000Z`);
    const diffDays = (current - previous) / 86400000;
    streak = diffDays === 1 ? streak + 1 : 1;
    if (streak >= 7) return true;
  }
  return false;
}

function inferTitle(text) {
  return String(text || "新灵感").slice(0, 24);
}

function inferSource(link = "") {
  if (link.includes("bilibili")) return "B站链接";
  if (link.includes("douyin")) return "抖音视频";
  if (link.includes("youtube")) return "YouTube链接";
  return link ? "网页链接" : "一句话灵感";
}
