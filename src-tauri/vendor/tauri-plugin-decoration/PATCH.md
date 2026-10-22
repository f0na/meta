# 本地补丁说明

这是 `tauri-plugin-decoration` 3.0.5 的源码副本，只为一个 bug 打了补丁。

## 问题

`src/lib.rs` 中 `DocumentBootReceipt::Registered` 的字段：

```rust
#[serde(rename_all = "camelCase", tag = "status")]
enum DocumentBootReceipt {
    Registered { document_lease: String },
}
```

`rename_all` 只重命名枚举变体（`Registered` → `"registered"`），**不会**重命名结构体变体里的字段，所以实际 JSON 是：

```json
{ "status": "registered", "document_lease": "1" }
```

而 `src/js/titlebar.js` 读取的是 `challenge?.documentLease`（驼峰），得到 `undefined`，判定为无效响应 → 重试 4 次 → 放弃，`documentBootAnnounced` 永远为 `false`。之后 `challengeDocument()` 能成功，但 `announceDocumentReady()` 始终提前返回，`frontend_document_ready` 不会发出，最终表现为：

```
ActivationTimeout: decoration activation exceeded 5s
```

冷启动（页面加载慢、boot 先于应用挂载）时必现；热启动时如果 boot 恰好拿到 `Accepted` 分支（嵌套的 `DocumentChallenge` 是驼峰）就会偶然成功。

## 修复

给 `document_lease` 字段显式加上 `#[serde(rename = "documentLease")]`。

升级到修复了该问题的上游版本后，删除本目录和 `Cargo.toml` 里的 `[patch.crates-io]` 即可。
