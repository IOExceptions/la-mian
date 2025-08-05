"use client"

import { Bell, User, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { type Language, languages } from "@/lib/i18n"

export function MiniHeader() {
  const { language, setLanguage } = useLanguage()

  const getAppName = () => {
    switch (language) {
      case "en":
        return "Ichiran Ramen"
      case "ja":
        return "一蘭ラーメン"
      default:
        return "一兰拉面"
    }
  }

  return (
    <header className="bg-red-600 text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-red-600 font-bold text-sm">拉</span>
        </div>
        <div>
          <h1 className="font-bold text-lg">{getAppName()}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:bg-red-700 px-2 py-1 rounded-md transition-colors">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{languages[language]}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            {Object.entries(languages).map(([code, name]) => (
              <DropdownMenuItem
                key={code}
                onClick={() => setLanguage(code as Language)}
                className={`cursor-pointer ${language === code ? "bg-red-50 text-red-600" : ""}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{name}</span>
                  {language === code && <div className="w-2 h-2 bg-red-600 rounded-full"></div>}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <div className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-4 h-4 rounded-full p-0 flex items-center justify-center bg-yellow-500 text-red-600 text-xs">
            3
          </Badge>
        </div>

        {/* User */}
        <User className="w-5 h-5" />
      </div>
    </header>
  )
}
