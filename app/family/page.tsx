"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

const familyActivities = [
  {
    id: 1,
    title: "生日派对套餐",
    description: "为您的小朋友准备难忘的生日派对",
    image: "/family-birthday-party.png",
    price: "¥199",
    features: ["生日帽", "气球装饰", "生日蛋糕", "小礼品"],
  },
  {
    id: 2,
    title: "亲子DIY汉堡",
    description: "和孩子一起制作专属汉堡",
    image: "/family-diy-burger.png",
    price: "¥89",
    features: ["DIY材料包", "围裙", "厨师帽", "制作指导"],
  },
  {
    id: 3,
    title: "儿童绘画课堂",
    description: "专业老师指导的绘画活动",
    image: "/family-painting-class.png",
    price: "¥59",
    features: ["绘画材料", "专业指导", "作品展示", "小奖品"],
  },
]

const playAreas = [
  {
    name: "滑梯乐园",
    description: "适合3-8岁儿童",
    image: "/play-area-slide.png",
  },
  {
    name: "球池区域",
    description: "安全软包设计",
    image: "/play-area-ball-pit.png",
  },
  {
    name: "积木天地",
    description: "开发智力创造力",
    image: "/play-area-blocks.png",
  },
]

export default function FamilyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">亲子乐园</h1>
        </div>
        <p className="text-sm opacity-90">为您和孩子创造美好回忆</p>
      </header>

      {/* Hero Section */}
      <div className="bg-white mx-4 my-4 rounded-xl overflow-hidden">
        <div className="aspect-video relative">
          <Image
            src="/family-hero-banner.png"
            alt="亲子乐园"
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-xl font-bold mb-2">欢乐亲子时光</h2>
              <p className="text-sm">让孩子在游戏中快乐成长</p>
            </div>
          </div>
        </div>
      </div>

      {/* Family Activities */}
      <div className="bg-white mx-4 my-4 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-800">亲子活动</h2>
        </div>
        <div className="p-4 space-y-4">
          {familyActivities.map((activity) => (
            <Card key={activity.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0">
                    <Image
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-3">
                    <h3 className="font-medium text-sm text-gray-800 mb-1">{activity.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{activity.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {activity.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs px-2 py-0.5">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-600 font-bold">{activity.price}</span>
                      <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-xs">
                        预约
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Play Areas */}
      <div className="bg-white mx-4 my-4 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-800">游乐设施</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-3">
            {playAreas.map((area) => (
              <div key={area.name} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50">
                  <Image
                    src={area.image || "/placeholder.svg"}
                    alt={area.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-gray-800 mb-1">{area.name}</h3>
                  <p className="text-xs text-gray-600">{area.description}</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="bg-white mx-4 my-4 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-800 mb-2">安全提示</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 儿童需在家长陪同下使用游乐设施</li>
              <li>• 请遵守各项安全规定和年龄限制</li>
              <li>• 使用前请检查设施是否完好</li>
              <li>• 如有任何问题请及时联系工作人员</li>
            </ul>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
