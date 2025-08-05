"use client"
import { useState } from "react"
import { ArrowLeft, Search, ChevronRight, MessageCircle, Phone, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { BottomNav } from "@/components/bottom-nav"

export default function HelpCenterPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const getPageTitle = () => {
    return language === "zh" ? "帮助中心" : language === "en" ? "Help Center" : "ヘルプセンター"
  }

  const getSearchPlaceholder = () => {
    return language === "zh" ? "搜索帮助内容..." : language === "en" ? "Search help content..." : "ヘルプ内容を検索..."
  }

  const getHelpSections = () => {
    return [
      {
        title: language === "zh" ? "常见问题" : language === "en" ? "FAQ" : "よくある質問",
        items: [
          {
            question: language === "zh" ? "如何下单？" : language === "en" ? "How to place an order?" : "注文方法は？",
            answer:
              language === "zh"
                ? "选择商品后点击加入购物车，然后进入购物车页面结算即可。"
                : language === "en"
                  ? "Select items and add to cart, then proceed to checkout."
                  : "商品を選択してカートに追加し、チェックアウトに進んでください。",
          },
          {
            question:
              language === "zh"
                ? "配送时间多久？"
                : language === "en"
                  ? "How long is delivery?"
                  : "配送時間はどのくらい？",
            answer:
              language === "zh"
                ? "一般配送时间为30-45分钟，具体时间根据距离和订单量而定。"
                : language === "en"
                  ? "Delivery usually takes 30-45 minutes, depending on distance and order volume."
                  : "配送は通常30-45分です。距離と注文量によって異なります。",
          },
          {
            question:
              language === "zh"
                ? "如何取消订单？"
                : language === "en"
                  ? "How to cancel an order?"
                  : "注文をキャンセルするには？",
            answer:
              language === "zh"
                ? "在订单确认前可以取消，确认后请联系客服处理。"
                : language === "en"
                  ? "You can cancel before order confirmation. After confirmation, please contact customer service."
                  : "注文確認前はキャンセル可能です。確認後はカスタマーサービスにお問い合わせください。",
          },
        ],
      },
      {
        title: language === "zh" ? "支付相关" : language === "en" ? "Payment" : "支払いについて",
        items: [
          {
            question:
              language === "zh"
                ? "支持哪些支付方式？"
                : language === "en"
                  ? "What payment methods are supported?"
                  : "どの支払い方法がサポートされていますか？",
            answer:
              language === "zh"
                ? "支持微信支付、支付宝、银行卡等多种支付方式。"
                : language === "en"
                  ? "We support WeChat Pay, Alipay, bank cards and other payment methods."
                  : "WeChat Pay、Alipay、銀行カードなど複数の支払い方法をサポートしています。",
          },
          {
            question:
              language === "zh"
                ? "支付失败怎么办？"
                : language === "en"
                  ? "What if payment fails?"
                  : "支払いが失敗した場合は？",
            answer:
              language === "zh"
                ? "请检查网络连接和支付账户余额，或尝试其他支付方式。"
                : language === "en"
                  ? "Please check your network connection and account balance, or try another payment method."
                  : "ネットワーク接続とアカウント残高を確認するか、他の支払い方法をお試しください。",
          },
        ],
      },
      {
        title: language === "zh" ? "账户管理" : language === "en" ? "Account Management" : "アカウント管理",
        items: [
          {
            question:
              language === "zh"
                ? "如何修改个人信息？"
                : language === "en"
                  ? "How to modify personal information?"
                  : "個人情報を変更するには？",
            answer:
              language === "zh"
                ? "进入个人中心-个人信息页面即可修改。"
                : language === "en"
                  ? "Go to Profile - Personal Info to make changes."
                  : "プロフィール - 個人情報ページで変更できます。",
          },
          {
            question:
              language === "zh"
                ? "忘记密码怎么办？"
                : language === "en"
                  ? "What if I forget my password?"
                  : "パスワードを忘れた場合は？",
            answer:
              language === "zh"
                ? "在登录页面点击忘记密码，通过手机号或邮箱重置。"
                : language === "en"
                  ? "Click 'Forgot Password' on the login page and reset via phone or email."
                  : "ログインページで「パスワードを忘れた」をクリックし、電話またはメールでリセットしてください。",
          },
        ],
      },
    ]
  }

  const getContactInfo = () => {
    return {
      title: language === "zh" ? "联系我们" : language === "en" ? "Contact Us" : "お問い合わせ",
      methods: [
        {
          icon: MessageCircle,
          label: language === "zh" ? "在线客服" : language === "en" ? "Live Chat" : "ライブチャット",
          value: language === "zh" ? "24小时在线" : language === "en" ? "24/7 Available" : "24時間対応",
          action: () => console.log("Open live chat"),
        },
        {
          icon: Phone,
          label: language === "zh" ? "客服热线" : language === "en" ? "Hotline" : "ホットライン",
          value: "400-123-4567",
          action: () => window.open("tel:400-123-4567"),
        },
        {
          icon: Mail,
          label: language === "zh" ? "邮箱客服" : language === "en" ? "Email Support" : "メールサポート",
          value: "support@example.com",
          action: () => window.open("mailto:support@example.com"),
        },
      ],
    }
  }

  const helpSections = getHelpSections()
  const contactInfo = getContactInfo()

  const filteredSections = helpSections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((section) => section.items.length > 0)

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

      <div className="p-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={getSearchPlaceholder()}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Help Sections */}
        {(searchQuery ? filteredSections : helpSections).map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900 px-2">{section.title}</h2>
            <div className="bg-white rounded-lg divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => (
                <details key={itemIndex} className="group">
                  <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50">
                    <span className="text-gray-900 font-medium">{item.question}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* Contact Info */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900 px-2">{contactInfo.title}</h2>
          <div className="bg-white rounded-lg divide-y divide-gray-100">
            {contactInfo.methods.map((method, index) => {
              const Icon = method.icon
              return (
                <button
                  key={index}
                  onClick={method.action}
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Icon className="w-5 h-5 text-red-600" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{method.label}</p>
                    <p className="text-sm text-gray-600">{method.value}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
