"use client"
import { useState } from "react"
import { ArrowLeft, Bell, BellOff, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { BottomNav } from "@/components/bottom-nav"

export default function NotificationsPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "order",
      title: {
        zh: "订单已确认",
        en: "Order Confirmed",
        ja: "注文確認済み",
      },
      message: {
        zh: "您的订单 #12345 已确认，预计30分钟后送达",
        en: "Your order #12345 has been confirmed, estimated delivery in 30 minutes",
        ja: "ご注文 #12345 が確認されました。30分後にお届け予定です",
      },
      time: "2024-01-15 14:30",
      read: false,
    },
    {
      id: "2",
      type: "promotion",
      title: {
        zh: "限时优惠",
        en: "Limited Time Offer",
        ja: "期間限定オファー",
      },
      message: {
        zh: "豚骨拉面特价优惠，现在下单享受8折优惠！",
        en: "Special offer on Tonkotsu Ramen, order now and get 20% off!",
        ja: "豚骨ラーメン特価セール、今すぐ注文で20%オフ！",
      },
      time: "2024-01-15 10:00",
      read: true,
    },
    {
      id: "3",
      type: "system",
      title: {
        zh: "系统维护通知",
        en: "System Maintenance",
        ja: "システムメンテナンス",
      },
      message: {
        zh: "系统将于今晚23:00-01:00进行维护，期间可能影响下单",
        en: "System maintenance from 23:00-01:00 tonight, may affect ordering",
        ja: "今夜23:00-01:00にシステムメンテナンス、注文に影響する可能性があります",
      },
      time: "2024-01-14 18:00",
      read: true,
    },
  ])

  const getPageTitle = () => {
    return language === "zh" ? "通知中心" : language === "en" ? "Notifications" : "通知センター"
  }

  const getLabels = () => {
    return {
      markAllRead: language === "zh" ? "全部已读" : language === "en" ? "Mark All Read" : "すべて既読",
      clearAll: language === "zh" ? "清空全部" : language === "en" ? "Clear All" : "すべてクリア",
      noNotifications: language === "zh" ? "暂无通知" : language === "en" ? "No notifications" : "通知がありません",
    }
  }

  const labels = getLabels()

  const getNotificationIcon = (type: string, read: boolean) => {
    const iconClass = read ? "text-gray-400" : "text-red-600"
    switch (type) {
      case "order":
        return <Bell className={`w-5 h-5 ${iconClass}`} />
      case "promotion":
        return <Bell className={`w-5 h-5 ${iconClass}`} />
      case "system":
        return <Bell className={`w-5 h-5 ${iconClass}`} />
      default:
        return <Bell className={`w-5 h-5 ${iconClass}`} />
    }
  }

  const markAllRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return language === "zh" ? "刚刚" : language === "en" ? "Just now" : "たった今"
    } else if (diffInHours < 24) {
      return language === "zh"
        ? `${diffInHours}小时前`
        : language === "en"
          ? `${diffInHours}h ago`
          : `${diffInHours}時間前`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h1>
          <div className="flex gap-2">
            <button onClick={markAllRead} className="text-red-600 text-sm font-medium">
              {labels.markAllRead}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <BellOff className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500">{labels.noNotifications}</p>
          </div>
        ) : (
          <>
            {/* Clear All Button */}
            <div className="mb-4">
              <button onClick={clearAll} className="text-gray-500 text-sm flex items-center gap-1">
                <Trash2 className="w-4 h-4" />
                {labels.clearAll}
              </button>
            </div>

            {/* Notifications List */}
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white rounded-lg p-4 shadow-sm ${
                    !notification.read ? "border-l-4 border-red-600" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type, notification.read)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-medium ${notification.read ? "text-gray-600" : "text-gray-900"}`}>
                          {notification.title[language as keyof typeof notification.title]}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                          className="text-gray-400 hover:text-red-500 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className={`text-sm mb-2 ${notification.read ? "text-gray-500" : "text-gray-700"}`}>
                        {notification.message[language as keyof typeof notification.message]}
                      </p>
                      <p className="text-xs text-gray-400">{formatTime(notification.time)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
