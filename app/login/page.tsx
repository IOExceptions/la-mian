"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Phone, Mail } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <h1 className="text-2xl font-bold">欢迎回来</h1>
            <p className="text-gray-600">登录您的麦当劳账户</p>
          </div>

          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>登录账户</CardTitle>
                  <CardDescription>使用手机号或邮箱登录您的账户</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Login Method Toggle */}
                  <div className="flex gap-2">
                    <Button
                      variant={loginMethod === "phone" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLoginMethod("phone")}
                      className="flex-1"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      手机号
                    </Button>
                    <Button
                      variant={loginMethod === "email" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLoginMethod("email")}
                      className="flex-1"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      邮箱
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">{loginMethod === "phone" ? "手机号" : "邮箱"}</Label>
                    <Input
                      id="username"
                      type={loginMethod === "phone" ? "tel" : "email"}
                      placeholder={loginMethod === "phone" ? "请输入手机号" : "请输入邮箱"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">密码</Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} placeholder="请输入密码" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link href="/forgot-password" className="text-sm text-red-600 hover:underline">
                      忘记密码？
                    </Link>
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700">登录</Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">或</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"
                        />
                      </svg>
                      微信
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>创建账户</CardTitle>
                  <CardDescription>注册新的麦当劳账户，享受更多优惠</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">姓</Label>
                      <Input id="firstName" placeholder="请输入姓" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">名</Label>
                      <Input id="lastName" placeholder="请输入名" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">手机号</Label>
                    <Input id="phone" type="tel" placeholder="请输入手机号" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input id="email" type="email" placeholder="请输入邮箱" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">密码</Label>
                    <div className="relative">
                      <Input id="newPassword" type={showPassword ? "text" : "password"} placeholder="请输入密码" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">确认密码</Label>
                    <Input id="confirmPassword" type="password" placeholder="请再次输入密码" />
                  </div>

                  <div className="text-sm text-gray-600">
                    注册即表示您同意我们的
                    <Link href="/terms" className="text-red-600 hover:underline">
                      服务条款
                    </Link>
                    和
                    <Link href="/privacy" className="text-red-600 hover:underline">
                      隐私政策
                    </Link>
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700">注册</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
