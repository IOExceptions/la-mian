"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Clock, Star, Search, Store, ShoppingCart, TrendingUp, ChevronDown } from 'lucide-react'
import { BottomNav } from "@/components/bottom-nav"
import { StickyPickupBar } from "@/components/sticky-pickup-bar"
import { ProductSpecModal } from "@/components/product-spec-modal"
import { useLanguage } from "@/contexts/language-context"
import { categories, products, nearbyStores } from "@/lib/data"

interface CartItem {
  productId: number
  productName: string
  productNameEn: string
  productNameJa: string
  specId: string
  specName: string
  specNameEn: string
  specNameJa: string
  price: number
  quantity: number
  image: string
  selectedSides: Array<{
    id: string
    name: string
    nameEn: string
    nameJa: string
    price: number
  }>
}

export default function PickupPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showSpecModal, setShowSpecModal] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedStore, setSelectedStore] = useState(nearbyStores[0])
  const [showStoreSelector, setShowStoreSelector] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
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

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setShowSpecModal(true)
  }

  const handleAddToCart = (product: any, spec: any, quantity: number, selectedSides: any[]) => {
    const cartItem: CartItem = {
      productId: product.id,
      productName: product.name,
      productNameEn: product.nameEn,
      productNameJa: product.nameJa,
      specId: spec.id,
      specName: spec.name,
      specNameEn: spec.nameEn,
      specNameJa: spec.nameJa,
      price: Number.parseFloat(language === "en" ? spec.priceEn : language === "ja" ? spec.priceJa : spec.price),
      quantity,
      image: product.image,
      selectedSides: selectedSides.map(side => ({
        id: side.id,
        name: side.name,
        nameEn: side.nameEn,
        nameJa: side.nameJa,
        price: Number.parseFloat(language === "en" ? side.priceEn : language === "ja" ? side.priceJa : side.price)
      }))
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => 
        item.productId === product.id && 
        item.specId === spec.id &&
        JSON.stringify(item.selectedSides) === JSON.stringify(cartItem.selectedSides)
      )

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
      const itemTotal = item.price * item.quantity
      const sidesTotal = item.selectedSides.reduce((sideSum, side) => sideSum + side.price, 0) * item.quantity
      return total + itemTotal + sidesTotal
    }, 0)
  }

  // 从 localStorage 加载购物车数据
  useEffect(() => {
    const savedItems = localStorage.getItem("pickupCartItems")
    if (savedItems) {
      try {
        const items = JSON.parse(savedItems)
        setCartItems(items)
      } catch (error) {
        console.error("Error loading pickup cart items:", error)
        setCartItems([])
      }
    }
  }, [])

  // 保存购物车数据到 localStorage
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("pickupCartItems", JSON.stringify(cartItems))
    }
  }, [cartItems])

  // 处理从首页传来的商品
  useEffect(() => {
    const pendingProduct = localStorage.getItem("pendingProduct")
    if (pendingProduct) {
      try {
        const product = JSON.parse(pendingProduct)
        if (product.addToCartFromHome) {
          localStorage.removeItem("pendingProduct")
          setSelectedProduct(product)
          setShowSpecModal(true)
          setTimeout(() => {
            const message =
              language === "en"
                ? "Please select options for the product from homepage"
                : language === "ja"
                  ? "ホームページからの商品のオプションを選択してください"
                  : "请为首页商品选择规格"
            console.log(message)
          }, 500)
        }
      } catch (error) {
        console.error("Error parsing pending product:", error)
        localStorage.removeItem("pendingProduct")
      }
    }
  }, [language])

  // 监听滚动事件
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: "-120px 0px 0px 0px", // 调整边距以适应新的布局
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
      {/* Sticky Pickup Bar */}
      <StickyPickupBar isVisible={showStickyBar} selectedStore={selectedStore} />

      {/* Header */}
      <header ref={headerRef} className="bg-white px-4 py-3 border-b">
        <div className="flex items-center gap-3 mb-3">
          <Link href="/">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-800">
              {language === "en" ? "Pickup at Store" : language === "ja" ? "店舗受取" : "到店取餐"}
            </span>
          </div>
        </div>

        {/* Store Info */}
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-sm text-gray-800">{getLocalizedText(selectedStore, "name")}</span>
              <span className="text-xs text-gray-500">{selectedStore.distance}</span>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="w-3 h-3" />
              <span className="text-xs font-medium">{getLocalizedText(selectedStore, "pickupTime")}</span>
            </div>
            <button
              onClick={() => setShowStoreSelector(!showStoreSelector)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          {/* Store Selector Dropdown */}
          {showStoreSelector && (
            <div className="mt-3 border-t pt-3 space-y-2">
              {nearbyStores.map((store) => (
                <button
                  key={store.id}
                  onClick={() => {
                    setSelectedStore(store)
                    setShowStoreSelector(false)
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedStore.id === store.id ? "border-red-600 bg-red-50" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm text-gray-800">{getLocalizedText(store, "name")}</h4>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${store.isOpen ? "bg-green-500" : "bg-red-500"}`}></div>
                          <span className={`text-xs ${store.isOpen ? "text-green-600" : "text-red-600"}`}>
                            {t(store.status)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{getLocalizedText(store, "address")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">{store.distance}</p>
                      <p className="text-xs text-green-600">{getLocalizedText(store, "pickupTime")}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
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

      {/* Categories Bar - Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[6rem] z-20">
        <div className="px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 transition-colors whitespace-nowrap flex-shrink-0 border-b-2 ${
                  selectedCategory === category.id
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-medium">
                  {getLocalizedText(category, "name")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Products */}
      <div className="p-4">
        {/* 来自首页的商品提示 */}
        {selectedProduct && selectedProduct.addToCartFromHome && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-blue-800">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === "en"
                  ? "Product from homepage - Please select options"
                  : language === "ja"
                    ? "ホームページからの商品 - オプションを選択してください"
                    : "来自首页的商品 - 请选择规格"}
              </span>
            </div>
          </div>
        )}

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

      {/* Floating Cart Button */}
      {cartItems.length > 0 && (
        <Link href="/cart?orderType=pickup">
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
        onClose={() => {
          setShowSpecModal(false)
          if (selectedProduct?.addToCartFromHome) {
            setSelectedProduct(null)
          }
        }}
        onAddToCart={handleAddToCart}
      />

      <BottomNav />
    </div>
  )
}
