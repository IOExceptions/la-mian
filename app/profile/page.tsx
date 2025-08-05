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
  Star,
  Crown,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"

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
      label: t("myOrders"),
      description: t("orderHistory"),
      href: "/orders",
      badge: "3",
    },
    {
      icon: User,
      label: t("personalInfo"),
      description: t("personalInfoDesc"),
      href: "/profile/info",
    },
    {
      icon: Heart,
      label: t("myFavorites"),
      description: t("myFavoritesDesc"),
      href: "/profile/favorites",
    },
    {
      icon: MapPin,
      label: t("addresses"),
      description: t("addressesDesc"),
      href: "/profile/addresses",
    },
    {
      icon: Gift,
      label: t("coupons"),
      description: t("couponsDesc"),
      href: "/coupons",
    },
    {
      icon: ShoppingBag,
      label: t("pointsMall"),
      description: t("pointsMallDesc"),
      href: "/mall",
    },
    {
      icon: Settings,
      label: t("accountSettings"),
      description: t("settingsDesc"),
      href: "/profile/settings",
    },
    {
      icon: Bell,
      label: t("notifications"),
      description: t("notificationsDesc"),
      href: "/profile/notifications",
    },
    {
      icon: HelpCircle,
      label: t("helpCenter"),
      description: t("helpCenterDesc"),
      href: "/profile/help",
    },
    {
      icon: Info,
      label: t("aboutUs"),
      description: t("aboutUsDesc"),
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
    return t("goldMember")
  }

  const getPointsText = () => {
    return t("points")
  }

  const getStatLabels = () => {
    return {
      pendingPayment: t("pendingPayment"),
      pendingPickup: t("pendingPickup"),
      completed: t("completed"),
    }
  }

  const getLanguageSettings = () => {
    return t("languageSettings")
  }

  const getLogoutText = () => {
    return t("logout")
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
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 relative">
              <Image
                src="/placeholder-user.jpg"
                alt={t("userAvatar")}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=64&width=64&text=User"
                }}
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <Crown className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold">{getUserName()}</h1>
              <p className="text-white/80 text-sm">
                {getMemberLevel()} • 1,280 {getPointsText()}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-yellow-300 fill-current" />
                <Star className="w-3 h-3 text-yellow-300 fill-current" />
                <Star className="w-3 h-3 text-yellow-300 fill-current" />
                <Star className="w-3 h-3 text-gray-300" />
                <Star className="w-3 h-3 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Member Progress */}
      <div className="bg-white mx-4 -mt-6 rounded-lg shadow-sm border border-gray-200 relative z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{t("memberProgress")}</span>
            <span className="text-sm text-orange-600">{t("pointsToNextLevel").replace("{points}", "720")}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: "64%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm border border-gray-200">
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
      <div className="mt-6 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={index}
              href={item.href}
              className="bg-white mx-4 p-4 flex items-center justify-between hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto mr-2">
                    {item.badge}
                  </span>
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
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Globe className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{getLanguageSettings()}</div>
              <div className="text-sm text-gray-500">
                {language === "zh"
                  ? "选择您的首选语言"
                  : language === "en"
                    ? "Choose your preferred language"
                    : "お好みの言語を選択"}
              </div>
            </div>
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
      <BottomNav />
    </div>
  )
}
