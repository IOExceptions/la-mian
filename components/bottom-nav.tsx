"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Gift, CreditCard, ShoppingBag, User } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const navItems = [
  {
    key: "home",
    icon: Home,
    path: "/",
  },
  {
    key: "rewards",
    icon: Gift,
    path: "/rewards",
  },
  {
    key: "memberCard",
    icon: CreditCard,
    path: "/member-card",
  },
  {
    key: "mall",
    icon: ShoppingBag,
    path: "/mall",
  },
  {
    key: "profile",
    icon: User,
    path: "/profile",
    badge: 3,
  },
]

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <Link key={item.key} href={item.path} className="flex flex-col items-center gap-1 py-1 px-2 min-w-0">
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "text-red-600" : "text-gray-500"}`} />
                {item.badge && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">{item.badge}</span>
                  </div>
                )}
              </div>
              <span className={`text-xs ${isActive ? "text-red-600 font-medium" : "text-gray-500"}`}>
                {t(item.key)}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
