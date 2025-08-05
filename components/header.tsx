"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, User, MapPin } from "lucide-react"

export function Header() {
  const [cartCount] = useState(3)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">拉</span>
            </div>
            <span className="text-xl font-bold text-red-600">一兰拉面</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">
              首页
            </Link>
            <Link href="/menu" className="text-gray-700 hover:text-red-600 font-medium">
              菜单
            </Link>
            <Link href="/stores" className="text-gray-700 hover:text-red-600 font-medium">
              门店
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium">
              关于我们
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Location */}
            <div className="hidden md:flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>东京涩谷区</span>
            </div>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center bg-red-600">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User */}
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium">
                    首页
                  </Link>
                  <Link href="/menu" className="text-lg font-medium">
                    菜单
                  </Link>
                  <Link href="/stores" className="text-lg font-medium">
                    门店
                  </Link>
                  <Link href="/about" className="text-lg font-medium">
                    关于我们
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
