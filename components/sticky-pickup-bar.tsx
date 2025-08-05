"use client"

import { Clock, Store } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface StickyPickupBarProps {
  isVisible: boolean
  selectedStore: {
    name: string
    nameEn: string
    nameJa: string
    pickupTime: string
    pickupTimeEn: string
    pickupTimeJa: string
  }
}

export function StickyPickupBar({ isVisible, selectedStore }: StickyPickupBarProps) {
  const { language } = useLanguage()

  const getLocalizedText = (item: any, field: string) => {
    if (language === "en") return item[`${field}En`] || item[field]
    if (language === "ja") return item[`${field}Ja`] || item[field]
    return item[field]
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-2 z-40 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Store className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-800 truncate">{getLocalizedText(selectedStore, "name")}</span>
        </div>
        <div className="flex items-center gap-1 text-green-600 flex-shrink-0 ml-2">
          <Clock className="w-3 h-3" />
          <span className="text-xs font-medium">{getLocalizedText(selectedStore, "pickupTime")}</span>
        </div>
      </div>
    </div>
  )
}
