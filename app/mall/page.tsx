"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Star, Gift, Truck } from "lucide-react"
import { MiniHeader } from "@/components/mini-header"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/contexts/language-context"

const categories = [
  { key: "bowls", icon: "🍜", color: "bg-red-50" },
  { key: "chopsticks", icon: "🥢", color: "bg-orange-50" },
  { key: "apparel", icon: "👕", color: "bg-blue-50" },
  { key: "accessories", icon: "🎒", color: "bg-green-50" },
]

const featuredProducts = [
  {
    id: 1,
    name: "拉面碗套装",
    nameEn: "Ramen Bowl Set",
    nameJa: "ラーメン丼セット",
    price: "¥128",
    priceEn: "$18.99",
    priceJa: "¥2,280",
    originalPrice: "¥168",
    image: "/ramen-bowl-set.png",
    rating: 4.8,
    sales: 234,
    isNew: true,
  },
  {
    id: 2,
    name: "日式筷子礼盒",
    nameEn: "Japanese Chopsticks Gift Set",
    nameJa: "日本箸ギフトセット",
    price: "¥58",
    priceEn: "$8.99",
    priceJa: "¥880",
    image: "/placeholder-edca3.png",
    rating: 4.9,
    sales: 567,
    isHot: true,
  },
  {
    id: 3,
    name: "拉面师傅围裙",
    nameEn: "Ramen Chef Apron",
    nameJa: "ラーメン職人エプロン",
    price: "¥89",
    priceEn: "$12.99",
    priceJa: "¥1,380",
    image: "/ramen-chef-apron.png",
    rating: 4.7,
    sales: 123,
  },
  {
    id: 4,
    name: "拉面文化T恤",
    nameEn: "Ramen Culture T-shirt",
    nameJa: "ラーメン文化Tシャツ",
    price: "¥78",
    priceEn: "$11.99",
    priceJa: "¥1,180",
    image: "/ramen-culture-t-shirt.png",
    rating: 4.6,
    sales: 89,
  },
  {
    id: 5,
    name: "豚骨汤底调料包",
    nameEn: "Tonkotsu Soup Base Kit",
    nameJa: "豚骨スープベースキット",
    price: "¥45",
    priceEn: "$6.99",
    priceJa: "¥680",
    image: "/tonkotsu-soup-base-kit.png",
    rating: 4.5,
    sales: 456,
    isHot: true,
  },
  {
    id: 6,
    name: "拉面保温饭盒",
    nameEn: "Ramen Thermal Lunch Box",
    nameJa: "ラーメン保温弁当箱",
    price: "¥98",
    priceEn: "$14.99",
    priceJa: "¥1,480",
    image: "/ramen-thermal-lunch-box.png",
    rating: 4.4,
    sales: 234,
  },
]

export default function MallPage() {
  const { t, language } = useLanguage()

  const getLocalizedText = (item: any, field: string) => {
    if (language === "en") return item[`${field}En`] || item[field]
    if (language === "ja") return item[`${field}Ja`] || item[field]
    return item[field]
  }

  const getCategoryName = (key: string) => {
    const names = {
      bowls: { zh: "餐具", en: "Bowls & Utensils", ja: "食器" },
      chopsticks: { zh: "筷子", en: "Chopsticks", ja: "箸" },
      apparel: { zh: "服饰", en: "Apparel", ja: "アパレル" },
      accessories: { zh: "配件", en: "Accessories", ja: "アクセサリー" },
    }
    return names[key as keyof typeof names][language as keyof typeof names.bowls]
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MiniHeader />

      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-6">
        <div className="text-center">
          <ShoppingBag className="w-12 h-12 mx-auto mb-2" />
          <h1 className="text-2xl font-bold mb-2">
            {language === "en" ? "Ramen Store" : language === "ja" ? "ラーメンストア" : "拉面商城"}
          </h1>
          <p className="text-sm opacity-90">
            {language === "en"
              ? "Authentic ramen culture & merchandise"
              : language === "ja"
                ? "本格ラーメン文化＆グッズ"
                : "正宗拉面文化商品"}
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white px-4 py-4 border-b">
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.key} className="text-center">
              <div
                className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-xl mx-auto mb-2`}
              >
                {category.icon}
              </div>
              <span className="text-xs text-gray-700">{getCategoryName(category.key)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="bg-white px-4 py-4">
        <div className="aspect-video rounded-xl overflow-hidden relative bg-gradient-to-r from-red-500 to-orange-500">
          <Image
            src="/ramen-store-banner.png"
            alt="Ramen Store Banner"
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-xl font-bold mb-2">
                {language === "en"
                  ? "Ramen Culture Collection"
                  : language === "ja"
                    ? "ラーメン文化コレクション"
                    : "拉面文化系列"}
              </h2>
              <p className="text-sm">
                {language === "en"
                  ? "Authentic Japanese style"
                  : language === "ja"
                    ? "本格和風スタイル"
                    : "正宗日式风格"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white mx-4 my-4 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-800">
            {language === "en" ? "Featured Products" : language === "ja" ? "注目商品" : "精选商品"}
          </h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square bg-gray-50">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={getLocalizedText(product, "name")}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1">
                        {language === "en" ? "New" : language === "ja" ? "新商品" : "新品"}
                      </Badge>
                    )}
                    {product.isHot && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1">
                        {language === "en" ? "Hot" : language === "ja" ? "人気" : "热销"}
                      </Badge>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="font-medium text-sm text-gray-800 mb-1 line-clamp-1">
                      {getLocalizedText(product, "name")}
                    </h3>

                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-red-400 text-red-400" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.sales})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-red-600 font-bold text-sm">
                          {language === "en" ? product.priceEn : language === "ja" ? product.priceJa : product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-xs px-3">
                        {language === "en" ? "Buy" : language === "ja" ? "購入" : "购买"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white mx-4 my-4 rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-3">
          {language === "en" ? "Our Services" : language === "ja" ? "サービス" : "服务保障"}
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Truck className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-xs text-gray-600">
              {language === "en" ? "Free Shipping" : language === "ja" ? "送料無料" : "免费配送"}
            </p>
          </div>
          <div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Gift className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-xs text-gray-600">
              {language === "en" ? "Gift Wrapping" : language === "ja" ? "ギフト包装" : "礼品包装"}
            </p>
          </div>
          <div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-xs text-gray-600">
              {language === "en" ? "Authentic Quality" : language === "ja" ? "本格品質" : "正宗品质"}
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
