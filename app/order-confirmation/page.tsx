"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, MapPin, Phone, MessageCircle, Navigation, Store, Truck, User } from "lucide-react"
import { MiniHeader } from "@/components/mini-header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { nearbyStores } from "@/lib/data"

interface OrderData {
  items: any[]
  subtotal: number
  deliveryFee: number
  couponDiscount: number
  total: number
  orderType: string
  coupon: any
}

export default function OrderConfirmationPage() {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderType = searchParams.get("orderType") || "delivery"

  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [pickupNumber, setPickupNumber] = useState("")
  const [waitTime, setWaitTime] = useState(0)
  const [riderLocation, setRiderLocation] = useState({ lat: 34.055, lng: -118.245 })
  const [storeLocation] = useState({ lat: 34.052235, lng: -118.243683 })
  const [deliveryLocation] = useState({ lat: 34.05, lng: -118.24 })

  const getLocalizedText = (item: any, field: string) => {
    if (language === "en") return item[`${field}En`] || item[field]
    if (language === "ja") return item[`${field}Ja`] || item[field]
    return item[field]
  }

  const getPriceSymbol = () => {
    if (language === "en") return "$"
    return "¥"
  }

  useEffect(() => {
    // 从 localStorage 获取订单数据
    const storedOrder = localStorage.getItem("currentOrder")
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder))
    }

    // 生成取餐号（到店取餐）
    if (orderType === "pickup") {
      setPickupNumber(`P${Math.floor(Math.random() * 9000) + 1000}`)
      setWaitTime(Math.floor(Math.random() * 15) + 10) // 10-25分钟
    }

    // 模拟骑手位置更新（外卖）
    if (orderType === "delivery") {
      const interval = setInterval(() => {
        setRiderLocation((prev) => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001,
        }))
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [orderType])

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">
            {language === "en" ? "Loading order..." : language === "ja" ? "注文を読み込み中..." : "正在加载订单..."}
          </p>
        </div>
      </div>
    )
  }

  const store = nearbyStores[0]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MiniHeader />

      <div className="p-4">
        {/* Success Header */}
        <div className="bg-white rounded-xl p-6 mb-4 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            {language === "en" ? "Order Confirmed!" : language === "ja" ? "注文確定！" : "订单确认成功！"}
          </h1>
          <p className="text-gray-600 text-sm">
            {language === "en"
              ? "Your order has been placed successfully"
              : language === "ja"
                ? "ご注文が正常に完了しました"
                : "您的订单已成功提交"}
          </p>
        </div>

        {/* Pickup Information */}
        {orderType === "pickup" && (
          <div className="bg-white rounded-xl p-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Store className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-bold text-gray-800">
                {language === "en" ? "Pickup Information" : language === "ja" ? "受取情報" : "取餐信息"}
              </h2>
            </div>

            {/* Pickup Number */}
            <div className="bg-green-50 rounded-lg p-4 mb-4 text-center">
              <p className="text-sm text-gray-600 mb-2">
                {language === "en" ? "Your pickup number" : language === "ja" ? "受取番号" : "您的取餐号"}
              </p>
              <div className="text-4xl font-bold text-green-600 mb-2">{pickupNumber}</div>
              <p className="text-xs text-gray-500">
                {language === "en"
                  ? "Please show this number when picking up"
                  : language === "ja"
                    ? "受取時にこの番号をお見せください"
                    : "取餐时请出示此号码"}
              </p>
            </div>

            {/* Wait Time */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-lg font-medium text-gray-800">
                {language === "en"
                  ? `Estimated wait time: ${waitTime} minutes`
                  : language === "ja"
                    ? `予想待ち時間：${waitTime}分`
                    : `预计等待时间：${waitTime}分钟`}
              </span>
            </div>

            {/* Store Info */}
            <div className="border-t pt-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 mb-1">{getLocalizedText(store, "name")}</h3>
                  <p className="text-sm text-gray-600 mb-2">{getLocalizedText(store, "address")}</p>
                  <div className="flex items-center gap-4">
                    <a
                      href={`tel:${store.id === 1 ? "03-1234-5678" : "03-8765-4321"}`}
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">
                        {language === "en" ? "Call Store" : language === "ja" ? "店舗に電話" : "联系店家"}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Information */}
        {orderType === "delivery" && (
          <div className="bg-white rounded-xl p-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-800">
                {language === "en" ? "Delivery Information" : language === "ja" ? "配達情報" : "配送信息"}
              </h2>
            </div>

            {/* Delivery Map */}
            <div className="bg-gray-100 rounded-lg h-48 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {language === "en" ? "Delivery Map" : language === "ja" ? "配達マップ" : "配送地图"}
                  </p>
                </div>
              </div>

              {/* Store Marker */}
              <div className="absolute top-4 left-4 bg-green-500 text-white rounded-full p-2">
                <Store className="w-4 h-4" />
              </div>
              <div className="absolute top-12 left-2 bg-white rounded px-2 py-1 text-xs shadow">
                {language === "en" ? "Store" : language === "ja" ? "店舗" : "店家"}
              </div>

              {/* Rider Marker */}
              <div className="absolute top-20 left-20 bg-blue-500 text-white rounded-full p-2">
                <User className="w-4 h-4" />
              </div>
              <div className="absolute top-28 left-16 bg-white rounded px-2 py-1 text-xs shadow">
                {language === "en" ? "Rider" : language === "ja" ? "配達員" : "骑手"}
              </div>

              {/* Delivery Location Marker */}
              <div className="absolute bottom-4 right-4 bg-red-500 text-white rounded-full p-2">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="absolute bottom-12 right-2 bg-white rounded px-2 py-1 text-xs shadow">
                {language === "en" ? "You" : language === "ja" ? "あなた" : "您"}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      {language === "en" ? "Store Contact" : language === "ja" ? "店舗連絡先" : "店家联系"}
                    </p>
                    <p className="text-xs text-gray-600">{getLocalizedText(store, "name")}</p>
                  </div>
                </div>
                <a
                  href={`tel:${store.id === 1 ? "03-1234-5678" : "03-8765-4321"}`}
                  className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-full hover:bg-green-700"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{language === "en" ? "Call" : language === "ja" ? "電話" : "拨打"}</span>
                </a>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      {language === "en" ? "Delivery Rider" : language === "ja" ? "配達員" : "配送骑手"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {language === "en" ? "Tanaka-san" : language === "ja" ? "田中さん" : "田中先生"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href="tel:090-1234-5678"
                    className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{language === "en" ? "Call" : language === "ja" ? "電話" : "拨打"}</span>
                  </a>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-full hover:bg-green-700">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">
                      {language === "en" ? "Chat" : language === "ja" ? "チャット" : "聊天"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Estimated Delivery Time */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
              <Clock className="w-5 h-5 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                {language === "en" ? "Estimated delivery time" : language === "ja" ? "予想配達時間" : "预计送达时间"}
              </p>
              <p className="font-bold text-blue-600">{getLocalizedText(store, "deliveryTime")}</p>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {language === "en" ? "Order Summary" : language === "ja" ? "注文内容" : "订单详情"}
          </h3>

          <div className="space-y-3 mb-4">
            {orderData.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">x{item.quantity}</p>
                </div>
                <p className="font-medium text-sm text-gray-800">
                  {getPriceSymbol()}
                  {(item.price * item.quantity).toFixed(language === "en" ? 2 : 0)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t("subtotal")}</span>
              <span>
                {getPriceSymbol()}
                {orderData.subtotal.toFixed(language === "en" ? 2 : 0)}
              </span>
            </div>
            {orderData.deliveryFee > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("deliveryFee")}</span>
                <span>
                  {getPriceSymbol()}
                  {orderData.deliveryFee.toFixed(language === "en" ? 2 : 0)}
                </span>
              </div>
            )}
            {orderData.couponDiscount > 0 && (
              <div className="flex justify-between text-sm text-red-600">
                <span>{t("couponDiscount")}</span>
                <span>
                  -{getPriceSymbol()}
                  {orderData.couponDiscount.toFixed(language === "en" ? 2 : 0)}
                </span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>{t("total")}</span>
              <span className="text-red-600">
                {getPriceSymbol()}
                {orderData.total.toFixed(language === "en" ? 2 : 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full bg-red-600 hover:bg-red-700 rounded-full py-3">
              {language === "en" ? "Back to Home" : language === "ja" ? "ホームに戻る" : "返回首页"}
            </Button>
          </Link>

          <Link href="/order-status">
            <Button
              variant="outline"
              className="w-full border-red-600 text-red-600 hover:bg-red-50 rounded-full py-3 bg-transparent"
            >
              {language === "en" ? "View Order Details" : language === "ja" ? "注文詳細を見る" : "查看订单详情"}
            </Button>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
