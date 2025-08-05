export interface Coupon {
  id: string
  code: string
  name: string
  nameEn: string
  nameJa: string
  description: string
  descriptionEn: string
  descriptionJa: string
  type: "percentage" | "fixed"
  value: number // percentage (e.g., 0.1 for 10%) or fixed amount (e.g., 10 for ¥10)
  minOrderAmount: number
  expiryDate: string // YYYY-MM-DD
  isUsed: boolean
}

export const availableCoupons: Coupon[] = [
  {
    id: "coupon-1",
    code: "RAMEN10",
    name: "拉面满减券",
    nameEn: "Ramen Discount Coupon",
    nameJa: "ラーメン割引クーポン",
    description: "满50元减10元",
    descriptionEn: "¥10 off on orders over ¥50",
    descriptionJa: "50円以上の注文で10円引き",
    type: "fixed",
    value: 10,
    minOrderAmount: 50,
    expiryDate: "2025-12-31",
    isUsed: false,
  },
  {
    id: "coupon-2",
    code: "NEWUSER20",
    name: "新用户8折券",
    nameEn: "New User 20% Off",
    nameJa: "新規ユーザー20%オフ",
    description: "新用户首单8折，最高减20元",
    descriptionEn: "20% off for new users, max ¥20 discount",
    descriptionJa: "新規ユーザー初回注文20%オフ、最大20円引き",
    type: "percentage",
    value: 0.2,
    minOrderAmount: 30,
    expiryDate: "2025-11-30",
    isUsed: false,
  },
  {
    id: "coupon-3",
    code: "FREEDELIVERY",
    name: "免配送费券",
    nameEn: "Free Delivery Coupon",
    nameJa: "送料無料クーポン",
    description: "满30元免配送费",
    descriptionEn: "Free delivery on orders over ¥30",
    descriptionJa: "30円以上の注文で送料無料",
    type: "fixed",
    value: 6, // Assuming delivery fee is 6
    minOrderAmount: 30,
    expiryDate: "2025-10-15",
    isUsed: false,
  },
  {
    id: "coupon-4",
    code: "EXPIRED",
    name: "过期优惠券",
    nameEn: "Expired Coupon",
    nameJa: "期限切れクーポン",
    description: "已过期，无法使用",
    descriptionEn: "Expired, cannot be used",
    descriptionJa: "期限切れ、使用不可",
    type: "fixed",
    value: 5,
    minOrderAmount: 10,
    expiryDate: "2024-01-01", // Expired date
    isUsed: false,
  },
]
