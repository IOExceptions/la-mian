"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, User } from 'lucide-react'
import { useLanguage } from "@/contexts/language-context"

export function BottomNav() {
  const pathname = usePathname()
  const { language } = useLanguage()

  const navItems = [
    {
      id: "home",
      href: "/",
      icon: Home,
      label: {
        zh: "首页",
        en: "Home", 
        ja: "ホーム"
      }
    },
    {
      id: "order",
      href: "/delivery",
      icon: ShoppingBag,
      label: {
        zh: "点餐",
        en: "Order",
        ja: "注文"
      }
    },
    {
      id: "profile", 
      href: "/profile",
      icon: User,
      label: {
        zh: "我的",
        en: "Profile",
        ja: "マイページ"
      }
    }
  ]

  const getLabel = (item: any) => {
    if (language === "en") return item.label.en
    if (language === "ja") return item.label.ja
    return item.label.zh
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    if (href === "/delivery") {
      return pathname === "/delivery" || pathname === "/pickup"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                active
                  ? "text-red-600 bg-red-50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{getLabel(item)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
