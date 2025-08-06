"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface StickyDeliveryBarProps {
  selectedDelivery: string
  onDeliveryChange: (type: string) => void
  isVisible: boolean
}

export function StickyDeliveryBar({ selectedDelivery, onDeliveryChange, isVisible }: StickyDeliveryBarProps) {
  const { t } = useLanguage()

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-2 z-40 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-start gap-4">
        <Link href="/pickup">
          <button
            className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-sm font-medium transition-colors bg-green-600 text-white"
          >
            <div className="relative">
              <span className="text-base">🏪</span>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-green-600 rounded-full"></div>
              </div>
            </div>
            <span className="text-xs leading-none">{t("pickup")}</span>
          </button>
        </Link>
      </div>
    </div>
  )
}
