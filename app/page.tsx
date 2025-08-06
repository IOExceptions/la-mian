"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Search, Plus } from "lucide-react"
import { MiniHeader } from "@/components/mini-header"
import { BottomNav } from "@/components/bottom-nav"

import { useLanguage } from "@/contexts/language-context"
import { products } from "@/lib/data" // Import products from lib/data

const quickServices = [
  { key: "dessertStation", icon: "🍡", path: "/menu?category=desserts", color: "bg-pink-50" },
  { key: "mccafe", icon: "🍵", path: "/menu?category=drinks", color: "bg-amber-50" },
  { key: "getCoupons", icon: "🎫", path: "/coupons", color: "bg-red-50" },
  { key: "familyFun", icon: "🎠", path: "/family", color: "bg-blue-50" },
  { key: "driveThru", icon: "🚗", path: "/drive-thru", color: "bg-green-50" },
]

// 新品上市商品 - 从 products 中筛选新品
const newProducts = products
  .filter(
    (product) =>
      product.badges?.includes("新品") || product.badgesEn?.includes("New") || product.badgesJa?.includes("新商品"),
  )
  .slice(0, 3)

// 套餐特惠商品 - 从 products 中筛选套餐类商品
const comboProducts = products
  .filter(
    (product) =>
      product.category === "combo" ||
      product.badges?.includes("套餐") ||
      product.badgesEn?.includes("Combo") ||
      product.badgesJa?.includes("セット"),
  )
  .slice(0, 3)

// Use products from lib/data for hotProducts
const hotProducts = products.filter((p) => p.isPopular).slice(0, 4)

// 今日特惠商品数据
const todaySpecialProduct = {
  id: "daily-special-combo",
  name: "超值午餐套餐",
  nameEn: "Value Lunch Set",
  nameJa: "お得ランチセット",
  description: "汉堡+薯条+饮料组合套餐",
  descriptionEn: "Burger + Fries + Drink combo",
  descriptionJa: "バーガー+ポテト+ドリンクセット",
  image: "/daily-special-combo.png",
  category: "combo",
  rating: 4.8,
  sales: "月售1000+份",
  salesEn: "1000+ sold monthly",
  salesJa: "月間1000+個販売",
  badges: ["限时特惠", "套餐"],
  badgesEn: ["Limited Time", "Combo"],
  badgesJa: ["期間限定", "セット"],
  specs: [
    {
      id: "daily-special-standard",
      name: "标准套餐",
      nameEn: "Standard Set",
      nameJa: "スタンダードセット",
      price: "29.9",
      priceEn: "5.99",
      priceJa: "590",
      originalPrice: "39.9",
      originalPriceEn: "7.99",
      originalPriceJa: "790",
    },
  ],
  isPopular: true,
}

export default function HomePage() {
  const { t, language } = useLanguage()
  const router = useRouter()

  const getLocalizedText = (item: any, field: string) => {
    if (language === "en") return item[`${field}En`] || item[field]
    if (language === "ja") return item[`${field}Ja`] || item[field]
    return item[field]
  }

  const getPriceSymbol = () => {
    if (language === "en") return "$"
    return "¥"
  }

  // 处理加入购物车 - 跳转到到店取餐页面
  const handleAddToCart = (product: any) => {
    // 将商品信息存储到 localStorage，供 pickup 页面使用
    const productToAdd = {
      id: product.id,
      name: getLocalizedText(product, "name"),
      nameEn: product.nameEn,
      nameJa: product.nameJa,
      description: getLocalizedText(product, "description"),
      descriptionEn: product.descriptionEn,
      descriptionJa: product.descriptionJa,
      image: product.image,
      specs: product.specs,
      category: product.category,
      rating: product.rating,
      sales: getLocalizedText(product, "sales"),
      salesEn: product.salesEn,
      salesJa: product.salesJa,
      badges: product.badges,
      badgesEn: product.badgesEn,
      badgesJa: product.badgesJa,
      isPopular: product.isPopular,
      addToCartFromHome: true, // 标记来自首页
    }

    localStorage.setItem("pendingProduct", JSON.stringify(productToAdd))

    // 跳转到到店取餐页面
    router.push("/pickup")
  }



  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MiniHeader />





      {/* Search Bar */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Quick Services */}
      <div className="bg-white px-4 py-4 border-b">
        <div className="flex justify-between">
          {quickServices.map((service) => (
            <Link key={service.key} href={service.path}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center text-xl`}>
                  {service.icon}
                </div>
                <span className="text-xs text-gray-700 text-center">{t(service.key)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>



      {/* New Products Section - 新品上市 */}
      {newProducts.length > 0 && (
        <div className="bg-white mx-4 my-3 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-red-600">🆕</span>
                {language === "en" ? "New Launch" : language === "ja" ? "新商品発売" : "新品上市"}
              </h2>
              <Link href="/menu?category=all" className="text-sm text-red-600">
                {t("viewMore")}
              </Link>
            </div>
          </div>
          <div className="p-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {newProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-48 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-3 border border-red-100"
                >
                  <div className="relative">
                    <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-white">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={getLocalizedText(product, "name")}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-600 text-white text-xs px-2 py-0.5">
                        {language === "en" ? "NEW" : language === "ja" ? "新商品" : "新品"}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">
                    {getLocalizedText(product, "name")}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 line-through">
                        {getPriceSymbol()}
                        {language === "en"
                          ? (Number.parseFloat(product.specs[0].priceEn) * 1.2).toFixed(2)
                          : language === "ja"
                            ? Math.round(Number.parseFloat(product.specs[0].priceJa) * 1.2)
                            : Math.round(Number.parseFloat(product.specs[0].price) * 1.2)}
                      </span>
                      <span className="text-red-600 font-bold">
                        {getPriceSymbol()}
                        {language === "en"
                          ? product.specs[0].priceEn
                          : language === "ja"
                            ? product.specs[0].priceJa
                            : product.specs[0].price}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Combo Products Section - 套餐特惠 */}
      {comboProducts.length > 0 && (
        <div className="bg-white mx-4 my-3 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-orange-600">🍱</span>
                {language === "en" ? "Combo Deal" : language === "ja" ? "セット特価" : "套餐特惠"}
              </h2>
              <Link href="/menu?category=combo" className="text-sm text-red-600">
                {t("viewMore")}
              </Link>
            </div>
          </div>
          <div className="p-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {comboProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-48 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-3 border border-orange-100"
                >
                  <div className="relative">
                    <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-white">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={getLocalizedText(product, "name")}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-orange-600 text-white text-xs px-2 py-0.5">
                        {language === "en" ? "COMBO" : language === "ja" ? "セット" : "套餐"}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">
                    {getLocalizedText(product, "name")}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                    <span className="text-xs text-gray-500">{getLocalizedText(product, "sales")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">
                        {language === "en" ? "Save" : language === "ja" ? "お得" : "立省"}
                        {getPriceSymbol()}
                        {language === "en" ? "2.00" : language === "ja" ? "200" : "10"}
                      </span>
                      <span className="text-orange-600 font-bold">
                        {getPriceSymbol()}
                        {language === "en"
                          ? product.specs[0].priceEn
                          : language === "ja"
                            ? product.specs[0].priceJa
                            : product.specs[0].price}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors shadow-lg"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hot Products */}
      <div className="bg-white mx-4 my-3 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">{t("hotRecommendations")}</h2>
            <Link href="/menu" className="text-sm text-red-600">
              {t("viewMore")}
            </Link>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {hotProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-100 rounded-xl p-3 hover:shadow-md transition-shadow"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-square mb-2 rounded-lg overflow-hidden bg-gray-50">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={getLocalizedText(product, "name")}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <h3 className="font-medium text-sm text-gray-800 mb-1 line-clamp-1">
                  {getLocalizedText(product, "name")}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-500">{getLocalizedText(product, "sales")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-bold">
                    {getPriceSymbol()}
                    {language === "en"
                      ? product.specs[0].priceEn
                      : language === "ja"
                        ? product.specs[0].priceJa
                        : product.specs[0].price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <ShoppingCart className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Special */}
      <div className="bg-white mx-4 my-3 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-800">{t("todaySpecial")}</h2>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-red-50 rounded-xl p-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/daily-special-combo.png"
                alt={t("todaySpecial")}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm text-gray-800 mb-1">
                {getLocalizedText(todaySpecialProduct, "name")}
              </h3>
              <p className="text-xs text-gray-600 mb-2">{getLocalizedText(todaySpecialProduct, "description")}</p>
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-bold">
                  {getPriceSymbol()}
                  {language === "en"
                    ? todaySpecialProduct.specs[0].priceEn
                    : language === "ja"
                      ? todaySpecialProduct.specs[0].priceJa
                      : todaySpecialProduct.specs[0].price}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  {getPriceSymbol()}
                  {language === "en"
                    ? todaySpecialProduct.specs[0].originalPriceEn
                    : language === "ja"
                      ? todaySpecialProduct.specs[0].originalPriceJa
                      : todaySpecialProduct.specs[0].originalPrice}
                </span>
                <Badge className="bg-red-600 text-white text-xs px-2 py-0.5">{t("limitedTime")}</Badge>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-xs px-3"
              onClick={() => handleAddToCart(todaySpecialProduct)}
            >
              {t("buyNow")}
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
