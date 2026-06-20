# 成长食记后端

这是为当前前端原型补齐的本地后端服务。实现目标是贴合“纯本地、无账号、可导入导出迁移”的产品要求，同时给前端提供稳定 API 契约。

## 运行

```bash
npm run dev
```

默认启动在 `http://localhost:8787`，数据保存在 `code/back_code/data/cook_record.json`。

可选环境变量：

```bash
PORT=8787
DATA_FILE=./data/cook_record.json
```

## 测试

```bash
npm test
```

测试会启动临时服务，验证菜谱、下厨记录、成长统计、智能提取、导出接口。

## API 概览

所有 JSON 接口成功返回：

```json
{ "ok": true, "data": {} }
```

失败返回：

```json
{ "ok": false, "error": { "message": "错误信息" } }
```

主要接口：

- `GET /health`
- `GET /api/recipes?q=&tag=&status=`
- `POST /api/recipes`
- `GET /api/recipes/:id`
- `PATCH /api/recipes/:id`
- `DELETE /api/recipes/:id`
- `POST /api/recipes/:id/versions`
- `GET /api/cook-logs?recipeId=`
- `POST /api/cook-logs`
- `GET /api/inspirations`
- `POST /api/inspirations`
- `POST /api/inspirations/:id/convert`
- `DELETE /api/inspirations/:id`
- `GET /api/growth`
- `POST /api/shopping-list`
- `GET /api/goals`
- `POST /api/goals`
- `PATCH /api/goals/:id`
- `POST /api/extract`
- `GET /api/export`
- `GET /api/export/json`
- `POST /api/import`
- `GET /api/settings`
- `PATCH /api/settings`

## 设计说明

- 目前后端使用 JSON 文件持久化，不引入外部依赖，便于在当前仓库直接运行。
- 数据模型按原技术方案中的 `recipes`、`recipe_versions`、`cook_logs`、`inspirations`、`badges`、`goals`、`settings` 拆分。
- `/api/export` 会生成包含 `data.json` 的 ZIP 包。当前 Web 版没有真实媒体上传，媒体先以路径元数据记录；后续接移动端时可替换为真实沙盒文件打包。
- `/api/import` 接收导出的 JSON 快照并覆盖当前数据，调用前端时应保留“确认覆盖”的二次确认流程。
