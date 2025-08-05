"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Car, Clock, MapPin, CheckCircle } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

const driveThruSteps = [
  {
    step: 1,
    title: "在线点餐",
    description: "提前在APP下单，选择车道取餐",
    icon: "📱",
  },
  {
    step: 2,
    title: "到达餐厅",
    description: "开车到达指定车道取餐入口",
    icon: "🚗",
  },
  {
    step: 3,
    title: "出示订单",
    description: "向工作人员出示订单号码",
    icon: "🎫",
  },
  {
    step: 4,
    title: "取餐离开",
    description: "核对餐品无误后即可离开",
    icon: "🍔",
  },
]

const driveThruStores = [
  {
    id: 1,
    name: "麦当劳(建国门店)",
    address: "北京市朝阳区建国门外大街1号",
    distance: "1.2km",
    lanes: 2,
    waitTime: "5-8分钟",
    isOpen: true,
  },
  {
    id: 2,
    name: "麦当劳(国贸店)",
    address: "北京市朝阳区国贸中心停车场",
    distance: "1.8km",
    lanes: 3,
    waitTime: "3-5分钟",
    isOpen: true,
  },
  {
    id: 3,
    name: "麦当劳(三里屯店)",
    address: "北京市朝阳区三里屯路19号",
    distance: "2.1km",
    lanes: 1,
    waitTime: "8-12分钟",
    isOpen: false,
  },
]

const quickOrderItems = [
  {
    id: 1,
    name: "巨无霸套餐",
    price: "¥32.0",
    image: "/big-mac-meal.png",
    description: "巨无霸+薯条+可乐",
  },
  {
    id: 2,
    name: "麦辣鸡腿堡套餐",
    price: "¥29.5",
    image: "/spicy-chicken-meal.png",
    description: "麦辣鸡腿堡+薯条+可乐",
  },
  {
    id: 3,
    name: "双层吉士汉堡套餐",
    price: "¥26.0",
    image: "/double-cheese-meal.png",
    description: "双层吉士汉堡+薯条+可乐",
  },
]

export default function DriveThruPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">车道取餐</h1>
        </div>
        <p className="text-sm opacity-90">快速便捷，无需下车</p>
      </header>

      {/* Hero Section */}
      <div className="bg-white mx-4 my-4 rounded-xl overflow-hidden">
        <div className="aspect-video relative">
          <Image
            src="/drive-thru-hero.png"
            alt="车道取餐"
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="text-center text-white">
              <Car className="w-12 h-12 mx-auto mb-2" />
              <h2 className="text-xl font-bold mb-2">车道取餐服务</h2>
              <p className="text-sm">无需下车，快速取餐</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white mx-4 my-4 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-800">使用流程</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {driveThruSteps.map((step, index) => (
              <div key={step.step} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{step.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {step.step}
                    </span>
                    <h3 className="font-medium text-sm text-gray-800">{step.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </div>
                {index < driveThruSteps.length - 1 && (
                  <div className="absolute left-7 mt-8 w-0.5 h-4 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Stores */}
      <div className="bg-white mx-4 my-4 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-800">附近车道取餐门店</h2>
        </div>
        <div className="p-4 space-y-3">
          {driveThruStores.map((store) => (
            <Card key={store.id} className={`${!store.isOpen ? "opacity-60" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm text-gray-800">{store.name}</h3>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${store.isOpen ? "bg-green-500" : "bg-red-500"}`}></div>
                        <span className={`text-xs ${store.isOpen ? "text-green-600" : "text-red-600"}`}>
                          {store.isOpen ? "营业中" : "已关闭"}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{store.address}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{store.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Car className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{store.lanes}个车道</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">等待{store.waitTime}</span>
                      </div>
                    </div>
                  </div>
                  {store.isOpen && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                      导航
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Order */}
      <div className="bg-white mx-4 my-4 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-800">热门套餐</h2>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {quickOrderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-gray-800 mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-600 mb-1">{item.description}</p>
                  <span className="text-red-600 font-bold text-sm">{item.price}</span>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-xs">
                  立即点餐
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white mx-4 my-4 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-4 h-4 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-800 mb-2">温馨提示</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 建议提前在线下单，节省等待时间</li>
              <li>• 请准备好订单号码和支付方式</li>
              <li>• 高峰期可能需要稍作等待</li>
              <li>• 请按照指示牌有序排队</li>
            </ul>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
