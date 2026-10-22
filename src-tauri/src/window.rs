use tauri::{AppHandle, Manager};
use tauri_plugin_decoration::WebviewWindowExt;

#[tauri::command]
pub async fn show_window(app: AppHandle) {
    let Some(win) = app.get_webview_window("main") else {
        eprintln!("找不到main窗口");
        return
    };

    // 必须在前端挂载之后调用（见 src/app.tsx 的 useEffect）。
    if let Err(error) = win.activate_decoration().await {
        // 插件在失败时已自行恢复原生边框，这里只负责把原因打出来
        eprintln!("decoration 激活失败: {error:?}");
    }

    #[cfg(target_os = "macos")]
    {
        let _ = app.show();
    }

    let _ = win.show();
    let _ = win.unminimize();
    let _ = win.set_focus();
}