"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Plus, Minus, Heart, ArrowLeft, Share } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { products } from "@/lib/data" // Import products from lib/data
import { useLanguage } from "@/contexts/language-context"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { t, language } = useLanguage()
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId)

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const getLocalizedText = (item: any, field: string) => {
    if (language === "en") return item[`${field}En`] || item[field]
    if (language === "ja") return item[`${field}Ja`] || item[field]
    return item[field]
  }

  const getPriceSymbol = () => {
    if (language === "en") return "$"
    return "¥"
  }

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product?.name} to cart`)
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
      </div>
    )
  }

  // For simplicity, assuming the first spec is the default for display on this page
  const defaultSpec = product.specs[0]
  const currentPrice = Number.parseFloat(
    language === "en" ? defaultSpec.priceEn : language === "ja" ? defaultSpec.priceJa : defaultSpec.price,
  )
  const originalPrice = defaultSpec.originalPrice ? Number.parseFloat(defaultSpec.originalPrice) : null

  // Mock nutrition and ingredients for single product page
  const nutrition = {
    calories: 680,
    protein: 35,
    fat: 28,
    carbs: 65,
    sodium: 1850,
  }
  const ingredients = ["豚骨汤底", "拉面", "叉烧肉", "溏心蛋", "笋干", "海苔", "葱花", "蒜泥"]
  const allergens = ["小麦", "鸡蛋", "大豆"]

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 2)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Custom Header for Product Page */}
      <header className="bg-white px-4 py-3 flex items-center justify-between border-b sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <span className="font-medium text-gray-800">
            {language === "en" ? "Product Details" : language === "ja" ? "商品詳細" : "商品详情"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsFavorite(!isFavorite)} className={isFavorite ? "text-red-600" : "text-gray-500"}>
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </button>
          <Share className="w-5 h-5 text-gray-500" />
        </div>
      </header>

      {/* Product Images */}
      <div className="bg-white">
        <div className="aspect-square relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={getLocalizedText(product, "name")}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {(language === "en" ? product.badgesEn : language === "ja" ? product.badgesJa : product.badges).map(
              (badge: string) => (
                <Badge key={badge} className="bg-red-600 text-white">
                  {badge}
                </Badge>
              ),
            )}
          </div>
        </div>

        {/* Image Thumbnails - using product.image as main, no additional images in data */}
        {/* For now, we'll just show the main image as a thumbnail */}
        <div className="flex gap-2 p-4">
          <button
            onClick={() => setSelectedImage(0)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
              selectedImage === 0 ? "border-red-600" : "border-gray-200"
            }`}
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={`${getLocalizedText(product, "name")} 1`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white mx-4 my-3 rounded-xl p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-2">{getLocalizedText(product, "name")}</h1>
        <p className="text-gray-600 text-sm mb-3">{getLocalizedText(product, "description")}</p>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-sm">{product.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">({getLocalizedText(product, "sales")} 评价)</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-red-600">
            {getPriceSymbol()}
            {currentPrice.toFixed(language === "en" ? 2 : 0)}
          </span>
          {originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              {getPriceSymbol()}
              {originalPrice.toFixed(language === "en" ? 2 : 0)}
            </span>
          )}
          {originalPrice && (
            <Badge className="bg-red-100 text-red-600">
              省{getPriceSymbol()}
              {(originalPrice - currentPrice).toFixed(language === "en" ? 2 : 0)}
            </Badge>
          )}
        </div>

        <Separator className="my-4" />

        {/* Quantity Selector */}
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-800">
            {language === "en" ? "Quantity" : language === "ja" ? "数量" : "数量"}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white mx-4 my-3 rounded-xl overflow-hidden">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50">
            <TabsTrigger value="details" className="text-xs">
              {language === "en" ? "Details" : language === "ja" ? "詳細" : "详情"}
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="text-xs">
              {language === "en" ? "Nutrition" : language === "ja" ? "栄養" : "营养"}
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs">
              {language === "en" ? "Reviews" : language === "ja" ? "レビュー" : "评价"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">
                  {language === "en" ? "Ingredients" : language === "ja" ? "原材料" : "配料表"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">
                  {language === "en" ? "Allergen Information" : language === "ja" ? "アレルゲン情報" : "过敏原信息"}
                </h3>
                <div className="flex gap-2">
                  {allergens.map((allergen) => (
                    <Badge key={allergen} variant="destructive" className="text-xs">
                      {allergen}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-red-600">{nutrition.calories}</div>
                <div className="text-xs text-gray-600">
                  {language === "en" ? "Calories" : language === "ja" ? "カロリー" : "卡路里"}
                </div>
              </div>
              <div>
                <div className="text-lg font-bold">{nutrition.protein}g</div>
                <div className="text-xs text-gray-600">
                  {language === "en" ? "Protein" : language === "ja" ? "タンパク質" : "蛋白质"}
                </div>
              </div>
              <div>
                <div className="text-lg font-bold">{nutrition.fat}g</div>
                <div className="text-xs text-gray-600">
                  {language === "en" ? "Fat" : language === "ja" ? "脂質" : "脂肪"}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="p-4">
            <div className="text-center py-8 text-gray-500 text-sm">
              {language === "en" ? "No reviews yet" : language === "ja" ? "まだレビューはありません" : "暂无评价"}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="bg-white mx-4 my-3 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="font-medium text-gray-800">
            {language === "en" ? "Related Recommendations" : language === "ja" ? "関連おすすめ" : "相关推荐"}
          </h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="border border-gray-100 rounded-lg p-3">
                <div className="aspect-square mb-2 rounded-lg overflow-hidden bg-gray-50">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={getLocalizedText(relatedProduct, "name")}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-sm mb-1 line-clamp-1">{getLocalizedText(relatedProduct, "name")}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-bold text-sm">
                    {getPriceSymbol()}
                    {language === "en"
                      ? relatedProduct.specs[0].priceEn
                      : language === "ja"
                        ? relatedProduct.specs[0].priceJa
                        : relatedProduct.specs[0].price}
                  </span>
                  <button className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <Plus className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t px-4 py-3 z-40">
        <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 rounded-full" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          {t("addToCart")} - {getPriceSymbol()}
          {(currentPrice * quantity).toFixed(language === "en" ? 2 : 0)}
        </Button>
      </div>

      <BottomNav />
    </div>
  )
}
