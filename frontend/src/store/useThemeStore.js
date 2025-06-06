import {create} from "zustand"

export const useThemeStore = create((set)=>({
    theme: localStorage.getItem("my-theme") || "cupcake",
    setTheme: (theme)=>{
        localStorage.setItem("my-theme",theme)
        set({theme:theme})
    }
}))