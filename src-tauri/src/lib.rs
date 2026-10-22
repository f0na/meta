use tokio::sync::Mutex;

use tauri::Manager;

use crate::{
    cmd::settings,
    window::show_window,
};

mod cmd;
mod model;
mod window;

pub struct AppState {
    db: Mutex<toasty::Db>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_decoration::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::block_on(async move {
                let db = toasty::Db::builder()
                    .models(models())
                    .connect("sqlite:./metatron.db")
                    .await
                    .expect("连接数据库失败!");
                handle.manage(AppState { db: Mutex::new(db) });
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            show_window,
            settings::set_theme,
            settings::theme
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

pub fn models() -> toasty::ModelSet {
    toasty::models!(crate::*)
}
