"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Phone, MessageCircle, Clock, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { mockOrders, type Order } from "@/lib/orders"
import type { type } from "os" // Import or declare the variable before using it

type OrderStatus = "all" | "preparing" | "ready" | "completed"

export default function OrdersPage() {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState<OrderStatus>("all")

  const filteredOrders = mockOrders.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "preparing":
        return "text-orange-600 bg-orange-50"
      case "ready":
        return "text-green-600 bg-green-50"
      case "completed":
        return "text-gray-600 bg-gray-50"
      case "cancelled":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    const statusMap = {
      preparing: {
        zh: "制作中",
        en: "Preparing",
        ja: "調理中",
      },
      ready: {
        zh: "待取餐",
        en: "Ready",
        ja: "受取待ち",
      },
      completed: {
        zh: "已完成",
        en: "Completed",
        ja: "完了",
      },
      cancelled: {
        zh: "已取消",
        en: "Cancelled",
        ja: "キャンセル",
      },
    }
    return statusMap[status][language as keyof (typeof statusMap)[status]]
  }

  const getTypeText = (type: Order["type"]) => {
    const typeMap = {
      pickup: {
        zh: "到店取餐",
        en: "Pickup",
        ja: "店舗受取",
      },
      delivery: {
        zh: "外卖配送",
        en: "Delivery",
        ja: "デリバリー",
      },
    }
    return typeMap[type][language as keyof (typeof typeMap)[type]]
  }

  const getEstimatedTimeText = (estimatedTime: string) => {
    // 简单的时间翻译处理
    if (language === "en") {
      return estimatedTime.replace("分钟", " minutes")
    } else if (language === "ja") {
      return estimatedTime.replace("分钟", "分")
    }
    return estimatedTime
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Link href="/profile" className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-semibold">{t("myOrders")}</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {[
            { key: "all" as OrderStatus, label: t("all") },
            { key: "preparing" as OrderStatus, label: getStatusText("preparing") },
            { key: "ready" as OrderStatus, label: getStatusText("ready") },
            { key: "completed" as OrderStatus, label: getStatusText("completed") },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "text-red-600 border-red-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">📋</div>
            <p className="text-gray-500">
              {language === "zh" ? "暂无订单" : language === "en" ? "No orders found" : "注文がありません"}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Order Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {language === "zh" ? "订单号" : language === "en" ? "Order" : "注文番号"}: {order.orderNumber}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{order.date}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{order.store[language as keyof typeof order.store]}</span>
                  <span className="text-gray-400">•</span>
                  <span>{getTypeText(order.type)}</span>
                </div>

                {/* Special Status Alerts */}
                {order.status === "ready" && order.pickupNumber && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-700 font-medium">
                        {language === "zh" ? "取餐号" : language === "en" ? "Pickup Number" : "受取番号"}:{" "}
                        <span className="text-lg font-bold">{order.pickupNumber}</span>
                      </span>
                    </div>
                  </div>
                )}

                {order.status === "preparing" && order.estimatedTime && (
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-orange-700">
                        {language === "zh" ? "预计还需" : language === "en" ? "Estimated time" : "予想時間"}:{" "}
                        {getEstimatedTimeText(order.estimatedTime)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="p-4">
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name[language as keyof typeof item.name]}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {item.name[language as keyof typeof item.name]}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.specifications[language as keyof typeof item.specifications]}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-600">
                            {language === "zh" ? "数量" : language === "en" ? "Qty" : "数量"}: {item.quantity}
                          </span>
                          <span className="font-medium text-gray-900">¥{item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {language === "zh" ? "商品小计" : language === "en" ? "Subtotal" : "小計"}
                      </span>
                      <span>¥{order.subtotal}</span>
                    </div>
                    {order.deliveryFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {language === "zh" ? "配送费" : language === "en" ? "Delivery Fee" : "配送料"}
                        </span>
                        <span>¥{order.deliveryFee}</span>
                      </div>
                    )}
                    {order.couponDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>
                          {language === "zh" ? "优惠券抵扣" : language === "en" ? "Coupon Discount" : "クーポン割引"}
                        </span>
                        <span>-¥{order.couponDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-base pt-1 border-t border-gray-100">
                      <span>{language === "zh" ? "总计" : language === "en" ? "Total" : "合計"}</span>
                      <span className="text-red-600">¥{order.total}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Phone className="w-4 h-4" />
                    {language === "zh" ? "联系店家" : language === "en" ? "Contact Store" : "店舗に連絡"}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <MessageCircle className="w-4 h-4" />
                    {language === "zh" ? "联系客服" : language === "en" ? "Customer Service" : "カスタマーサービス"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
