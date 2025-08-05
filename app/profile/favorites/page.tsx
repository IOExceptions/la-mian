"use client"
import { useState } from "react"
import { ArrowLeft, Heart, Trash2, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { BottomNav } from "@/components/bottom-nav"
import Image from "next/image"
import Link from "next/link"

export default function FavoritesPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [favorites, setFavorites] = useState([
    {
      id: "1",
      name: {
        zh: "豚骨拉面特制版",
        en: "Special Tonkotsu Ramen",
        ja: "特製豚骨ラーメン",
      },
      price: 45,
      image: "/tonkotsu-ramen-special.png",
      category: "ramen",
    },
    {
      id: "2",
      name: {
        zh: "巨无霸汉堡",
        en: "Big Mac Burger",
        ja: "ビッグマック",
      },
      price: 28,
      image: "/big-mac-burger.png",
      category: "burger",
    },
    {
      id: "3",
      name: {
        zh: "奥利奥麦旋风",
        en: "Oreo McFlurry",
        ja: "オレオマックフルーリー",
      },
      price: 15,
      image: "/oreo-mcflurry.png",
      category: "dessert",
    },
  ])

  const getPageTitle = () => {
    return language === "zh" ? "我的收藏" : language === "en" ? "My Favorites" : "お気に入り"
  }

  const getEmptyText = () => {
    return language === "zh" ? "暂无收藏商品" : language === "en" ? "No favorite items" : "お気に入りの商品がありません"
  }

  const getAddToCartText = () => {
    return language === "zh" ? "加入购物车" : language === "en" ? "Add to Cart" : "カートに追加"
  }

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((item) => item.id !== id))
  }

  const addToCart = (item: any) => {
    // 添加到购物车逻辑
    console.log("Added to cart:", item)
  }

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

      <div className="p-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500">{getEmptyText()}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex gap-4">
                  <Link href={`/product/${item.id}`} className="flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name[language as keyof typeof item.name]}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {item.name[language as keyof typeof item.name]}
                      </h3>
                    </Link>
                    <p className="text-red-600 font-semibold text-lg">¥{item.price}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => removeFavorite(item.id)} className="p-2 text-gray-400 hover:text-red-500">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
