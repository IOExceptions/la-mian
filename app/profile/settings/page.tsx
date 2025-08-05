"use client"
import { useState } from "react"
import { ArrowLeft, ChevronRight, Shield, Bell, Eye, Smartphone, CreditCard, HelpCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { BottomNav } from "@/components/bottom-nav"

export default function SettingsPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: true,
    orderUpdates: true,
    promotions: true,
    biometricLogin: false,
    autoLogin: true,
  })

  const getPageTitle = () => {
    return language === "zh" ? "账户设置" : language === "en" ? "Account Settings" : "アカウント設定"
  }

  const getSettingsItems = () => {
    return [
      {
        category: language === "zh" ? "安全设置" : language === "en" ? "Security" : "セキュリティ",
        items: [
          {
            icon: Shield,
            label: language === "zh" ? "修改密码" : language === "en" ? "Change Password" : "パスワード変更",
            href: "/profile/settings/password",
          },
          {
            icon: Smartphone,
            label: language === "zh" ? "生物识别登录" : language === "en" ? "Biometric Login" : "生体認証ログイン",
            toggle: true,
            key: "biometricLogin",
          },
          {
            icon: Eye,
            label: language === "zh" ? "自动登录" : language === "en" ? "Auto Login" : "自動ログイン",
            toggle: true,
            key: "autoLogin",
          },
        ],
      },
      {
        category: language === "zh" ? "通知设置" : language === "en" ? "Notifications" : "通知設定",
        items: [
          {
            icon: Bell,
            label: language === "zh" ? "推送通知" : language === "en" ? "Push Notifications" : "プッシュ通知",
            toggle: true,
            key: "pushNotifications",
          },
          {
            icon: Bell,
            label: language === "zh" ? "邮件通知" : language === "en" ? "Email Notifications" : "メール通知",
            toggle: true,
            key: "emailNotifications",
          },
          {
            icon: Bell,
            label: language === "zh" ? "短信通知" : language === "en" ? "SMS Notifications" : "SMS通知",
            toggle: true,
            key: "smsNotifications",
          },
          {
            icon: Bell,
            label: language === "zh" ? "订单更新" : language === "en" ? "Order Updates" : "注文更新",
            toggle: true,
            key: "orderUpdates",
          },
          {
            icon: Bell,
            label: language === "zh" ? "优惠推送" : language === "en" ? "Promotions" : "プロモーション",
            toggle: true,
            key: "promotions",
          },
        ],
      },
      {
        category: language === "zh" ? "其他设置" : language === "en" ? "Other" : "その他",
        items: [
          {
            icon: CreditCard,
            label: language === "zh" ? "支付设置" : language === "en" ? "Payment Settings" : "支払い設定",
            href: "/profile/settings/payment",
          },
          {
            icon: HelpCircle,
            label: language === "zh" ? "隐私政策" : language === "en" ? "Privacy Policy" : "プライバシーポリシー",
            href: "/profile/settings/privacy",
          },
        ],
      },
    ]
  }

  const toggleSetting = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  const settingsItems = getSettingsItems()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {settingsItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-2">
            <h2 className="text-sm font-medium text-gray-500 px-2 mb-3">{section.category}</h2>
            <div className="bg-white rounded-lg divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon
                return (
                  <div key={itemIndex} className="p-4">
                    {item.toggle ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-900">{item.label}</span>
                        </div>
                        <button
                          onClick={() => toggleSetting(item.key!)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings[item.key! as keyof typeof settings] ? "bg-red-600" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings[item.key! as keyof typeof settings] ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => item.href && router.push(item.href)}
                        className="w-full flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-900">{item.label}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
