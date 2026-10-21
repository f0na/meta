use tauri::{AppHandle, Manager};
use tauri_plugin_decoration::WebviewWindowExt;

#[tauri::command]
pub async fn show_window(app: AppHandle) {
    let Some(win) = app.get_webview_window("main") else {
        eprintln!("找不到main窗口");
        return
    };
    
    while win.activate_decoration().await.is_ok() {
        break;
    }

    #[cfg(target_os = "macos")]
    {
        let _ = app.show();
    }

    let _ = win.show();
    let _ = win.unminimize();
    let _ = win.set_focus();
}