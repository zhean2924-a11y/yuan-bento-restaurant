import React, { useState } from 'react';
import { Link } from '../router/Router';
import { STORE_LOCATIONS, MENU_ITEMS } from '../data/bentoData';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  ArrowRight,
  Flame,
  Check,
  Plus,
  Minus,
  Store,
  ExternalLink,
  Bell,
  ChevronRight,
  Building2,
  Users,
  ShieldCheck,
} from 'lucide-react';

export default function HomePage() {
  const { addToCart, items, updateQuantity } = useCart();
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // 4 Top featured bestsellers for the Home showcase (3~5 items requested)
  const popularItems = [
    MENU_ITEMS.find((i) => i.id === 'crispy-chicken-leg')!,
    MENU_ITEMS.find((i) => i.id === 'crispy-pork-chop')!,
    MENU_ITEMS.find((i) => i.id === 'braised-pork-chop')!,
    MENU_ITEMS.find((i) => i.id === 'steamed-pork-mustard-greens')!,
  ].filter(Boolean);

  const heroFeatured = MENU_ITEMS[0]; // 酥炸雞腿飯

  const handleAddToCart = (item: typeof heroFeatured) => {
    addToCart(item, 1);
    setAddedAnimationId(item.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1500);
  };

  const getCartItemQuantity = (id: string) => {
    const found = items.find((i) => i.item.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A]">
      {/* 1. Hero: 品牌第一印象與線上選餐入口 */}
      <section className="relative bg-[#141414] text-white pt-10 pb-16 sm:pt-16 sm:pb-20 overflow-hidden border-b border-[#2C2723]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EA580C]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Brand Hero */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EA580C] text-white text-xs font-bold shadow-sm">
                  <Flame className="w-3.5 h-3.5" />
                  <span>線上點餐專區</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#241F1B] border border-[#3D332B] text-[#D8CEBF] text-xs font-medium">
                  <Store className="w-3 h-3 text-[#EA580C]" />
                  <span>中山總店直營・加盟服務</span>
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif-tc text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.18] tracking-tight">
                  嚴選現點現做
                  <br />
                  <span className="text-[#EA580C]">新鮮熱便當</span>線上即點
                </h1>
                <p className="text-sm sm:text-base text-[#C5BDB3] max-w-xl leading-relaxed">
                  大隻厚實酥脆雞腿、經典古早味現炸排骨，搭配每日現炒三道當令熱菜與飽滿大碗白飯。線上選餐、一鍵加入購物車，節省排隊時間！
                </p>
              </div>

              {/* 3-Step Process Micro-bar */}
              <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-[#1C1815] border border-[#302822] max-w-xl text-xs text-[#D8CEBF]">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-[#EA580C] text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span className="truncate">挑選美味餐點</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-[#EA580C] text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span className="truncate">加入購物車預點</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-[#EA580C] text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                    3
                  </span>
                  <span className="truncate">門市取餐外送</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/menu"
                  className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-[#EA580C] hover:bg-[#D84E07] text-white text-sm sm:text-base font-bold shadow-lg transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>開始選餐</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/locations"
                  className="inline-flex items-center space-x-1.5 px-6 py-4 rounded-2xl bg-[#26201B] hover:bg-[#332A24] text-white text-sm font-bold border border-[#44382E] transition-colors"
                >
                  <Store className="w-4 h-4 text-[#EA580C]" />
                  <span>查詢門市據點</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Featured Card (酥炸雞腿飯) */}
            <div className="lg:col-span-5">
              <div className="bg-[#1C1815] rounded-3xl border border-[#3A3026] p-6 shadow-2xl relative overflow-hidden group">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-5 border border-[#3A3026] bg-[#221C18]">
                  <img
                    src={heroFeatured.image}
                    alt={heroFeatured.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#EA580C] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    熱銷第一名
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#141414]/90 backdrop-blur-xs text-white px-3 py-1 rounded-xl text-base sm:text-lg font-serif-tc font-black border border-white/20">
                    NT$ {heroFeatured.price}
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <h3 className="font-serif-tc text-2xl font-bold text-white">
                    {heroFeatured.name}
                  </h3>
                  <p className="text-xs text-[#A89D91] leading-relaxed">
                    {heroFeatured.description} 附當日現炒三道鮮美熱菜與飽滿白飯。
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(heroFeatured)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#EA580C] hover:bg-[#D84E07] text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {addedAnimationId === heroFeatured.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>已加入購物車！</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>加入購物車・NT$ {heroFeatured.price}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 品牌簡介 (精簡導讀) */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E8E0D5]">
        <div className="bg-white rounded-3xl border border-[#E4DCD0] p-7 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-[#EA580C] tracking-widest uppercase">
              ABOUT YUAN BENTO
            </span>
            <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#181818]">
              在地人熟悉的家常好味道
            </h2>
            <p className="text-xs sm:text-sm text-[#665B51] leading-relaxed">
              緣便當快餐店以桃園中山總店為核心，陪伴在地居民走過每一個尋常日子。堅持大份量米飯、現點現做熱騰騰主菜與當日炒菜，給每位勞動者與家庭最踏實的飽足感。
            </p>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl border border-[#D5CCC0] hover:bg-[#FAF7F2] text-xs sm:text-sm font-bold text-[#181818] transition-colors shrink-0"
          >
            <span>認識品牌故事與理念</span>
            <ChevronRight className="w-4 h-4 text-[#EA580C]" />
          </Link>
        </div>
      </section>

      {/* 3. 3～5 款熱門餐點推薦 (精選 4 款，其餘 10 款引導至完整線上菜單) */}
      <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#EA580C] tracking-wider uppercase">
              POPULAR BESTSELLERS
            </span>
            <h2 className="font-serif-tc text-2xl sm:text-4xl font-black text-[#181818] tracking-tight">
              熱門招牌便當推薦
            </h2>
            <p className="text-xs sm:text-sm text-[#70645B]">
              精選 4 款最受顧客喜愛的主菜，完整 10 款商品歡迎至線上菜單選購。
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center text-xs sm:text-sm font-bold text-[#EA580C] hover:underline"
          >
            <span>查看完整 10 款菜單</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map((item, idx) => {
            const qty = getCartItemQuantity(item.id);
            const isAdded = addedAnimationId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E4DCD0] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-4/3 w-full bg-[#F5F0E8] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#181818] text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                      TOP 0{idx + 1}
                    </div>
                    {item.tag && (
                      <div className="absolute top-2.5 right-2.5 bg-[#EA580C] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                        {item.tag}
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif-tc text-lg font-bold text-[#181818]">
                        {item.name}
                      </h3>
                      <span className="font-serif-tc text-xl font-black text-[#EA580C]">
                        NT$ {item.price}
                      </span>
                    </div>
                    <p className="text-xs text-[#665B51] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  {qty > 0 ? (
                    <div className="flex items-center justify-between w-full bg-[#FFFBF8] border border-[#EA580C] rounded-xl px-2.5 py-1.5">
                      <span className="text-xs font-bold text-[#EA580C]">
                        已加 {qty} 份
                      </span>
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-md bg-[#FAF5EE] text-[#181818] flex items-center justify-center"
                          aria-label="減少"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs min-w-4 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-md bg-[#EA580C] text-white flex items-center justify-center"
                          aria-label="增加"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(item)}
                      type="button"
                      className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                        isAdded
                          ? 'bg-[#16A34A] text-white'
                          : 'bg-[#EA580C] hover:bg-[#D84E07] text-white'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isAdded ? '已加入！' : '加入購物車'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. 品牌特色 (集中 3 大重點，深層理念放品牌理念頁) */}
      <section className="bg-[#181818] text-white py-14 sm:py-18 border-y border-[#2E2721]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-[#EA580C] tracking-widest uppercase">
              OUR PROMISE
            </span>
            <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-white">
              嚴選食材與堅持手藝
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-[#221C18] border border-[#382E25] space-y-2">
              <span className="text-2xl font-serif-tc text-[#EA580C] font-black block">01</span>
              <h3 className="font-serif-tc text-lg font-bold text-white">份量實在・飽足感</h3>
              <p className="text-xs text-[#A89D91] leading-relaxed">
                厚實肉品主菜搭配大碗台灣好米飯，滿足每位辛勤工作的朋友。
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#221C18] border border-[#382E25] space-y-2">
              <span className="text-2xl font-serif-tc text-[#EA580C] font-black block">02</span>
              <h3 className="font-serif-tc text-lg font-bold text-white">現點現炸・當日現炒</h3>
              <p className="text-xs text-[#A89D91] leading-relaxed">
                酥炸雞腿與排骨金黃出鍋，每日更換熱炒三道蔬菜，家常新鮮。
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#221C18] border border-[#382E25] space-y-2">
              <span className="text-2xl font-serif-tc text-[#EA580C] font-black block">03</span>
              <h3 className="font-serif-tc text-lg font-bold text-white">價格親切・預約便利</h3>
              <p className="text-xs text-[#A89D91] leading-relaxed">
                全品項 NT$ 110 ~ 120 親民均一價，線上選餐一鍵送單免等待。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 三間門市簡短介紹 (只留據點摘要與前往導航連結，不重複完整地址電話列表) */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#EA580C] tracking-wider uppercase">
              OUR BRANCHES
            </span>
            <h2 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#181818]">
              三間門市為您服務
            </h2>
            <p className="text-xs text-[#70645B]">
              以桃園區中山總店為直營核心，設有八德與大湳加盟門市。
            </p>
          </div>
          <Link
            to="/locations"
            className="inline-flex items-center text-xs sm:text-sm font-bold text-[#EA580C] hover:underline"
          >
            <span>查看完整門市據點與地圖導航</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STORE_LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className="p-5 rounded-2xl border border-[#E2DAD0] bg-white flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-serif-tc text-base font-bold text-[#181818]">
                    {loc.name}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      loc.isMain
                        ? 'bg-[#EA580C] text-white'
                        : 'bg-[#F2ECE3] text-[#665B51]'
                    }`}
                  >
                    {loc.typeLabel}
                  </span>
                </div>
                <p className="text-xs text-[#665B51] line-clamp-1">{loc.address}</p>
              </div>

              <div className="pt-2 border-t border-[#F0ECE4] flex items-center justify-between text-xs">
                <span className="text-[#8C8074] font-mono">{loc.phone}</span>
                <Link
                  to="/locations"
                  className="font-bold text-[#EA580C] hover:underline inline-flex items-center space-x-0.5"
                >
                  <span>找這間店</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. 企業／團體訂餐區塊 (黑色、米白色、橘色品牌風格) */}
      <section className="pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#181818] text-white rounded-3xl border border-[#2E2721] p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
          {/* 橘色飾邊背景光暈 */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EA580C]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 text-[#EA580C] text-xs font-bold tracking-widest uppercase bg-[#231C18] px-3 py-1 rounded-full border border-[#EA580C]/20">
                <Building2 className="w-3.5 h-3.5" />
                <span>CORPORATE & GROUP MEALS</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-serif-tc text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                  企業會議・團體訂餐
                </h2>
                <p className="text-xs sm:text-sm text-[#C5BDB3] max-w-2xl leading-relaxed">
                  適用於公司會議、教育訓練、活動餐盒與大量訂購。熱鍋現點現做、每日新鮮時蔬配菜、份量實在吃得飽足，並提供完整統一編號開立與專車配送服務。
                </p>
              </div>

              {/* 服務特色標籤 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center space-x-2 text-xs text-[#D8CEBF] bg-[#221C18] p-2.5 rounded-xl border border-[#332A22]">
                  <ShieldCheck className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>支援統一編號報帳</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-[#D8CEBF] bg-[#221C18] p-2.5 rounded-xl border border-[#332A22]">
                  <Users className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>可承接大宗團體訂單</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-[#D8CEBF] bg-[#221C18] p-2.5 rounded-xl border border-[#332A22]">
                  <Building2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>專人確認配送時段</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-3">
              <Link
                to="/corporate"
                className="inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-[#EA580C] hover:bg-[#D84E07] text-white font-bold text-sm shadow-lg transition-all active:scale-95 text-center min-h-[48px]"
              >
                <span>立即預約</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-[#241D19] hover:bg-[#2F2621] text-[#D8CEBF] border border-[#3D3229] font-bold text-xs transition-colors text-center min-h-[44px]"
              >
                <span>瀏覽商品菜單</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 最新公告簡短區塊 */}
      <section className="pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E4DCD0] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xs">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF2EB] text-[#EA580C] flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-tc text-base font-bold text-[#181818]">
                最新營運公告與官方動態
              </h3>
              <p className="text-xs text-[#70645B] mt-0.5">
                每日配菜公告、公休資訊請以中山總店 Facebook 官方動態為準。
              </p>
            </div>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#EAE3D6] text-xs font-bold text-[#181818] transition-colors shrink-0"
          >
            <span>查看公告詳情</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#EA580C]" />
          </Link>
        </div>
      </section>

      {/* 7. 最後一個「開始選餐」CTA (首頁唯一的主要下訂導引) */}
      <section className="bg-[#181818] text-white py-14 sm:py-16 border-t border-[#2C2723]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#EA580C] uppercase">
            ONLINE BENTO
          </span>
          <h2 className="font-serif-tc text-2xl sm:text-4xl font-bold text-white">
            今天想吃哪一道？立即開始選餐
          </h2>
          <p className="text-xs sm:text-sm text-[#C5BDB3] max-w-lg mx-auto">
            全品項 10 款現點現做便當，免排隊線上加入購物車，到店自取更省時！
          </p>
          <div className="pt-2">
            <Link
              to="/menu"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-[#EA580C] hover:bg-[#D84E07] text-white font-bold text-sm shadow-xl transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>開始選餐</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
