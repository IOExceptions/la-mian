"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MiniHeader } from "@/components/mini-header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"
import { availableCoupons } from "@/lib/coupons"
import { Gift, CheckCircle, XCircle } from "lucide-react"

export default function CouponsPage() {
  const { t, language } = useLanguage()
  const [couponCodeInput, setCouponCodeInput] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const getLocalizedText = (item: any, field: string) => {
    if (language === "en") return item[`${field}En`] || item[field]
    if (language === "ja") return item[`${field}Ja`] || item[field]
    return item[field]
  }

  const handleApplyCouponCode = () => {
    const coupon = availableCoupons.find((c) => c.code.toLowerCase() === couponCodeInput.toLowerCase())
    if (coupon) {
      const today = new Date()
      const expiry = new Date(coupon.expiryDate)
      if (today > expiry) {
        setMessage({ type: "error", text: t("couponExpired") })
      } else if (coupon.isUsed) {
        setMessage({ type: "error", text: t("couponUsed") })
      } else {
        setMessage({ type: "success", text: `${t("couponApplied")}: ${getLocalizedText(coupon, "name")}` })
        // In a real app, you'd add this coupon to the user's available coupons
      }
    } else {
      setMessage({ type: "error", text: t("invalidCoupon") })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MiniHeader />

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-6">
        <div className="text-center">
          <Gift className="w-12 h-12 mx-auto mb-2" />
          <h1 className="text-2xl font-bold mb-2">{t("myCoupons")}</h1>
          <p className="text-sm opacity-90">
            {language === "en"
              ? "Your exclusive discounts and offers"
              : language === "ja"
                ? "あなただけの割引と特典"
                : "您的专属折扣和优惠"}
          </p>
        </div>
      </div>

      {/* Enter Coupon Code */}
      <div className="bg-white mx-4 my-4 rounded-xl p-4">
        <h2 className="font-semibold text-gray-800 mb-3">{t("enterCouponCode")}</h2>
        <div className="flex gap-2">
          <Input
            placeholder={t("couponCode")}
            value={couponCodeInput}
            onChange={(e) => setCouponCodeInput(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleApplyCouponCode} className="bg-red-600 hover:bg-red-700">
            {t("applyCoupon")}
          </Button>
        </div>
        {message && (
          <div
            className={`mt-3 flex items-center gap-2 text-sm ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            <span>{message.text}</span>
          </div>
        )}
      </div>

      {/* Available Coupons */}
      <div className="bg-white mx-4 my-4 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-800">{t("availableCoupons")}</h2>
        </div>
        <div className="p-4 space-y-3">
          {availableCoupons.filter((c) => new Date(c.expiryDate) >= new Date() && !c.isUsed).length > 0 ? (
            availableCoupons
              .filter((c) => new Date(c.expiryDate) >= new Date() && !c.isUsed)
              .map((coupon) => (
                <Card key={coupon.id} className="overflow-hidden border-dashed border-red-300">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-red-600 mb-1">
                        {coupon.type === "fixed"
                          ? `${t("price")}${coupon.value}${language === "en" ? " OFF" : ""}`
                          : `${coupon.value * 100}% OFF`}
                      </h3>
                      <p className="text-sm text-gray-800 mb-1">{getLocalizedText(coupon, "name")}</p>
                      <p className="text-xs text-gray-600 mb-2">{getLocalizedText(coupon, "description")}</p>
                      <div className="text-xs text-gray-500">
                        {t("minOrder")}: {t("price")}
                        {coupon.minOrderAmount} | {t("expires")}: {coupon.expiryDate}
                      </div>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      {t("useNow")}
                    </Button>
                  </CardContent>
                </Card>
              ))
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm">{t("noCoupons")}</div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
