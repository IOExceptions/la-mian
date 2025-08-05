"use client"
import { useState } from "react"
import { ArrowLeft, Plus, MapPin, Edit2, Trash2, Home, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { BottomNav } from "@/components/bottom-nav"

export default function AddressesPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      type: "home",
      name: language === "zh" ? "家" : language === "en" ? "Home" : "自宅",
      contact: language === "zh" ? "张先生" : language === "en" ? "Mr. Zhang" : "張さん",
      phone: "+86 138 0013 8000",
      address:
        language === "zh"
          ? "北京市朝阳区三里屯街道工体北路8号"
          : language === "en"
            ? "No.8 Gongti North Road, Sanlitun Street, Chaoyang District, Beijing"
            : "北京市朝陽区三里屯街道工体北路8号",
      isDefault: true,
    },
    {
      id: "2",
      type: "office",
      name: language === "zh" ? "公司" : language === "en" ? "Office" : "会社",
      contact: language === "zh" ? "张先生" : language === "en" ? "Mr. Zhang" : "張さん",
      phone: "+86 138 0013 8000",
      address:
        language === "zh"
          ? "北京市海淀区中关村大街1号"
          : language === "en"
            ? "No.1 Zhongguancun Street, Haidian District, Beijing"
            : "北京市海淀区中関村大街1号",
      isDefault: false,
    },
  ])

  const getPageTitle = () => {
    return language === "zh" ? "地址管理" : language === "en" ? "Address Management" : "住所管理"
  }

  const getLabels = () => {
    return {
      addAddress: language === "zh" ? "添加地址" : language === "en" ? "Add Address" : "住所を追加",
      defaultAddress: language === "zh" ? "默认地址" : language === "en" ? "Default" : "デフォルト",
      setDefault: language === "zh" ? "设为默认" : language === "en" ? "Set Default" : "デフォルトに設定",
      edit: language === "zh" ? "编辑" : language === "en" ? "Edit" : "編集",
      delete: language === "zh" ? "删除" : language === "en" ? "Delete" : "削除",
    }
  }

  const labels = getLabels()

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="w-5 h-5 text-red-600" />
      case "office":
        return <Building2 className="w-5 h-5 text-blue-600" />
      default:
        return <MapPin className="w-5 h-5 text-gray-600" />
    }
  }

  const setDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
  }

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
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

      <div className="p-4 space-y-4">
        {/* Add Address Button */}
        <button className="w-full bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-red-300 hover:text-red-600">
          <Plus className="w-8 h-8" />
          <span className="font-medium">{labels.addAddress}</span>
        </button>

        {/* Address List */}
        {addresses.map((address) => (
          <div key={address.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">{getAddressTypeIcon(address.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-gray-900">{address.name}</span>
                  {address.isDefault && (
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                      {labels.defaultAddress}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-1">
                  {address.contact} {address.phone}
                </p>
                <p className="text-gray-800 text-sm leading-relaxed">{address.address}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex gap-4">
                {!address.isDefault && (
                  <button onClick={() => setDefaultAddress(address.id)} className="text-red-600 text-sm font-medium">
                    {labels.setDefault}
                  </button>
                )}
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-1 text-gray-600 text-sm">
                  <Edit2 className="w-4 h-4" />
                  {labels.edit}
                </button>
                <button
                  onClick={() => deleteAddress(address.id)}
                  className="flex items-center gap-1 text-red-600 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  {labels.delete}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
