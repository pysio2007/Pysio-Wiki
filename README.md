# Pysio Wiki

基于 [Nextra](https://nextra.site/) 的 Pysio 文档站，使用 Bun 管理依赖。

## 本地开发

```bash
bun install
bun dev
```

## 验证与构建

```bash
bun run check
```

静态站点输出到 `out/` 目录。文档内容位于 `content/`，OpenAPI 规范位于 `public/openapi/`。
