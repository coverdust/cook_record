import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { startServer } from "../src/server.js";

const tempDir = await mkdtemp(join(tmpdir(), "cook-record-backend-"));
const dataFile = join(tempDir, "data.json");
const { server, port } = await startServer({ port: 0, dataFile });
const baseUrl = `http://127.0.0.1:${server.address().port}`;

try {
  const health = await request("GET", "/health");
  assert.equal(health.ok, true);

  const recipes = await request("GET", "/api/recipes");
  assert.equal(recipes.ok, true);
  assert.ok(recipes.data.length >= 5);

  const createdRecipe = await request("POST", "/api/recipes", {
    name: "测试番茄炒蛋",
    type: "素菜",
    tags: ["快手菜"],
    ingredients: [
      { name: "番茄", amount: "2个" },
      { name: "鸡蛋", amount: "3个" }
    ],
    steps: [{ text: "先炒鸡蛋，再下番茄。" }]
  });
  assert.equal(createdRecipe.ok, true);
  assert.equal(createdRecipe.data.name, "测试番茄炒蛋");

  const invalidLog = await request("POST", "/api/cook-logs", {
    recipeId: createdRecipe.data.id,
    isSuccess: true,
    scores: { color: 5 }
  });
  assert.equal(invalidLog.ok, false);
  assert.equal(invalidLog.error.message, "成功秘诀不能为空");

  const log = await request("POST", "/api/cook-logs", {
    recipeId: createdRecipe.data.id,
    isSuccess: true,
    reason: "鸡蛋先盛出，口感更嫩。",
    scores: { color: 4, aroma: 4, taste: 5, texture: 5, fidelity: 4 }
  });
  assert.equal(log.ok, true);
  assert.equal(log.data.log.recipeId, createdRecipe.data.id);

  const growth = await request("GET", "/api/growth");
  assert.equal(growth.ok, true);
  assert.ok(growth.data.stats.cookLogs >= 1);

  const extract = await request("POST", "/api/extract", {
    text: "红烧肉：五花肉500g，冰糖30g，生抽2勺。先焯水，再炒糖色，小火炖80分钟。"
  });
  assert.equal(extract.ok, true);
  assert.ok(extract.data.ingredients.length >= 2);

  const exportJson = await request("GET", "/api/export/json");
  assert.equal(exportJson.ok, true);
  assert.equal(exportJson.data.app, "成长食记");

  const zipResponse = await fetch(`${baseUrl}/api/export`);
  assert.equal(zipResponse.status, 200);
  assert.equal(zipResponse.headers.get("content-type"), "application/zip");
  const zipBuffer = Buffer.from(await zipResponse.arrayBuffer());
  assert.equal(zipBuffer.readUInt32LE(0), 0x04034b50);

  console.log(`Smoke tests passed on port ${port}`);
} finally {
  await new Promise((resolve) => server.close(resolve));
  await rm(tempDir, { recursive: true, force: true });
}

async function request(method, path, body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined
  });
  return response.json();
}
