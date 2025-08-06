"use client"

import { CardContent } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Minus, Trash2, ShoppingBag, Tag } from 'lucide-react'
import { MiniHeader } from "@/components/mini-header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { availableCoupons, type Coupon } from "@/lib/coupons"
import { nearbyStores } from "@/lib/data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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

export default function CartPage() {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderType = searchParams.get("orderType") || "delivery"

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false)

  // 从 localStorage 加载购物车数据
  useEffect(() => {
    const storageKey = orderType === "pickup" ? "pickupCartItems" : "deliveryCartItems"
    const savedItems = localStorage.getItem(storageKey)
    if (savedItems) {
      try {
        const items = JSON.parse(savedItems)
        setCartItems(items.map((item: any) => ({ ...item, selected: true })))
      } catch (error) {
        console.error("Error loading cart items:", error)
        setCartItems([])
      }
    }
  }, [orderType])

  // 保存购物车数据到 localStorage
  useEffect(() => {
    const storageKey = orderType === "pickup" ? "pickupCartItems" : "deliveryCartItems"
    localStorage.setItem(storageKey, JSON.stringify(cartItems))
  }, [cartItems, orderType])

  const getLocalizedText = (item: any, field: string) => {
    if (language === "en") return item[`${field}En`] || item[field]
    if (language === "ja") return item[`${field}Ja`] || item[field]
    return item[field]
  }

  const getPriceSymbol = () => {
    if (language === "en") return "$"
    return "¥"
  }

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item, i) => (i === index ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (index: number) => {
    setCartItems((items) => items.filter((_, i) => i !== index))
  }

  const toggleItemSelection = (index: number) => {
    setCartItems((items) => items.map((item, i) => (i === index ? { ...item, selected: !item.selected } : item)))
  }

  const toggleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.selected)
    setCartItems((items) => items.map((item) => ({ ...item, selected: !allSelected })))
  }

  const selectedItems = cartItems.filter((item) => item.selected)
  const subtotal = selectedItems.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity
    const sidesTotal = item.selectedSides.reduce((sideSum, side) => sideSum + side.price, 0) * item.quantity
    return sum + itemTotal + sidesTotal
  }, 0)

  const deliveryFee = orderType === "delivery" && subtotal < 30 ? 6 : 0
  const freeDeliveryThreshold = 30

  let couponDiscount = 0
  if (selectedCoupon) {
    if (selectedCoupon.type === "fixed") {
      couponDiscount = selectedCoupon.value
    } else if (selectedCoupon.type === "percentage") {
      couponDiscount = subtotal * selectedCoupon.value
    }
    couponDiscount = Math.min(couponDiscount, subtotal)
  }

  const total = subtotal + deliveryFee - couponDiscount

  const handleCouponSelect = (coupon: Coupon) => {
    const today = new Date()
    const expiry = new Date(coupon.expiryDate)

    if (today > expiry) {
      alert(t("couponExpired"))
      return
    }
    if (coupon.isUsed) {
      alert(t("couponUsed"))
      return
    }
    if (subtotal < coupon.minOrderAmount) {
      alert(`${t("minOrder")}: ${getPriceSymbol()}${coupon.minOrderAmount}`)
      return
    }

    setSelectedCoupon(coupon)
    setIsCouponModalOpen(false)
  }

  const handleRemoveCoupon = () => {
    setSelectedCoupon(null)
  }

  const handleCheckout = () => {
    const orderData = {
      items: selectedItems,
      subtotal,
      deliveryFee,
      couponDiscount,
      total,
      orderType,
      coupon: selectedCoupon,
    }

    localStorage.setItem("currentOrder", JSON.stringify(orderData))
    router.push(`/order-confirmation?orderType=${orderType}`)
  }

  const estimatedTime =
    orderType === "delivery"
      ? getLocalizedText(nearbyStores[0], "deliveryTime")
      : getLocalizedText(nearbyStores[0], "pickupTime")

  if (cartItems.length === 0) {
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
        {/* Select All */}
        <div className="bg-white rounded-xl p-4 mb-3">
          <div className="flex items-center gap-3">
            <Checkbox checked={cartItems.every((item) => item.selected)} onCheckedChange={toggleSelectAll} />
            <span className="font-medium">{t("selectAll")}</span>
            <span className="text-sm text-gray-500">
              ({selectedItems.length}/{cartItems.length} {t("items")})
            </span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="space-y-3">
          {cartItems.map((item, index) => (
            <div key={`${item.productId}-${item.specId}-${index}`} className="bg-white rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Checkbox checked={item.selected} onCheckedChange={() => toggleItemSelection(index)} />

                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={getLocalizedText(item, "productName")}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-gray-800 mb-1 line-clamp-1">
                    {getLocalizedText(item, "productName")}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">
                    {getLocalizedText(item, "specName")}
                  </p>
                  {item.selectedSides && item.selectedSides.length > 0 && (
                    <div className="text-xs text-gray-500 mb-1">
                      {language === "en" ? "Sides: " : language === "ja" ? "サイド: " : "配菜: "}
                      {item.selectedSides.map((side, sideIndex) => (
                        <span key={side.id}>
                          {getLocalizedText(side, "name")}
                          {sideIndex < item.selectedSides.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-red-600 font-bold">
                    {getPriceSymbol()}
                    {(item.price + item.selectedSides.reduce((sum, side) => sum + side.price, 0)).toFixed(language === "en" ? 2 : 0)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => removeItem(index)} className="text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery/Pickup Info */}
        <div className="bg-white rounded-xl p-4 mt-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm text-gray-800">
                {orderType === "delivery" ? t("deliveryTo") : t("pickupAtStore")}
              </p>
              <p className="text-xs text-gray-500">
                {orderType === "delivery"
                  ? getLocalizedText(nearbyStores[0], "address")
                  : getLocalizedText(nearbyStores[0], "name")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">
                {t("estimatedTime")} {estimatedTime}
              </p>
              <Link href={orderType === "delivery" ? "/delivery" : "/pickup"}>
                <button className="text-xs text-red-600">{t("change")}</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Coupon Selection */}
        <div className="bg-white rounded-xl p-4 mt-3">
          <Dialog open={isCouponModalOpen} onOpenChange={setIsCouponModalOpen}>
            <DialogTrigger asChild>
              <button className="w-full flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-sm text-gray-800">{t("coupons")}</span>
                </div>
                {selectedCoupon ? (
                  <span className="text-sm text-red-600">
                    -{getPriceSymbol()}
                    {couponDiscount.toFixed(language === "en" ? 2 : 0)}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">
                    {language === "en" ? "Select" : language === "ja" ? "選択" : "选择"}
                  </span>
                )}
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t("availableCoupons")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-4">
                {availableCoupons.filter((c) => new Date(c.expiryDate) >= new Date() && !c.isUsed).length > 0 ? (
                  availableCoupons
                    .filter((c) => new Date(c.expiryDate) >= new Date() && !c.isUsed)
                    .map((coupon) => (
                      <Card
                        key={coupon.id}
                        className={`overflow-hidden cursor-pointer ${
                          selectedCoupon?.id === coupon.id ? "border-red-600 ring-2 ring-red-600" : "border-gray-200"
                        }`}
                        onClick={() => handleCouponSelect(coupon)}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-red-600 mb-1">
                              {coupon.type === "fixed"
                                ? `${getPriceSymbol()}${coupon.value}${language === "en" ? " OFF" : ""}`
                                : `${coupon.value * 100}% OFF`}
                            </h3>
                            <p className="text-sm text-gray-800 mb-1">{getLocalizedText(coupon, "name")}</p>
                            <p className="text-xs text-gray-600 mb-2">{getLocalizedText(coupon, "description")}</p>
                            <div className="text-xs text-gray-500">
                              {t("minOrder")}: {getPriceSymbol()}
                              {coupon.minOrderAmount} | {t("expires")}: {coupon.expiryDate}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-8 text-gray-500 text-sm">{t("noCoupons")}</div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          {selectedCoupon && (
            <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
              <span>
                {t("couponApplied")}: {getLocalizedText(selectedCoupon, "name")}
              </span>
              <Button variant="ghost" size="sm" onClick={handleRemoveCoupon} className="text-red-600 hover:underline">
                {t("removeCoupon")}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Continue Shopping Button */}
      <div className="px-4 pb-4">
        <Link href={orderType === "delivery" ? "/delivery" : "/pickup"}>
          <Button
            variant="outline"
            className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent rounded-full py-3"
          >
            {t("continueOrdering")}
          </Button>
        </Link>
      </div>

      {/* Fixed Bottom Checkout - 新的单行布局 */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t px-4 py-3 z-40">
        {/* 免费配送提示 */}
        {orderType === "delivery" && deliveryFee > 0 && (
          <div className="text-xs text-gray-500 text-center mb-2">
            {t("buyMoreForFreeDelivery").replace(
              "{amount}",
              `${getPriceSymbol()}${(freeDeliveryThreshold - subtotal).toFixed(language === "en" ? 2 : 0)}`,
            )}
          </div>
        )}
        
        {/* 单行布局：价格信息 + 结算按钮 */}
        <div className="flex items-center justify-between">
          {/* 左侧价格信息 */}
          <div className="flex-1">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                {t("subtotal")}: {getPriceSymbol()}
                {subtotal.toFixed(language === "en" ? 2 : 0)}
              </span>
              {orderType === "delivery" && (
                <span>
                  {t("deliveryFee")}:{" "}
                  {deliveryFee === 0 ? t("free") : `${getPriceSymbol()}${deliveryFee.toFixed(language === "en" ? 2 : 0)}`}
                </span>
              )}
              {selectedCoupon && (
                <span className="text-red-600">
                  {t("couponDiscount")}: -{getPriceSymbol()}
                  {couponDiscount.toFixed(language === "en" ? 2 : 0)}
                </span>
              )}
            </div>
            <div className="text-lg font-bold text-red-600 mt-1">
              {t("total")}: {getPriceSymbol()}
              {total.toFixed(language === "en" ? 2 : 0)}
            </div>
          </div>

          {/* 右侧结算按钮 */}
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 rounded-full px-8 ml-4"
            disabled={selectedItems.length === 0}
            onClick={handleCheckout}
          >
            {t("checkout")} ({selectedItems.length})
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
