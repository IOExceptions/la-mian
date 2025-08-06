"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingBag, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Truck, 
  Store,
  ArrowLeft,
  CreditCard,
  User,
  Mail,
  Phone as PhoneIcon,
  Trash2
} from "lucide-react"
import { MiniHeader } from "@/components/mini-header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { nearbyStores } from "@/lib/data"
import { availableCoupons as coupons } from "@/lib/coupons"

interface CartItem {
  productId: number
  productName: string
  productNameEn: string
  productNameJa: string
  specId: string
  specName: string
  specNameEn: string
  specNameJa: string
  price: number
  quantity: number
  image: string
  selected: boolean
  selectedSides: Array<{
    id: string
    name: string
    nameEn: string
    nameJa: string
    price: number
  }>
}

interface Coupon {
  id: string
  name: string
  nameEn: string
  nameJa: string
  description: string
  descriptionEn: string
  descriptionJa: string
  value: number
  type: "percentage" | "fixed"
  minOrderAmount: number
  expiryDate: string
}

export default function CheckoutPage() {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderType = searchParams.get("orderType") || "pickup"

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  })

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
    // 从 localStorage 获取购物车数据
    const storedCart = localStorage.getItem("pickupCartItems")
    if (storedCart) {
      try {
        const items = JSON.parse(storedCart)
        setCartItems(items)
      } catch (error) {
        console.error("Error loading cart items:", error)
        setCartItems([])
      }
    }
  }, [])

  const selectedItems = cartItems?.filter(item => item.selected) || []
  const subtotal = selectedItems.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity
    const sidesTotal = item.selectedSides.reduce((sidesSum, side) => sidesSum + side.price, 0) * item.quantity
    return sum + itemTotal + sidesTotal
  }, 0)

  const deliveryFee = orderType === "delivery" ? (subtotal >= 50 ? 0 : 5) : 0
  const freeDeliveryThreshold = 50

  const couponDiscount = selectedCoupon
    ? selectedCoupon.type === "percentage"
      ? subtotal * selectedCoupon.value
      : selectedCoupon.value
    : 0

  const total = subtotal + deliveryFee - couponDiscount

  const handleCouponSelect = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
    setIsCouponModalOpen(false)
  }

  const handleRemoveCoupon = () => {
    setSelectedCoupon(null)
  }

  const handlePlaceOrder = () => {
    const orderData = {
      items: selectedItems,
      subtotal,
      deliveryFee,
      couponDiscount,
      total,
      orderType,
      coupon: selectedCoupon,
      customerInfo
    }

    localStorage.setItem("currentOrder", JSON.stringify(orderData))
    router.push(`/order-confirmation?orderType=${orderType}`)
  }

  const removeItem = (index: number) => {
    const itemName = getLocalizedText(selectedItems[index], "productName")
    const confirmMessage = language === "en" 
      ? `Remove "${itemName}" from cart?`
      : language === "ja" 
        ? `「${itemName}」をカートから削除しますか？`
        : `确定要删除"${itemName}"吗？`
    
    if (window.confirm(confirmMessage)) {
      // 从购物车中删除商品
      const updatedCartItems = cartItems.filter((_, i) => {
        const itemIndex = cartItems.findIndex(item => 
          item.productId === selectedItems[index].productId && 
          item.specId === selectedItems[index].specId
        )
        return i !== itemIndex
      })
      
      // 更新localStorage
      localStorage.setItem("pickupCartItems", JSON.stringify(updatedCartItems))
      setCartItems(updatedCartItems)
    }
  }

  const store = nearbyStores[0]

  if (selectedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <MiniHeader />
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
          <h2 className="text-lg font-medium text-gray-800 mb-2">{t("cartEmpty")}</h2>
          <p className="text-gray-500 text-sm mb-6">
            {language === "en"
              ? "Go select your favorite ramen!"
              : language === "ja"
                ? "お気に入りのラーメンを選びに行こう！"
                : "快去选择您喜欢的拉面吧！"}
          </p>
          <Link href={orderType === "pickup" ? "/pickup" : "/delivery"}>
            <Button className="bg-red-600 hover:bg-red-700 rounded-full px-8">{t("goToOrder")}</Button>
          </Link>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <MiniHeader />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">
            {language === "en" ? "Checkout" : language === "ja" ? "決済" : "结算"}
          </h1>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="space-y-3">
            {selectedItems.map((item, index) => (
              <div key={`${item.productId}-${item.specId}-${index}`} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={getLocalizedText(item, "productName")}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-gray-800 mb-1">
                    {getLocalizedText(item, "productName")}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">
                    {getLocalizedText(item, "specName")} × {item.quantity}
                  </p>
                  {item.selectedSides && item.selectedSides.length > 0 && (
                    <div className="text-xs text-gray-500">
                      {item.selectedSides.map((side, sideIndex) => (
                        <span key={side.id}>
                          {getLocalizedText(side, "name")}
                          {sideIndex < item.selectedSides.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button 
                    onClick={() => removeItem(index)} 
                    className="p-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors"
                    title={language === "en" ? "Remove item" : language === "ja" ? "削除" : "删除商品"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <p className="font-medium text-sm text-gray-800">
                    {getPriceSymbol()}
                    {(item.price + item.selectedSides.reduce((sum, side) => sum + side.price, 0)) * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>



        {/* Coupons */}
        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-medium text-gray-800">
              {language === "en" ? "Coupons" : language === "ja" ? "クーポン" : "优惠券"}
            </h2>
            <Dialog open={isCouponModalOpen} onOpenChange={setIsCouponModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50 text-xs">
                  {language === "en" ? "Select" : language === "ja" ? "選択" : "选择"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {language === "en" ? "Available Coupons" : language === "ja" ? "利用可能なクーポン" : "可用优惠券"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {coupons
                    .filter((coupon) => subtotal >= coupon.minOrderAmount)
                    .map((coupon) => (
                      <Card key={coupon.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4" onClick={() => handleCouponSelect(coupon)}>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="bg-red-100 text-red-600">
                              {coupon.type === "fixed"
                                ? `${getPriceSymbol()}${coupon.value} OFF`
                                : `${coupon.value * 100}% OFF`}
                            </Badge>
                          </div>
                          <h3 className="text-sm font-medium text-gray-800 mb-1">{getLocalizedText(coupon, "name")}</h3>
                          <p className="text-xs text-gray-600 mb-2">{getLocalizedText(coupon, "description")}</p>
                          <div className="text-xs text-gray-500">
                            {t("minOrder")}: {getPriceSymbol()}
                            {coupon.minOrderAmount} | {t("expires")}: {coupon.expiryDate}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {selectedCoupon && (
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                {t("couponApplied")}: {getLocalizedText(selectedCoupon, "name")}
              </span>
              <Button variant="ghost" size="sm" onClick={handleRemoveCoupon} className="text-red-600 hover:underline">
                {t("removeCoupon")}
              </Button>
            </div>
          )}
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t("subtotal")}</span>
              <span>
                {getPriceSymbol()}
                {subtotal.toFixed(language === "en" ? 2 : 0)}
              </span>
            </div>
            
            {orderType === "delivery" && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("deliveryFee")}</span>
                <span>
                  {deliveryFee === 0 ? t("free") : `${getPriceSymbol()}${deliveryFee.toFixed(language === "en" ? 2 : 0)}`}
                </span>
              </div>
            )}
            
            {selectedCoupon && (
              <div className="flex justify-between text-sm text-red-600">
                <span>{t("couponDiscount")}</span>
                <span>
                  -{getPriceSymbol()}
                  {couponDiscount.toFixed(language === "en" ? 2 : 0)}
                </span>
              </div>
            )}
            
            <div className="flex justify-between font-bold text-base border-t pt-2">
              <span>{t("total")}</span>
              <span className="text-red-600">
                {getPriceSymbol()}
                {total.toFixed(language === "en" ? 2 : 0)}
              </span>
            </div>
          </div>
        </div>


      </div>

      {/* Fixed Bottom Checkout Button */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t px-4 py-2 z-40">
        <Button
          size="lg"
          className="w-full bg-red-600 hover:bg-red-700 rounded-lg py-3 text-base font-medium"
          disabled={selectedItems.length === 0}
          onClick={handlePlaceOrder}
        >
          {language === "en" ? "Submit Order" : language === "ja" ? "注文する" : "提交订单"} {getPriceSymbol()}
          {total.toFixed(language === "en" ? 2 : 0)}
        </Button>
      </div>

      <BottomNav />
    </div>
  )
} 