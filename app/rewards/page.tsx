"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, Trophy, Clock } from "lucide-react"
import { MiniHeader } from "@/components/mini-header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"

const rewardTiers = [
  { name: "青铜会员", nameEn: "Bronze", nameJa: "ブロンズ", points: 0, color: "bg-amber-600" },
  { name: "白银会员", nameEn: "Silver", nameJa: "シルバー", points: 500, color: "bg-gray-400" },
  { name: "黄金会员", nameEn: "Gold", nameJa: "ゴールド", points: 1000, color: "bg-yellow-500" },
  { name: "钻石会员", nameEn: "Diamond", nameJa: "ダイヤモンド", points: 2000, color: "bg-blue-500" },
]

const availableRewards = [
  {
    id: 1,
    name: "免费煎饺",
    nameEn: "Free Gyoza",
    nameJa: "無料餃子",
    points: 100,
    image: "/gyoza.png",
    expires: "30天",
    expiresEn: "30 days",
    expiresJa: "30日",
  },
  {
    id: 2,
    name: "免费拉面",
    nameEn: "Free Ramen",
    nameJa: "無料ラーメン",
    points: 300,
    image: "/tonkotsu-ramen-special.png",
    expires: "15天",
    expiresEn: "15 days",
    expiresJa: "15日",
  },
  {
    id: 3,
    name: "免费日式啤酒",
    nameEn: "Free Japanese Beer",
    nameJa: "無料日本ビール",
    points: 80,
    image: "/japanese-beer.png",
    expires: "45天",
    expiresEn: "45 days",
    expiresJa: "45日",
  },
  {
    id: 4,
    name: "叉烧饭优惠券",
    nameEn: "Chashu Rice Coupon",
    nameJa: "チャーシュー丼クーポン",
    points: 150,
    image: "/chashu-rice.png",
    expires: "20天",
    expiresEn: "20 days",
    expiresJa: "20日",
  },
]

const recentActivities = [
  {
    id: 1,
    action: "购买豚骨拉面套餐",
    actionEn: "Purchased Tonkotsu Ramen Set",
    actionJa: "豚骨ラーメンセット購入",
    points: "+50",
    date: "2024-01-15",
  },
  {
    id: 2,
    action: "兑换免费煎饺",
    actionEn: "Redeemed Free Gyoza",
    actionJa: "無料餃子交換",
    points: "-100",
    date: "2024-01-14",
  },
  {
    id: 3,
    action: "购买味噌拉面",
    actionEn: "Purchased Miso Ramen",
    actionJa: "味噌ラーメン購入",
    points: "+35",
    date: "2024-01-13",
  },
]

export default function RewardsPage() {
  const { t, language } = useLanguage()
  const currentPoints = 1280
  const currentTier =
    rewardTiers.find(
      (tier) =>
        currentPoints >= tier.points &&
        (rewardTiers.indexOf(tier) === rewardTiers.length - 1 ||
          currentPoints < rewardTiers[rewardTiers.indexOf(tier) + 1].points),
    ) || rewardTiers[0]

  const nextTier = rewardTiers[rewardTiers.indexOf(currentTier) + 1]
  const progress = nextTier
    ? ((currentPoints - currentTier.points) / (nextTier.points - currentTier.points)) * 100
    : 100

  const getLocalizedText = (item: any, field: string) => {
    if (language === "en") return item[`${field}En`] || item[field]
    if (language === "ja") return item[`${field}Ja`] || item[field]
    return item[field]
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MiniHeader />

      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-6">
        <div className="text-center">
          <Trophy className="w-12 h-12 mx-auto mb-2" />
          <h1 className="text-2xl font-bold mb-2">
            {language === "en" ? "Ramen Rewards" : language === "ja" ? "ラーメンリワード" : "拉面奖励计划"}
          </h1>
          <p className="text-sm opacity-90">
            {language === "en"
              ? "Earn points with every bowl"
              : language === "ja"
                ? "一杯ごとにポイントを獲得"
                : "每碗拉面都能获得积分"}
          </p>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-white mx-4 my-4 rounded-xl p-4">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-red-600 mb-1">{currentPoints}</div>
          <div className="text-sm text-gray-600">
            {language === "en" ? "Available Points" : language === "ja" ? "利用可能ポイント" : "可用积分"}
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${currentTier.color}`}></div>
            <span className="font-medium text-sm">{getLocalizedText(currentTier, "name")}</span>
          </div>
          {nextTier && (
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${nextTier.color}`}></div>
              <span className="text-sm text-gray-600">{getLocalizedText(nextTier, "name")}</span>
            </div>
          )}
        </div>

        {nextTier && (
          <>
            <Progress value={progress} className="mb-2" />
            <div className="text-center text-xs text-gray-600">
              {language === "en"
                ? `${nextTier.points - currentPoints} points to ${getLocalizedText(nextTier, "name")}`
                : language === "ja"
                  ? `${getLocalizedText(nextTier, "name")}まで${nextTier.points - currentPoints}ポイント`
                  : `距离${getLocalizedText(nextTier, "name")}还需${nextTier.points - currentPoints}积分`}
            </div>
          </>
        )}
      </div>

      {/* Available Rewards */}
      <div className="bg-white mx-4 my-4 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-800">
            {language === "en" ? "Available Rewards" : language === "ja" ? "利用可能な特典" : "可兑换奖励"}
          </h2>
        </div>
        <div className="p-4 space-y-3">
          {availableRewards.map((reward) => (
            <Card key={reward.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <div className="w-20 h-20 flex-shrink-0">
                    <Image
                      src={reward.image || "/placeholder.svg"}
                      alt={getLocalizedText(reward, "name")}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-3">
                    <h3 className="font-medium text-sm text-gray-800 mb-1">{getLocalizedText(reward, "name")}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-bold text-red-600">
                        {reward.points} {t("points")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>
                        {language === "en" ? "Expires in" : language === "ja" ? "有効期限" : "有效期"}{" "}
                        {getLocalizedText(reward, "expires")}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <Button
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white"
                      disabled={currentPoints < reward.points}
                    >
                      {language === "en" ? "Redeem" : language === "ja" ? "交換" : "兑换"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white mx-4 my-4 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-800">
            {language === "en" ? "Recent Activities" : language === "ja" ? "最近のアクティビティ" : "最近活动"}
          </h2>
        </div>
        <div className="p-4 space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-2">
              <div className="flex-1">
                <p className="text-sm text-gray-800">{getLocalizedText(activity, "action")}</p>
                <p className="text-xs text-gray-500">{activity.date}</p>
              </div>
              <div
                className={`font-bold text-sm ${activity.points.startsWith("+") ? "text-green-600" : "text-red-600"}`}
              >
                {activity.points}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Earn */}
      <div className="bg-white mx-4 my-4 rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-3">
          {language === "en" ? "How to Earn Points" : language === "ja" ? "ポイントの獲得方法" : "如何获得积分"}
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>
              {language === "en"
                ? "Earn 10 points for every $1 spent"
                : language === "ja"
                  ? "100円ごとに10ポイント獲得"
                  : "每消费1元获得10积分"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>
              {language === "en"
                ? "Double points on ramen bowls"
                : language === "ja"
                  ? "ラーメンは2倍ポイント"
                  : "拉面双倍积分"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>
              {language === "en"
                ? "Bonus points for combo sets"
                : language === "ja"
                  ? "セットメニューでボーナスポイント"
                  : "套餐额外积分"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>
              {language === "en"
                ? "Special points for new flavors"
                : language === "ja"
                  ? "新味でスペシャルポイント"
                  : "新口味特别积分"}
            </span>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
