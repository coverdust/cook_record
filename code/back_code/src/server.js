import { createServer } from "node:http";
import { Buffer } from "node:buffer";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  addRecipeVersion,
  buildExportSnapshot,
  buildShoppingList,
  convertInspiration,
  createCookLog,
  createGoal,
  createInspiration,
  createRecipe,
  deleteInspiration,
  deleteRecipe,
  extractRecipe,
  getGrowthOverview,
  getRecipe,
  listCookLogs,
  listRecipes,
  replaceFromImport,
  updateGoal,
  updateRecipe,
  updateSettings
} from "./domain.js";
import { HttpError } from "./errors.js";
import { JsonStore } from "./store.js";
import { createZip } from "./zip.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultDataFile = join(__dirname, "..", "data", "cook_record.json");

export function createApp({ store }) {
  return async function app(request, response) {
    try {
      if (request.method === "OPTIONS") {
        sendNoContent(response);
        return;
      }

      const url = new URL(request.url, "http://localhost");
      const route = `${request.method} ${url.pathname}`;
      const body = await readJsonBody(request);

      if (route === "GET /health") {
        sendJson(response, 200, { ok: true, data: { status: "ok", service: "cook-record-backend" } });
        return;
      }

      if (route === "GET /api/recipes") {
        const data = await store.read();
        sendJson(response, 200, { ok: true, data: listRecipes(data, url.searchParams) });
        return;
      }

      if (route === "POST /api/recipes") {
        const data = await store.update((draft) => createRecipe(draft, body));
        sendJson(response, 201, { ok: true, data });
        return;
      }

      const recipeId = matchPath(url.pathname, /^\/api\/recipes\/([^/]+)$/);
      if (recipeId && request.method === "GET") {
        const data = await store.read();
        sendJson(response, 200, { ok: true, data: getRecipe(data, recipeId) });
        return;
      }

      if (recipeId && request.method === "PATCH") {
        const data = await store.update((draft) => updateRecipe(draft, recipeId, body));
        sendJson(response, 200, { ok: true, data });
        return;
      }

      if (recipeId && request.method === "DELETE") {
        const data = await store.update((draft) => deleteRecipe(draft, recipeId));
        sendJson(response, 200, { ok: true, data });
        return;
      }

      const versionRecipeId = matchPath(url.pathname, /^\/api\/recipes\/([^/]+)\/versions$/);
      if (versionRecipeId && request.method === "POST") {
        const data = await store.update((draft) => addRecipeVersion(draft, versionRecipeId, body));
        sendJson(response, 201, { ok: true, data });
        return;
      }

      if (route === "GET /api/cook-logs") {
        const data = await store.read();
        sendJson(response, 200, { ok: true, data: listCookLogs(data, url.searchParams) });
        return;
      }

      if (route === "POST /api/cook-logs") {
        const data = await store.update((draft) => createCookLog(draft, body));
        sendJson(response, 201, { ok: true, data });
        return;
      }

      if (route === "GET /api/inspirations") {
        const data = await store.read();
        sendJson(response, 200, { ok: true, data: data.inspirations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
        return;
      }

      if (route === "POST /api/inspirations") {
        const data = await store.update((draft) => createInspiration(draft, body));
        sendJson(response, 201, { ok: true, data });
        return;
      }

      const inspirationConvertId = matchPath(url.pathname, /^\/api\/inspirations\/([^/]+)\/convert$/);
      if (inspirationConvertId && request.method === "POST") {
        const data = await store.update((draft) => convertInspiration(draft, inspirationConvertId));
        sendJson(response, 201, { ok: true, data });
        return;
      }

      const inspirationId = matchPath(url.pathname, /^\/api\/inspirations\/([^/]+)$/);
      if (inspirationId && request.method === "DELETE") {
        const data = await store.update((draft) => deleteInspiration(draft, inspirationId));
        sendJson(response, 200, { ok: true, data });
        return;
      }

      if (route === "GET /api/growth") {
        const data = await store.read();
        sendJson(response, 200, { ok: true, data: getGrowthOverview(data) });
        return;
      }

      if (route === "POST /api/shopping-list") {
        const data = await store.read();
        sendJson(response, 200, { ok: true, data: buildShoppingList(data, body) });
        return;
      }

      if (route === "GET /api/goals") {
        const data = await store.read();
        sendJson(response, 200, { ok: true, data: data.goals });
        return;
      }

      if (route === "POST /api/goals") {
        const data = await store.update((draft) => createGoal(draft, body));
        sendJson(response, 201, { ok: true, data });
        return;
      }

      const goalId = matchPath(url.pathname, /^\/api\/goals\/([^/]+)$/);
      if (goalId && request.method === "PATCH") {
        const data = await store.update((draft) => updateGoal(draft, goalId, body));
        sendJson(response, 200, { ok: true, data });
        return;
      }

      if (route === "POST /api/extract") {
        sendJson(response, 200, { ok: true, data: extractRecipe(body) });
        return;
      }

      if (route === "GET /api/export") {
        const data = await store.update((draft) => {
          draft.settings.lastExportedAt = new Date().toISOString();
          return buildExportSnapshot(draft);
        });
        const payload = JSON.stringify(data, null, 2);
        const filename = `私厨备份_${formatTimestamp(new Date())}.zip`;
        const zip = createZip([
          { name: "data.json", data: payload },
          { name: "media/README.txt", data: "媒体文件在当前 Web 版后端中以路径元数据管理。移动端接入后可替换为真实文件打包。\n" }
        ]);
        sendBuffer(response, 200, zip, {
          "content-type": "application/zip",
          "content-disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`
        });
        return;
      }

      if (route === "GET /api/export/json") {
        const data = await store.update((draft) => {
          draft.settings.lastExportedAt = new Date().toISOString();
          return buildExportSnapshot(draft);
        });
        sendJson(response, 200, { ok: true, data });
        return;
      }

      if (route === "POST /api/import") {
        const data = await store.update((draft) => replaceFromImport(draft, body));
        sendJson(response, 200, { ok: true, data });
        return;
      }

      if (route === "GET /api/settings") {
        const data = await store.read();
        sendJson(response, 200, { ok: true, data: data.settings });
        return;
      }

      if (route === "PATCH /api/settings") {
        const data = await store.update((draft) => updateSettings(draft, body));
        sendJson(response, 200, { ok: true, data });
        return;
      }

      throw new HttpError(404, "接口不存在");
    } catch (error) {
      handleError(response, error);
    }
  };
}

export async function startServer({ port = Number(process.env.PORT || 8787), dataFile = process.env.DATA_FILE || defaultDataFile } = {}) {
  const store = new JsonStore(dataFile);
  await store.init();

  const server = createServer(createApp({ store }));

  await new Promise((resolve) => {
    server.listen(port, resolve);
  });

  return { server, port, dataFile };
}

async function readJsonBody(request) {
  if (!["POST", "PUT", "PATCH"].includes(request.method)) return {};
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    throw new HttpError(400, "请求体不是合法 JSON");
  }
}

function sendJson(response, status, payload) {
  sendBuffer(response, status, Buffer.from(JSON.stringify(payload)), {
    "content-type": "application/json; charset=utf-8"
  });
}

function sendBuffer(response, status, payload, headers = {}) {
  response.writeHead(status, {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type",
    "content-length": payload.length,
    ...headers
  });
  response.end(payload);
}

function sendNoContent(response) {
  response.writeHead(204, {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type"
  });
  response.end();
}

function handleError(response, error) {
  const status = error.status || 500;
  const message = status === 500 ? "服务器内部错误" : error.message;
  if (status === 500) console.error(error);
  sendJson(response, status, {
    ok: false,
    error: {
      message,
      details: error.details
    }
  });
}

function matchPath(pathname, pattern) {
  const match = pathname.match(pattern);
  return match ? decodeURIComponent(match[1]) : null;
}

function formatTimestamp(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}_${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { port, dataFile } = await startServer();
  console.log(`成长食记后端已启动：http://localhost:${port}`);
  console.log(`数据文件：${dataFile}`);
}
