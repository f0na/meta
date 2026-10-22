use uuid::Uuid;

use crate::{
    AppState,
    model::settings::{Settings, Theme},
};

// remember to call `.manage(MyState::default())`
#[tauri::command]
pub async fn set_theme(
    state: tauri::State<'_, AppState>,
    id: Uuid,
    theme: Theme,
) -> Result<(), String> {
    let mut db = state.db.lock().await;

    Settings::update_by_id(id)
        .theme(theme)
        .exec(&mut *db)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn theme(state: tauri::State<'_, AppState>) -> Result<(String, Theme), String> {
    let mut db = state.db.lock().await;

    let existing = Settings::all()
        .first()
        .exec(&mut *db)
        .await
        .map_err(|e| e.to_string())?;

    let setting = match existing {
        Some(s) => s,
        None => toasty::create!(Settings {})
            .exec(&mut *db)
            .await
            .map_err(|e| e.to_string())?,
    };
    Ok((setting.id.to_string(), setting.theme.0))
}
