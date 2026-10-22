import { save_theme, Theme } from "@/api/settings"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { useTheme } from "@lacspace/theme"
import { useEffect } from "react"

interface ThemeBtn {
    label: string
    value: Theme
}

const btns: ThemeBtn[] = [{
    label: '系统',
    value: "System"
},
{
    label: "浅色",
    value: "Light"
},
{
    label: "深色",
    value: "Dark"
}
]

export const SettingsPage = () => {
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        save_theme(theme.toUpperCase() as Theme)
    }, [theme])
    return (
        <div className="flex flex-col pl-5 gap-1">
            <span>主题</span>
            <ButtonGroup orientation="horizontal" className="flex flex-row items-center">
                {btns.map((btn) => (
                    <Button variant={theme == btn.value.toLowerCase() ? "default" : "outline"} onClick={() => setTheme(btn.value.toLowerCase())}>
                        {btn.label}
                    </Button>
                ))}
            </ButtonGroup>
        </div>


    )
}