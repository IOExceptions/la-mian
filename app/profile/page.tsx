"use client"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  User,
  Settings,
  Bell,
  HelpCircle,
  Info,
  LogOut,
  ShoppingBag,
  Heart,
  MapPin,
  Gift,
  Globe,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"

export default function ProfilePage() {
  const { t, language, setLanguage } = useLanguage()
  const [showLanguageModal, setShowLanguageModal] = useState(false)

  const handleLanguageChange = (newLanguage: "zh" | "en" | "ja") => {
    setLanguage(newLanguage)
    setShowLanguageModal(false)
  }

  const menuItems = [
    {
      icon: ShoppingBag,
      label: {
        zh: "我的订单",
        en: "My Orders",
        ja: "注文履歴",
      },
      href: "/orders",
      badge: "3",
    },
    {
      icon: User,
      label: {
        zh: "个人信息",
        en: "Personal Info",
        ja: "個人情報",
      },
      href: "/profile/info",
    },
    {
      icon: Heart,
      label: {
        zh: "我的收藏",
        en: "My Favorites",
        ja: "お気に入り",
      },
      href: "/profile/favorites",
    },
    {
      icon: MapPin,
      label: {
        zh: "地址管理",
        en: "Address Management",
        ja: "住所管理",
      },
      href: "/profile/addresses",
    },
    {
      icon: Gift,
      label: {
        zh: "优惠券",
        en: "Coupons",
        ja: "クーポン",
      },
      href: "/coupons",
    },
    {
      icon: Settings,
      label: {
        zh: "账户设置",
        en: "Account Settings",
        ja: "アカウント設定",
      },
      href: "/profile/settings",
    },
    {
      icon: Bell,
      label: {
        zh: "通知设置",
        en: "Notifications",
        ja: "通知設定",
      },
      href: "/profile/notifications",
    },
    {
      icon: HelpCircle,
      label: {
        zh: "帮助中心",
        en: "Help Center",
        ja: "ヘルプセンター",
      },
      href: "/profile/help",
    },
    {
      icon: Info,
      label: {
        zh: "关于我们",
        en: "About Us",
        ja: "私たちについて",
      },
      href: "/profile/about",
    },
  ]

  const getUserName = () => {
    switch (language) {
      case "en":
        return "Ramen Lover"
      case "ja":
        return "ラーメン愛好家"
      default:
        return "拉面爱好者"
    }
  }

  const getMemberLevel = () => {
    switch (language) {
      case "en":
        return "Gold Member"
      case "ja":
        return "ゴールド会員"
      default:
        return "黄金会员"
    }
  }

  const getPointsText = () => {
    switch (language) {
      case "en":
        return "Points"
      case "ja":
        return "ポイント"
      default:
        return "积分"
    }
  }

  const getStatLabels = () => {
    return {
      pendingPayment: language === "zh" ? "待付款" : language === "en" ? "Pending Payment" : "支払い待ち",
      pendingPickup: language === "zh" ? "待取餐" : language === "en" ? "Pending Pickup" : "受取待ち",
      completed: language === "zh" ? "已完成" : language === "en" ? "Completed" : "完了済み",
    }
  }

  const getLanguageSettings = () => {
    return language === "zh" ? "语言设置" : language === "en" ? "Language Settings" : "言語設定"
  }

  const getLogoutText = () => {
    return language === "zh" ? "退出登录" : language === "en" ? "Logout" : "ログアウト"
  }

  const getCancelText = () => {
    return language === "zh" ? "取消" : language === "en" ? "Cancel" : "キャンセル"
  }

  const statLabels = getStatLabels()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20">
              <Image
                src="/placeholder.svg?height=64&width=64&text=User"
                alt="User Avatar"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{getUserName()}</h1>
              <p className="text-white/80 text-sm">
                {getMemberLevel()} • 1,280{getPointsText()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white mx-4 -mt-6 rounded-lg shadow-sm border border-gray-200 relative z-10">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          <Link href="/orders?status=pending" className="p-4 text-center hover:bg-gray-50">
            <div className="text-lg font-semibold text-red-600">2</div>
            <div className="text-xs text-gray-600 mt-1">{statLabels.pendingPayment}</div>
          </Link>
          <Link href="/orders?status=ready" className="p-4 text-center hover:bg-gray-50">
            <div className="text-lg font-semibold text-orange-600">1</div>
            <div className="text-xs text-gray-600 mt-1">{statLabels.pendingPickup}</div>
          </Link>
          <Link href="/orders?status=completed" className="p-4 text-center hover:bg-gray-50">
            <div className="text-lg font-semibold text-green-600">15</div>
            <div className="text-xs text-gray-600 mt-1">{statLabels.completed}</div>
          </Link>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={index}
              href={item.href}
              className="bg-white mx-4 p-4 flex items-center justify-between hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">{item.label[language as keyof typeof item.label]}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          )
        })}
      </div>

      {/* Language Settings */}
      <div className="mt-6 bg-white mx-4 rounded-lg">
        <button
          onClick={() => setShowLanguageModal(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-600" />
            <span className="text-gray-900">{getLanguageSettings()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {language === "zh" ? "中文" : language === "en" ? "English" : "日本語"}
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>
      </div>

      {/* Logout */}
      <div className="mt-6 mx-4">
        <button className="w-full bg-white p-4 rounded-lg flex items-center justify-center gap-2 text-red-600 hover:bg-red-50">
          <LogOut className="w-5 h-5" />
          <span>{getLogoutText()}</span>
        </button>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{getLanguageSettings()}</h3>
            </div>
            <div className="space-y-2">
              {[
                { code: "zh" as const, name: "中文", flag: "🇨🇳" },
                { code: "en" as const, name: "English", flag: "🇺🇸" },
                { code: "ja" as const, name: "日本語", flag: "🇯🇵" },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                    language === lang.code ? "bg-red-50 border-2 border-red-200" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="flex-1 text-left font-medium text-gray-900">{lang.name}</span>
                  {language === lang.code && <div className="w-2 h-2 bg-red-600 rounded-full"></div>}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowLanguageModal(false)}
              className="w-full mt-4 py-3 bg-gray-100 rounded-lg text-gray-600 font-medium"
            >
              {getCancelText()}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
