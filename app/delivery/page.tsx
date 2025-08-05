"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MapPin, Clock, Star, Search, Truck, ShoppingCart, TrendingUp } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { StickyAddressBar } from "@/components/sticky-address-bar"
import { ProductSpecModal } from "@/components/product-spec-modal"
import { useLanguage } from "@/contexts/language-context"
import { categories, products, currentAddress, nearbyStores } from "@/lib/data"

interface CartItem {
  productId: number
  productName: string
  productNameEn: string
  productNameJa: string
  specId: string
  specName: string
  specNameEn: string
  specNameJa: string
  price: string
  priceEn: string
  priceJa: string
  quantity: number
  image: string
}

export default function DeliveryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showSpecModal, setShowSpecModal] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const headerRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  const deliveryStore = {
    name: "一兰拉面(涩谷店)",
    nameEn: "Ichiran Ramen (Shibuya)",
    nameJa: "一蘭ラーメン（渋谷店）",
    distance: "0.8km",
    estimatedTime: "25-35分钟",
    estimatedTimeEn: "25-35 mins",
    estimatedTimeJa: "25-35分",
  }

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

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setShowSpecModal(true)
  }

  const handleAddToCart = (product: any, spec: any, quantity: number) => {
    const cartItem: CartItem = {
      productId: product.id,
      productName: product.name,
      productNameEn: product.nameEn,
      productNameJa: product.nameJa,
      specId: spec.id,
      specName: spec.name,
      specNameEn: spec.nameEn,
      specNameJa: spec.nameJa,
      price: spec.price,
      priceEn: product.language === "en" ? spec.priceEn : spec.price,
      priceJa: product.language === "ja" ? spec.priceJa : spec.price,
      quantity,
      image: product.image,
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.productId === product.id && item.specId === spec.id)

      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      } else {
        return [...prev, cartItem]
      }
    })
  }

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalCartPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = Number.parseFloat(language === "en" ? item.priceEn : language === "ja" ? item.priceJa : item.price)
      return total + price * item.quantity
    }, 0)
  }

  // 监听滚动事件
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 0px 0px",
      },
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Sticky Address Bar */}
      <StickyAddressBar isVisible={showStickyBar} currentAddress={currentAddress} deliveryStore={deliveryStore} />

      {/* Header */}
      <header ref={headerRef} className="bg-white px-4 py-3 border-b">
        <div className="flex items-center gap-3 mb-3">
          <Link href="/">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-800">
              {language === "en" ? "Ramen Delivery" : language === "ja" ? "ラーメン配達" : "拉面外卖"}
            </span>
          </div>
        </div>

        {/* Current Address */}
        <div className="bg-blue-50 rounded-lg p-3 mb-3">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm text-gray-800">
                  {language === "en" ? "Delivery to" : language === "ja" ? "配達先" : "送达地址"}
                </span>
                <button className="text-xs text-blue-600 hover:underline">
                  {language === "en" ? "Change" : language === "ja" ? "変更" : "修改"}
                </button>
              </div>
              <p className="text-sm text-gray-700 font-medium">{getLocalizedText(currentAddress, "name")}</p>
              <p className="text-xs text-gray-500">{getLocalizedText(currentAddress, "detail")}</p>
            </div>
          </div>
        </div>

        {/* Store Info */}
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-sm text-gray-800">{getLocalizedText(nearbyStores[0], "name")}</span>
              <span className="text-xs text-gray-500">{nearbyStores[0].distance}</span>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="w-3 h-3" />
              <span className="text-xs font-medium">{getLocalizedText(nearbyStores[0], "deliveryTime")}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar - Now Sticky */}
      <div className="bg-white px-4 py-3 border-b sticky top-[2rem] z-30">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={
              language === "en" ? "Search ramen..." : language === "ja" ? "ラーメンを検索..." : "搜索拉面..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-100 border-none rounded-full"
          />
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Left Sidebar - Categories */}
        <div className="w-20 bg-white border-r border-gray-200 sticky top-[6rem] h-screen overflow-y-auto z-20">
          <div className="py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex flex-col items-center gap-1 py-3 px-2 transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-xs font-medium text-center leading-tight">
                  {getLocalizedText(category, "name")}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content - Products */}
        <div className="flex-1 p-4">
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  {/* Top Section: Image + Info */}
                  <div className="flex gap-3 mb-4">
                    {/* Left: Product Image */}
                    <div className="w-20 h-20 flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={getLocalizedText(product, "name")}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex-1 min-w-0">
                      {/* Title and Badges */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">
                            {getLocalizedText(product, "name")}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {getLocalizedText(product, "description")}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 ml-2">
                          {(language === "en"
                            ? product.badgesEn
                            : language === "ja"
                              ? product.badgesJa
                              : product.badges
                          ).map((badge: string) => (
                            <Badge key={badge} className="bg-red-600 text-white text-xs px-2 py-0.5">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Popularity and Stats */}
                      <div className="flex items-center gap-3">
                        {/* Popular Badge */}
                        {product.isPopular && (
                          <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-xs font-medium">
                              {language === "en" ? "Popular" : language === "ja" ? "人気" : "人气"}
                            </span>
                          </div>
                        )}

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>

                        {/* Sales */}
                        <span className="text-sm text-gray-500">{getLocalizedText(product, "sales")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section: Price + Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {language === "en" ? "From" : language === "ja" ? "〜" : "起"}
                      </span>
                      <span className="text-xl font-bold text-red-600">
                        {getPriceSymbol()}
                        {language === "en"
                          ? Math.min(...product.specs.map((s: any) => Number.parseFloat(s.priceEn))).toFixed(2)
                          : language === "ja"
                            ? Math.min(...product.specs.map((s: any) => Number.parseFloat(s.priceJa))).toFixed(0)
                            : Math.min(...product.specs.map((s: any) => Number.parseFloat(s.price))).toFixed(0)}
                      </span>
                    </div>
                    <Button
                      onClick={() => handleProductClick(product)}
                      className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 py-2"
                    >
                      {language === "en" ? "Select Options" : language === "ja" ? "オプション選択" : "选择规格"}
                    </Button>
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
                    : "没有找到相关拉面"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItems.length > 0 && (
        <Link href="/cart?orderType=delivery">
          <div className="fixed bottom-20 right-4 bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700 transition-colors z-50">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-red-600">{getTotalCartItems()}</span>
              </div>
            </div>
            <div className="text-xs mt-1 text-center">
              {getPriceSymbol()}
              {getTotalCartPrice().toFixed(language === "en" ? 2 : 0)}
            </div>
          </div>
        </Link>
      )}

      {/* Product Spec Modal */}
      <ProductSpecModal
        product={selectedProduct}
        isOpen={showSpecModal}
        onClose={() => setShowSpecModal(false)}
        onAddToCart={handleAddToCart}
      />

      <BottomNav />
    </div>
  )
}
