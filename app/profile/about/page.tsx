"use client"
import { ArrowLeft, MapPin, Phone, Mail, Clock, Award, Users, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { BottomNav } from "@/components/bottom-nav"
import Image from "next/image"

export default function AboutUsPage() {
  const router = useRouter()
  const { language } = useLanguage()

  const getPageTitle = () => {
    return language === "zh" ? "关于我们" : language === "en" ? "About Us" : "私たちについて"
  }

  const getContent = () => {
    return {
      title: language === "zh" ? "拉面之家" : language === "en" ? "Ramen House" : "ラーメンハウス",
      description:
        language === "zh"
          ? "我们致力于为每一位顾客提供最正宗的日式拉面体验。从选材到制作，每一个环节都精益求精，只为那一碗温暖人心的拉面。"
          : language === "en"
            ? "We are committed to providing every customer with the most authentic Japanese ramen experience. From ingredient selection to preparation, we strive for excellence in every step, all for that one bowl of heartwarming ramen."
            : "私たちは、すべてのお客様に最も本格的な日本のラーメン体験を提供することをお約束します。食材の選択から調理まで、すべての工程で完璧を追求し、心温まる一杯のラーメンのために。",

      stats: [
        {
          icon: Users,
          number: "50万+",
          label: language === "zh" ? "满意顾客" : language === "en" ? "Happy Customers" : "満足したお客様",
        },
        {
          icon: Award,
          number: "100+",
          label: language === "zh" ? "门店数量" : language === "en" ? "Store Locations" : "店舗数",
        },
        {
          icon: Heart,
          number: "15年",
          label: language === "zh" ? "品牌历史" : language === "en" ? "Brand History" : "ブランド歴史",
        },
      ],

      contact: {
        title: language === "zh" ? "联系信息" : language === "en" ? "Contact Information" : "連絡先情報",
        items: [
          {
            icon: MapPin,
            label: language === "zh" ? "总部地址" : language === "en" ? "Headquarters" : "本社住所",
            value:
              language === "zh"
                ? "北京市朝阳区三里屯街道工体北路8号"
                : language === "en"
                  ? "No.8 Gongti North Road, Sanlitun, Chaoyang District, Beijing"
                  : "北京市朝陽区三里屯街道工体北路8号",
          },
          {
            icon: Phone,
            label: language === "zh" ? "客服热线" : language === "en" ? "Customer Service" : "カスタマーサービス",
            value: "400-123-4567",
          },
          {
            icon: Mail,
            label: language === "zh" ? "商务合作" : language === "en" ? "Business Cooperation" : "ビジネス協力",
            value: "business@ramenhouse.com",
          },
          {
            icon: Clock,
            label: language === "zh" ? "营业时间" : language === "en" ? "Business Hours" : "営業時間",
            value: "10:00 - 22:00",
          },
        ],
      },

      values: {
        title: language === "zh" ? "我们的价值观" : language === "en" ? "Our Values" : "私たちの価値観",
        items: [
          {
            title: language === "zh" ? "品质至上" : language === "en" ? "Quality First" : "品質第一",
            description:
              language === "zh"
                ? "严选优质食材，坚持传统工艺"
                : language === "en"
                  ? "Carefully selected quality ingredients, traditional craftsmanship"
                  : "厳選された高品質な食材、伝統的な職人技",
          },
          {
            title: language === "zh" ? "用心服务" : language === "en" ? "Heartfelt Service" : "心のこもったサービス",
            description:
              language === "zh"
                ? "以客户为中心，提供贴心服务"
                : language === "en"
                  ? "Customer-centered, providing thoughtful service"
                  : "お客様中心、思いやりのあるサービス",
          },
          {
            title: language === "zh" ? "持续创新" : language === "en" ? "Continuous Innovation" : "継続的な革新",
            description:
              language === "zh"
                ? "在传承中创新，在创新中发展"
                : language === "en"
                  ? "Innovation in tradition, development in innovation"
                  : "伝統の中での革新、革新の中での発展",
          },
        ],
      },
    }
  }

  const content = getContent()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <Image src="/placeholder-logo.svg" alt="Logo" width={40} height={40} className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
            <p className="text-white/90 leading-relaxed">{content.description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4">
          <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-3 gap-4">
              {content.stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <Icon className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="px-4">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{content.values.title}</h3>
            <div className="space-y-4">
              {content.values.items.map((value, index) => (
                <div key={index} className="border-l-4 border-red-600 pl-4">
                  <h4 className="font-medium text-gray-900 mb-1">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="px-4">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{content.contact.title}</h3>
            <div className="space-y-4">
              {content.contact.items.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="px-4">
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">
              {language === "zh" ? "应用版本" : language === "en" ? "App Version" : "アプリバージョン"}: 2.1.0
            </p>
            <p className="text-xs text-gray-400">
              © 2024 Ramen House.{" "}
              {language === "zh" ? "保留所有权利" : language === "en" ? "All rights reserved" : "すべての権利を保有"}.
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
