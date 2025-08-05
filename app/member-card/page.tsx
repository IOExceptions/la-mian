"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, QrCode, Star, Gift, Calendar, Users } from "lucide-react"
import { MiniHeader } from "@/components/mini-header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"

const memberBenefits = [
  {
    icon: "🍜",
    titleKey: "exclusiveRamen",
    descKey: "memberOnlyFlavors",
  },
  {
    icon: "⭐",
    titleKey: "pointsRewards",
    descKey: "earnPointsEveryBowl",
  },
  {
    icon: "🎂",
    titleKey: "birthdayTreats",
    descKey: "specialBirthdayRamen",
  },
  {
    icon: "🚀",
    titleKey: "earlyAccess",
    descKey: "newFlavorsFirst",
  },
]

export default function MemberCardPage() {
  const [showQR, setShowQR] = useState(false)
  const { t, language } = useLanguage()

  const memberInfo = {
    name: language === "en" ? "Ramen Lover" : language === "ja" ? "ラーメン愛好家" : "拉面爱好者",
    id: "RM2024001234",
    tier: language === "en" ? "Gold Member" : language === "ja" ? "ゴールド会員" : "黄金会员",
    joinDate: "2024-01-01",
    points: 1280,
    visits: 45,
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MiniHeader />

      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-6">
        <div className="text-center">
          <CreditCard className="w-12 h-12 mx-auto mb-2" />
          <h1 className="text-2xl font-bold mb-2">
            {language === "en" ? "Ramen Member Card" : language === "ja" ? "ラーメンメンバーカード" : "拉面会员卡"}
          </h1>
          <p className="text-sm opacity-90">
            {language === "en"
              ? "Your exclusive ramen membership"
              : language === "ja"
                ? "あなた専用のラーメン会員特典"
                : "您的专属拉面会员权益"}
          </p>
        </div>
      </div>

      {/* Member Card */}
      <div className="px-4 py-4">
        <Card className="bg-gradient-to-r from-red-500 to-orange-500 text-white overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">🍜</span>
                  </div>
                  <span className="font-bold text-lg">
                    {language === "en" ? "Ramen House" : language === "ja" ? "ラーメンハウス" : "拉面屋"}
                  </span>
                </div>
                <Badge className="bg-white text-red-600 font-semibold">{memberInfo.tier}</Badge>
              </div>
              <button
                onClick={() => setShowQR(!showQR)}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <QrCode className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold">{memberInfo.name}</h2>
              <p className="text-sm opacity-90">ID: {memberInfo.id}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>
                    {memberInfo.points} {t("points")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>
                    {memberInfo.visits} {language === "en" ? "bowls" : language === "ja" ? "杯" : "碗"}
                  </span>
                </div>
              </div>
            </div>

            {showQR && (
              <div className="mt-4 p-4 bg-white rounded-lg">
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-500" />
                </div>
                <p className="text-center text-gray-600 text-sm mt-2">
                  {language === "en"
                    ? "Scan to earn points"
                    : language === "ja"
                      ? "スキャンしてポイント獲得"
                      : "扫码获得积分"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Member Stats */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600 mb-1">{memberInfo.points}</div>
              <div className="text-xs text-gray-600">{t("points")}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600 mb-1">{memberInfo.visits}</div>
              <div className="text-xs text-gray-600">
                {language === "en" ? "Bowls" : language === "ja" ? "杯数" : "拉面碗数"}
              </div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">3</div>
              <div className="text-xs text-gray-600">
                {language === "en" ? "Coupons" : language === "ja" ? "クーポン" : "优惠券"}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Member Benefits */}
      <div className="bg-white mx-4 my-4 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-800">
            {language === "en" ? "Member Benefits" : language === "ja" ? "会員特典" : "会员权益"}
          </h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {memberBenefits.map((benefit, index) => (
              <div key={index} className="text-center p-3 border border-gray-100 rounded-lg">
                <div className="text-2xl mb-2">{benefit.icon}</div>
                <h3 className="font-medium text-sm text-gray-800 mb-1">
                  {language === "en"
                    ? benefit.titleKey === "exclusiveRamen"
                      ? "Exclusive Ramen"
                      : benefit.titleKey === "pointsRewards"
                        ? "Points & Rewards"
                        : benefit.titleKey === "birthdayTreats"
                          ? "Birthday Treats"
                          : "Early Access"
                    : language === "ja"
                      ? benefit.titleKey === "exclusiveRamen"
                        ? "限定ラーメン"
                        : benefit.titleKey === "pointsRewards"
                          ? "ポイント特典"
                          : benefit.titleKey === "birthdayTreats"
                            ? "誕生日特典"
                            : "先行アクセス"
                      : benefit.titleKey === "exclusiveRamen"
                        ? "专属拉面"
                        : benefit.titleKey === "pointsRewards"
                          ? "积分奖励"
                          : benefit.titleKey === "birthdayTreats"
                            ? "生日特权"
                            : "抢先体验"}
                </h3>
                <p className="text-xs text-gray-600">
                  {language === "en"
                    ? benefit.descKey === "memberOnlyFlavors"
                      ? "Member-only flavors"
                      : benefit.descKey === "earnPointsEveryBowl"
                        ? "Earn points every bowl"
                        : benefit.descKey === "specialBirthdayRamen"
                          ? "Special birthday ramen"
                          : "New flavors first"
                    : language === "ja"
                      ? benefit.descKey === "memberOnlyFlavors"
                        ? "会員限定味"
                        : benefit.descKey === "earnPointsEveryBowl"
                          ? "一杯毎にポイント獲得"
                          : benefit.descKey === "specialBirthdayRamen"
                            ? "特別誕生日ラーメン"
                            : "新味を最初に"
                      : benefit.descKey === "memberOnlyFlavors"
                        ? "会员专享口味"
                        : benefit.descKey === "earnPointsEveryBowl"
                          ? "每碗即得积分"
                          : benefit.descKey === "specialBirthdayRamen"
                            ? "生日专属拉面"
                            : "新品抢先体验"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white mx-4 my-4 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-800">
            {language === "en" ? "Recent Orders" : language === "ja" ? "最近の注文" : "最近订单"}
          </h2>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Gift className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {language === "en" ? "Tonkotsu Ramen Set" : language === "ja" ? "豚骨ラーメンセット" : "豚骨拉面套餐"}
                </p>
                <p className="text-xs text-gray-500">2024-01-15</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-green-600">+50</p>
              <p className="text-xs text-gray-500">{t("points")}</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {language === "en" ? "Miso Ramen" : language === "ja" ? "味噌ラーメン" : "味噌拉面"}
                </p>
                <p className="text-xs text-gray-500">2024-01-12</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-green-600">+35</p>
              <p className="text-xs text-gray-500">{t("points")}</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {language === "en" ? "Birthday Bonus" : language === "ja" ? "誕生日ボーナス" : "生日奖励"}
                </p>
                <p className="text-xs text-gray-500">2024-01-10</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-green-600">+200</p>
              <p className="text-xs text-gray-500">{t("points")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-red-500 hover:bg-red-600 text-white font-medium">
            {language === "en" ? "View Rewards" : language === "ja" ? "特典を見る" : "查看奖励"}
          </Button>
          <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
            {language === "en" ? "Invite Friends" : language === "ja" ? "友達を招待" : "邀请好友"}
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
