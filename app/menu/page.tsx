"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, Plus } from "lucide-react"
import { MiniHeader } from "@/components/mini-header"
import { BottomNav } from "@/components/bottom-nav"
import { categories, products } from "@/lib/data" // Import from lib/data
import { useLanguage } from "@/contexts/language-context"

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { t, language } = useLanguage()

  const getLocalizedText = (item: any, field: string) => {
    if (language === "en") return item[`${field}En`] || item[field]
    if (language === "ja") return item[`${field}Ja`] || item[field]
    return item[field]
  }

  const getPriceSymbol = () => {
    if (language === "en") return "$"
    return "¥"
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = getLocalizedText(product, "name").toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MiniHeader />

      {/* Search Bar */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-100 border-none rounded-full"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white px-4 py-3 border-b sticky top-0 z-10">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {getLocalizedText(category, "name")}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
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
                  <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1">新品</Badge>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {(language === "en" ? product.badgesEn : language === "ja" ? product.badgesJa : product.badges).map(
                    (badge: string) => (
                      <Badge key={badge} className="bg-red-600 text-white text-xs px-2 py-1">
                        {badge}
                      </Badge>
                    ),
                  )}
                </div>
              </div>

              <div className="p-3">
                <h3 className="font-medium text-sm text-gray-800 mb-1 line-clamp-1">
                  {getLocalizedText(product, "name")}
                </h3>
                <p className="text-xs text-gray-500 mb-2 line-clamp-1">{getLocalizedText(product, "description")}</p>

                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-500">{getLocalizedText(product, "sales")}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-red-600 font-bold">
                      {getPriceSymbol()}
                      {language === "en"
                        ? product.specs[0].priceEn
                        : language === "ja"
                          ? product.specs[0].priceJa
                          : product.specs[0].price}
                    </span>
                    {product.specs[0].originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        {getPriceSymbol()}
                        {product.specs[0].originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-1">
                    <Link href={`/product/${product.id}`}>
                      <button className="text-xs text-gray-600 px-2 py-1 border border-gray-200 rounded-full">
                        详情
                      </button>
                    </Link>
                    <button className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                      <Plus className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {language === "en"
                ? "No ramen found"
                : language === "ja"
                  ? "ラーメンが見つかりません"
                  : "没有找到相关商品"}
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
