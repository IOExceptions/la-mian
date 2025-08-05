"use client"
import { useState } from "react"
import { ArrowLeft, Camera, Edit2, Save, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { BottomNav } from "@/components/bottom-nav"
import Image from "next/image"

export default function PersonalInfoPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: language === "zh" ? "拉面爱好者" : language === "en" ? "Ramen Lover" : "ラーメン愛好家",
    phone: "+86 138 0013 8000",
    email: "ramen.lover@example.com",
    birthday: "1990-05-15",
    gender: "male",
  })

  const getPageTitle = () => {
    return language === "zh" ? "个人信息" : language === "en" ? "Personal Info" : "個人情報"
  }

  const getLabels = () => {
    return {
      name: language === "zh" ? "姓名" : language === "en" ? "Name" : "名前",
      phone: language === "zh" ? "手机号" : language === "en" ? "Phone" : "電話番号",
      email: language === "zh" ? "邮箱" : language === "en" ? "Email" : "メール",
      birthday: language === "zh" ? "生日" : language === "en" ? "Birthday" : "誕生日",
      gender: language === "zh" ? "性别" : language === "en" ? "Gender" : "性別",
      male: language === "zh" ? "男" : language === "en" ? "Male" : "男性",
      female: language === "zh" ? "女" : language === "en" ? "Female" : "女性",
      edit: language === "zh" ? "编辑" : language === "en" ? "Edit" : "編集",
      save: language === "zh" ? "保存" : language === "en" ? "Save" : "保存",
      cancel: language === "zh" ? "取消" : language === "en" ? "Cancel" : "キャンセル",
      changeAvatar: language === "zh" ? "更换头像" : language === "en" ? "Change Avatar" : "アバター変更",
    }
  }

  const labels = getLabels()

  const handleSave = () => {
    // 这里可以添加保存逻辑
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // 重置表单数据
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
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="flex items-center gap-1 px-3 py-1 text-red-600 font-medium"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            {isEditing ? labels.save : labels.edit}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Avatar Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src="/placeholder.svg?height=96&width=96&text=User"
                  alt="Avatar"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
            {isEditing && <button className="mt-3 text-red-600 text-sm font-medium">{labels.changeAvatar}</button>}
          </div>
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-lg divide-y divide-gray-100">
          {/* Name */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-gray-600 w-20">{labels.name}</span>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="flex-1 text-right bg-transparent border-none outline-none text-gray-900"
              />
            ) : (
              <span className="text-gray-900">{formData.name}</span>
            )}
          </div>

          {/* Phone */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-gray-600 w-20">{labels.phone}</span>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="flex-1 text-right bg-transparent border-none outline-none text-gray-900"
              />
            ) : (
              <span className="text-gray-900">{formData.phone}</span>
            )}
          </div>

          {/* Email */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-gray-600 w-20">{labels.email}</span>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="flex-1 text-right bg-transparent border-none outline-none text-gray-900"
              />
            ) : (
              <span className="text-gray-900">{formData.email}</span>
            )}
          </div>

          {/* Birthday */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-gray-600 w-20">{labels.birthday}</span>
            {isEditing ? (
              <input
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                className="flex-1 text-right bg-transparent border-none outline-none text-gray-900"
              />
            ) : (
              <span className="text-gray-900">{formData.birthday}</span>
            )}
          </div>

          {/* Gender */}
          <div className="p-4 flex items-center justify-between">
            <span className="text-gray-600 w-20">{labels.gender}</span>
            {isEditing ? (
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="flex-1 text-right bg-transparent border-none outline-none text-gray-900"
              >
                <option value="male">{labels.male}</option>
                <option value="female">{labels.female}</option>
              </select>
            ) : (
              <span className="text-gray-900">{formData.gender === "male" ? labels.male : labels.female}</span>
            )}
          </div>
        </div>

        {/* Cancel Button (only show when editing) */}
        {isEditing && (
          <button
            onClick={handleCancel}
            className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            {labels.cancel}
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
