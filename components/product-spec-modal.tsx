"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Minus, X, Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { sideItems } from "@/lib/data" // Import sideItems from lib/data

interface ProductSpec {
  id: string
  name: string
  nameEn: string
  nameJa: string
  price: string
  priceEn: string
  priceJa: string
  originalPrice?: string
  isDefault?: boolean
}

interface SideItem {
  id: string
  name: string
  nameEn: string
  nameJa: string
  price: string
  priceEn: string
  priceJa: string
  image: string
  description: string
  descriptionEn: string
  descriptionJa: string
}

interface Product {
  id: number
  name: string
  nameEn: string
  nameJa: string
  description: string
  descriptionEn: string
  descriptionJa: string
  image: string
  rating: number
  sales: string
  salesEn: string
  salesJa: string
  badges: string[]
  badgesEn: string[]
  badgesJa: string[]
  specs: ProductSpec[]
}

interface ProductSpecModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product, spec: ProductSpec, quantity: number) => void
}

export function ProductSpecModal({ product, isOpen, onClose, onAddToCart }: ProductSpecModalProps) {
  const [selectedSpec, setSelectedSpec] = useState<ProductSpec | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSides, setSelectedSides] = useState<string[]>([])
  const { language } = useLanguage()

  const getLocalizedText = (item: any, field: string) => {
    if (language === "en") return item[`${field}En`] || item[field]
    if (language === "ja") return item[`${field}Ja`] || item[field]
    return item[field]
  }

  const getPriceSymbol = () => {
    if (language === "en") return "$"
    return "¥"
  }

  // Reset selections when product changes
  useEffect(() => {
    if (product && product.specs && product.specs.length > 0) {
      const defaultSpec = product.specs.find((spec) => spec.isDefault) || product.specs[0]
      setSelectedSpec(defaultSpec)
      setQuantity(1)
      setSelectedSides([])
    } else {
      setSelectedSpec(null)
      setQuantity(1)
      setSelectedSides([])
    }
  }, [product])

  const toggleSideSelection = (sideId: string) => {
    setSelectedSides((prev) => (prev.includes(sideId) ? prev.filter((id) => id !== sideId) : [...prev, sideId]))
  }

  const handleAddToCart = () => {
    if (selectedSpec && product) {
      onAddToCart(product, selectedSpec, quantity)
      onClose()
    }
  }

  const sidesTotal = selectedSides.reduce((total, sideId) => {
    const side = sideItems.find((item) => item.id === sideId)
    if (side) {
      const price = Number.parseFloat(language === "en" ? side.priceEn : language === "ja" ? side.priceJa : side.price)
      return total + price
    }
    return total
  }, 0)

  const totalPrice = selectedSpec
    ? Number.parseFloat(
        language === "en" ? selectedSpec.priceEn : language === "ja" ? selectedSpec.priceJa : selectedSpec.price,
      ) *
        quantity +
      sidesTotal
    : sidesTotal

  // Return null if product is null
  if (!product) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <button onClick={onClose} className="absolute right-0 top-0 p-2 hover:bg-gray-100 rounded-full">
            <X className="w-4 h-4" />
          </button>
          <DialogTitle className="text-left pr-8">
            {language === "en" ? "Select Options" : language === "ja" ? "オプション選択" : "选择规格"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Info */}
          <div className="flex gap-3">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={getLocalizedText(product, "name")}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-gray-800">{getLocalizedText(product, "name")}</h3>
                <div className="flex gap-1">
                  {(language === "en"
                    ? product.badgesEn || []
                    : language === "ja"
                      ? product.badgesJa || []
                      : product.badges || []
                  ).map((badge: string) => (
                    <Badge key={badge} className="bg-red-600 text-white text-xs px-2 py-0.5">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{getLocalizedText(product, "description")}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">{getLocalizedText(product, "sales")}</span>
              </div>
            </div>
          </div>

          {/* Specs Selection */}
          {product.specs && product.specs.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-3">
                {language === "en" ? "Size Options" : language === "ja" ? "サイズオプション" : "规格选择"}
              </h4>
              <div className="space-y-2">
                {product.specs.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedSpec(spec)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      selectedSpec?.id === spec.id ? "border-red-600 bg-red-50" : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedSpec?.id === spec.id ? "border-red-600" : "border-gray-300"
                        }`}
                      >
                        {selectedSpec?.id === spec.id && <div className="w-2 h-2 bg-red-600 rounded-full"></div>}
                      </div>
                      <span className="font-medium text-sm text-gray-800">{getLocalizedText(spec, "name")}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-red-600">
                        {getPriceSymbol()}
                        {language === "en" ? spec.priceEn : language === "ja" ? spec.priceJa : spec.price}
                      </span>
                      {spec.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">
                          {getPriceSymbol()}
                          {spec.originalPrice}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">
              {language === "en" ? "Quantity" : language === "ja" ? "数量" : "数量"}
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-red-600">
                  {getPriceSymbol()}
                  {totalPrice.toFixed(language === "en" ? 2 : 0)}
                </div>
                <div className="text-xs text-gray-500">
                  {language === "en" ? "Total" : language === "ja" ? "合計" : "小计"}
                </div>
              </div>
            </div>
          </div>

          {/* Side Items Selection */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">
              {language === "en" ? "Add Side Items" : language === "ja" ? "サイドメニュー追加" : "添加小食"}
            </h4>
            <div className="space-y-3">
              {sideItems.map((side) => (
                <button
                  key={side.id}
                  onClick={() => toggleSideSelection(side.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    selectedSides.includes(side.id) ? "border-red-600 bg-red-50" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image
                      src={side.image || "/placeholder.svg"}
                      alt={getLocalizedText(side, "name")}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h5 className="font-medium text-sm text-gray-800">{getLocalizedText(side, "name")}</h5>
                    <p className="text-xs text-gray-600">{getLocalizedText(side, "description")}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-red-600 text-sm">
                      +{getPriceSymbol()}
                      {language === "en" ? side.priceEn : language === "ja" ? side.priceJa : side.price}
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedSides.includes(side.id) ? "border-red-600 bg-red-600" : "border-gray-300"
                    }`}
                  >
                    {selectedSides.includes(side.id) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!selectedSpec}
            className="w-full bg-red-600 hover:bg-red-700 rounded-full py-3"
          >
            {language === "en"
              ? `Add to Cart - ${getPriceSymbol()}${totalPrice.toFixed(2)}`
              : language === "ja"
                ? `カートに追加 - ${getPriceSymbol()}${totalPrice.toFixed(0)}`
                : `加入购物车 - ${getPriceSymbol()}${totalPrice.toFixed(0)}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
