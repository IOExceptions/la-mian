export interface OrderItem {
  id: string
  name: {
    zh: string
    en: string
    ja: string
  }
  specifications: {
    zh: string
    en: string
    ja: string
  }
  image: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  status: "preparing" | "ready" | "completed" | "cancelled"
  type: "pickup" | "delivery"
  store: {
    zh: string
    en: string
    ja: string
  }
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  couponDiscount: number
  total: number
  pickupNumber?: string
  estimatedTime?: string
}

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "R20241201001",
    date: "2024-12-01 14:30",
    status: "ready",
    type: "pickup",
    store: {
      zh: "拉面屋 - 新宿店",
      en: "Ramen House - Shinjuku",
      ja: "ラーメンハウス - 新宿店",
    },
    pickupNumber: "A23",
    items: [
      {
        id: "1",
        name: {
          zh: "豚骨拉面",
          en: "Tonkotsu Ramen",
          ja: "豚骨ラーメン",
        },
        specifications: {
          zh: "大份 • 加蛋 • 中辣",
          en: "Large • Extra Egg • Medium Spicy",
          ja: "大盛り • 卵追加 • 中辛",
        },
        image: "/tonkotsu-ramen-special.png",
        quantity: 1,
        price: 58,
      },
      {
        id: "2",
        name: {
          zh: "煎饺",
          en: "Gyoza",
          ja: "餃子",
        },
        specifications: {
          zh: "6个装",
          en: "6 pieces",
          ja: "6個入り",
        },
        image: "/gyoza.png",
        quantity: 1,
        price: 28,
      },
    ],
    subtotal: 86,
    deliveryFee: 0,
    couponDiscount: 8,
    total: 78,
  },
  {
    id: "2",
    orderNumber: "R20241201002",
    date: "2024-12-01 12:15",
    status: "preparing",
    type: "pickup",
    store: {
      zh: "拉面屋 - 涩谷店",
      en: "Ramen House - Shibuya",
      ja: "ラーメンハウス - 渋谷店",
    },
    estimatedTime: "15分钟",
    items: [
      {
        id: "3",
        name: {
          zh: "味噌拉面",
          en: "Miso Ramen",
          ja: "味噌ラーメン",
        },
        specifications: {
          zh: "标准 • 不辣",
          en: "Regular • No Spice",
          ja: "普通 • 辛くない",
        },
        image: "/miso-ramen.png",
        quantity: 1,
        price: 52,
      },
      {
        id: "4",
        name: {
          zh: "日式啤酒",
          en: "Japanese Beer",
          ja: "日本ビール",
        },
        specifications: {
          zh: "500ml",
          en: "500ml",
          ja: "500ml",
        },
        image: "/japanese-beer.png",
        quantity: 1,
        price: 25,
      },
    ],
    subtotal: 77,
    deliveryFee: 0,
    couponDiscount: 0,
    total: 77,
  },
  {
    id: "3",
    orderNumber: "R20241130003",
    date: "2024-11-30 19:45",
    status: "completed",
    type: "delivery",
    store: {
      zh: "拉面屋 - 银座店",
      en: "Ramen House - Ginza",
      ja: "ラーメンハウス - 銀座店",
    },
    items: [
      {
        id: "5",
        name: {
          zh: "酱油拉面",
          en: "Shoyu Ramen",
          ja: "醤油ラーメン",
        },
        specifications: {
          zh: "标准 • 加叉烧",
          en: "Regular • Extra Chashu",
          ja: "普通 • チャーシュー追加",
        },
        image: "/shoyu-ramen.png",
        quantity: 1,
        price: 55,
      },
      {
        id: "6",
        name: {
          zh: "蘸面",
          en: "Tsukemen",
          ja: "つけ麺",
        },
        specifications: {
          zh: "大份 • 浓汤",
          en: "Large • Rich Broth",
          ja: "大盛り • 濃厚スープ",
        },
        image: "/tsukemen.png",
        quantity: 1,
        price: 62,
      },
    ],
    subtotal: 117,
    deliveryFee: 8,
    couponDiscount: 15,
    total: 110,
  },
  {
    id: "4",
    orderNumber: "R20241129004",
    date: "2024-11-29 13:20",
    status: "completed",
    type: "pickup",
    store: {
      zh: "拉面屋 - 原宿店",
      en: "Ramen House - Harajuku",
      ja: "ラーメンハウス - 原宿店",
    },
    items: [
      {
        id: "7",
        name: {
          zh: "辣味噌拉面",
          en: "Spicy Miso Ramen",
          ja: "辛味噌ラーメン",
        },
        specifications: {
          zh: "标准 • 大辣",
          en: "Regular • Extra Spicy",
          ja: "普通 • 激辛",
        },
        image: "/spicy-miso-ramen.png",
        quantity: 2,
        price: 56,
      },
    ],
    subtotal: 112,
    deliveryFee: 0,
    couponDiscount: 0,
    total: 112,
  },
]
