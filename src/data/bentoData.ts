import { MenuItem, StoreLocation } from '../types';

export const STORE_INFO = {
  name: "緣便當快餐店",
  branch: "中山總店",
  fullName: "緣便當快餐店－中山總店",
  address: "330 桃園市桃園區中平路7號",
  phone: "03-220-5060",
  secondaryPhone: "03-368-9622", // Franchise Bade phone as alternate reference
  hoursNotice: "營業時間請以店家現場與最新公告為準",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=%E7%B7%A3%E4%BE%BF%E7%95%B6%E5%BF%AB%E9%A4%90%E5%BA%97%E4%B8%AD%E5%B1%B1%E5%BA%97",
  services: ["內用", "外帶", "外送"],
  facebookZhongshanUrl: "https://www.facebook.com/search/top?q=%E7%B7%A3%E4%BE%BF%E7%95%B6%E5%BF%AB%E9%A4%90%E5%BA%97%EF%BC%8D%E4%B8%AD%E5%B1%B1%E5%BA%97",
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "crispy-chicken-leg",
    name: "酥炸雞腿飯",
    price: 120,
    category: "便當",
    description: "大隻厚實雞腿，外皮酥脆香嫩，份量滿足。",
    image: "/01-酥炸雞腿飯.png",
    tag: "招牌首選",
    jpName: "フライドチキン定食"
  },
  {
    id: "steamed-pork-mustard-greens",
    name: "梅干扣肉飯",
    price: 110,
    category: "便當",
    description: "醇香梅干菜搭配軟嫩扣肉，鹹香甘醇下飯好滋味。",
    image: "/02-梅干扣肉飯.png",
    tag: "古法慢火",
    jpName: "梅干し豚角煮定食"
  },
  {
    id: "five-spice-braised-pork",
    name: "五香控肉飯",
    price: 110,
    category: "便當",
    description: "嚴選五花肉與秘製五香滷汁燉煮，香醇入味肥瘦勻稱。",
    image: "/03-五香控肉飯.png",
    tag: "經典飄香",
    jpName: "五香豚角煮定食"
  },
  {
    id: "house-special",
    name: "綠特製招牌飯",
    price: 110,
    category: "便當",
    description: "店家精心特製招牌料理，豐富用料實在滿足。",
    image: "/04-綠特製招牌飯.png",
    tag: "店長特製",
    jpName: "特製看板定食"
  },
  {
    id: "crispy-mackerel",
    name: "酥炸鯖魚飯",
    price: 120,
    category: "便當",
    description: "鮮美鯖魚高溫酥炸，外酥內嫩油脂飽滿。",
    image: "/05-酥炸鯖魚飯.png",
    tag: "海味鮮香",
    jpName: "サバの竜田揚げ定食"
  },
  {
    id: "braised-pork-chop",
    name: "滷排骨飯",
    price: 110,
    category: "便當",
    description: "經典古早味滷排骨，肉質軟嫩鹹甜適中入味透徹。",
    image: "/06-滷排骨飯.png",
    tag: "古早甘醇",
    jpName: "煮込み豚カツ定食"
  },
  {
    id: "crispy-pork-chop",
    name: "酥炸排骨飯",
    price: 110,
    category: "便當",
    description: "現炸金黃酥脆排骨，外皮卡滋酥脆肉汁鎖在裡頭。",
    image: "/07-酥炸排骨飯.png",
    tag: "酥香多汁",
    jpName: "サクサク豚カツ定食"
  },
  {
    id: "braised-beef-brisket",
    name: "牛腩飯",
    price: 120,
    category: "便當",
    description: "嚴選牛腩文火細燉，肉質軟爛湯汁濃郁醇厚。",
    image: "/08-牛腩飯.png",
    tag: "慢燉醇香",
    jpName: "牛ブリスケ煮込み定食"
  },
  {
    id: "traditional-pork-knuckle",
    name: "正庄豬腳飯",
    price: 110,
    category: "便當",
    description: "傳統正庄紅燒豬腳，外皮Q彈膠質滿滿香氣濃郁。",
    image: "/09-正庄豬腳飯.png",
    tag: "膠質豐富",
    jpName: "豚足の醤油煮込み定食"
  },
  {
    id: "spicy-diced-chicken",
    name: "辣子雞丁飯",
    price: 110,
    category: "便當",
    description: "鮮嫩雞丁搭配特調辛香醬料快炒，微辣開胃鑊氣十足。",
    image: "/10-辣子雞丁飯.png",
    tag: "鑊氣微辣",
    jpName: "ピリ辛鶏肉炒め定食"
  }
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: "zhongshan",
    name: "緣便當快餐店－中山總店",
    branch: "中山總店",
    address: "330 桃園市桃園區中平路7號",
    phone: "03-220-5060",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=%E7%B7%A3%E4%BE%BF%E7%95%B6%E5%BF%AB%E9%A4%90%E5%BA%97%E4%B8%AD%E5%B1%B1%E5%BA%97",
    isMain: true,
    branchType: "main",
    typeLabel: "直營總店",
    hasFacebook: true,
    facebookUrl: STORE_INFO.facebookZhongshanUrl,
    note: "緣便當創始總店，設有品牌官方唯一 Facebook 粉絲專頁，掌握最新公告與動態。"
  },
  {
    id: "bade",
    name: "緣便當快餐店－八德加盟店",
    branch: "八德加盟店",
    address: "334 桃園市八德區福元里建國路122號",
    phone: "03-368-9622",
    secondaryPhone: "03-368-9322",
    mapUrl: "https://maps.app.goo.gl/VcVQRkqg4XUQQCYK9",
    isMain: false,
    branchType: "franchise",
    typeLabel: "加盟門市",
    hasFacebook: false,
    note: "八德在地熱門加盟據點，備有雙專線，支援團體外送預訂。"
  },
  {
    id: "danan",
    name: "緣便當快餐店－大湳加盟店",
    branch: "大湳加盟店",
    address: "334 桃園市八德區福僑街106號",
    phone: "03-367-2222",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=%E7%B7%A3%E4%BE%BF%E7%95%B6%E5%BF%AB%E9%A4%90%E5%BA%97%E5%A4%A7%E6%BD%83%E5%BA%97+334%E6%A1%83%E5%9C%92%E5%B8%82%E5%85%AB%E5%BE%B7%E5%8D%80%E7%A6%8F%E5%83%91%E8%A1%97106%E8%99%9F",
    isMain: false,
    branchType: "franchise",
    typeLabel: "加盟門市",
    hasFacebook: false,
    note: "鄰近大湳熱鬧生活圈，出餐迅速，提供便利用餐窗口。"
  }
];
