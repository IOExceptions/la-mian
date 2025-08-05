import Link from "next/link"
import { MapPin, Phone, Clock, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">拉</span>
              </div>
              <span className="text-xl font-bold">一兰拉面</span>
            </div>
            <p className="text-gray-400 mb-4">
              为您提供正宗美味的日式拉面，传承经典工艺，致力于成为您最喜爱的拉面品牌。
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>营业时间：11:00 - 23:00</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/menu" className="hover:text-white transition-colors">
                  菜单
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-white transition-colors">
                  门店查询
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="hover:text-white transition-colors">
                  营养信息
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  招聘信息
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">客户服务</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  帮助中心
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-white transition-colors">
                  意见反馈
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">联系方式</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>03-1234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>service@ichiran-ramen.jp</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>东京都涩谷区道玄坂1-2-3</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 一兰拉面. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}
