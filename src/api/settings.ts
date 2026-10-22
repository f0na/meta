import { invoke } from "@tauri-apps/api/core";

type Theme =
    | 'System'
    | 'Light'
    | 'Dark'

const get_theme = async () => {
    const [id, theme] = await invoke<[string, Theme]>('theme')
    return { id, theme }
}

const save_theme = async (t: Theme) => {
    const theme_obj = await get_theme()
    invoke('set_theme', { id: theme_obj.id, theme: t })
}

export { get_theme, type Theme, save_theme }