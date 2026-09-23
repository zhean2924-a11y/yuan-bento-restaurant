import React from 'react';
import { STORE_LOCATIONS } from '../data/bentoData';
import { Phone, MapPin, Navigation, ShoppingBag, ArrowRight, Store, Clock, Truck } from 'lucide-react';
import { Link } from '../router/Router';
import { useCart } from '../context/CartContext';

export default function ContactPage() {
  const { selectedBranch, setSelectedBranch } = useCart();

  return (
    <div className="bg-[#FAF7F2] py-10 sm:py-14 min-h-screen text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (不放完整首頁 Hero) */}
        <div className="bg-[#181818] text-white rounded-3xl p-6 sm:p-10 border border-[#2E2721] shadow-xl text-center max-w-3xl mx-auto mb-10 relative overflow-hidden">
          <div className="inline-flex items-center space-x-2 text-[#EA580C] text-xs font-bold tracking-widest uppercase mb-2">
            <Phone className="w-4 h-4" />
            <span>ORDERING & CONTACT</span>
          </div>
          <h1 className="font-serif-tc text-3xl sm:text-4xl font-black text-white tracking-tight">
            聯絡訂餐
          </h1>
          <p className="text-xs sm:text-sm text-[#C5BDB3] mt-2.5 leading-relaxed">
            提供線上選餐預訂、電話訂餐、門市自取與外帶外送服務，方便快速享用熱騰騰便當。
          </p>
        </div>

        {/* 訂餐方式說明卡片：線上訂餐、電話訂餐、門市自取、外帶、外送 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 線上訂餐 */}
          <div className="bg-white rounded-2xl border border-[#E2DAD0] p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2EB] text-[#EA580C] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-serif-tc text-xl font-bold text-[#181818]">線上選餐預訂</h3>
              <p className="text-xs text-[#665B51] leading-relaxed">
                全品項 10 款商品自由挑選放入購物車，快速確認品項與取餐資訊，到店自取免久候。
              </p>
            </div>
            {/* CTA 1: 開始線上選餐 */}
            <Link
              to="/menu"
              className="w-full py-3 px-4 rounded-xl bg-[#EA580C] hover:bg-[#D84E07] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>開始線上選餐</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 電話訂餐 */}
          <div className="bg-white rounded-2xl border border-[#E2DAD0] p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2EB] text-[#EA580C] flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif-tc text-xl font-bold text-[#181818]">電話即時訂餐</h3>
              <p className="text-xs text-[#665B51] leading-relaxed">
                各門市備有訂餐專線，無論個人外帶或公司行號團體大量便當需求，歡迎直接來電。
              </p>
            </div>
            {/* CTA 2: 電話訂餐 */}
            <a
              href="tel:032205060"
              className="w-full py-3 px-4 rounded-xl bg-[#181818] hover:bg-black text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-[#EA580C]" />
              <span>電話訂餐（中山總店）</span>
            </a>
          </div>

          {/* 門市自取與外送 */}
          <div className="bg-white rounded-2xl border border-[#E2DAD0] p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2EB] text-[#EA580C] flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-tc text-xl font-bold text-[#181818]">外帶・外送・自取</h3>
              <p className="text-xs text-[#665B51] leading-relaxed">
                支援店內用餐、現場外帶與門市自取；大量團體訂購滿額提供外送服務，敬請提早預約。
              </p>
            </div>
            <Link
              to="/locations"
              className="w-full py-3 px-4 rounded-xl border border-[#D5CCC0] hover:bg-[#F5EFE6] text-[#181818] text-xs font-bold transition-colors flex items-center justify-center space-x-2"
            >
              <Store className="w-4 h-4 text-[#EA580C]" />
              <span>查看門市據點</span>
            </Link>
          </div>
        </div>

        {/* 門市選擇與電話、Google Maps 導航清單 */}
        <div className="bg-white rounded-3xl border border-[#E2DAD0] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif-tc text-2xl font-bold text-[#181818]">
              門市選擇與聯絡資訊
            </h2>
            <p className="text-xs sm:text-sm text-[#70645B]">
              點選設定取餐門市，或直接撥打門市專線預約餐點。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORE_LOCATIONS.map((loc) => {
              const isCurrent = selectedBranch === loc.id;

              return (
                <div
                  key={loc.id}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-4 ${
                    isCurrent
                      ? 'border-[#EA580C] bg-[#FFFBF8] shadow-sm'
                      : 'border-[#EAE3D6] bg-white'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif-tc text-lg font-bold text-[#181818]">
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

                    <div className="space-y-1.5 text-xs text-[#665B51]">
                      <div className="flex items-start space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#EA580C] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{loc.address}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                        <a
                          href={`tel:${loc.phone.replace(/-/g, '')}`}
                          className="font-mono font-bold text-sm text-[#181818] hover:text-[#EA580C]"
                        >
                          {loc.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F0ECE4] space-y-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBranch(loc.id)}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                        isCurrent
                          ? 'bg-[#EA580C] text-white'
                          : 'bg-[#F5F0E8] hover:bg-[#EAE3D6] text-[#181818]'
                      }`}
                    >
                      {isCurrent ? '✓ 目前選定門市' : '設為取餐門市'}
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${loc.phone.replace(/-/g, '')}`}
                        className="py-2 px-3 rounded-lg border border-[#D5CCC0] hover:bg-[#F5EFE6] text-xs font-bold text-[#181818] text-center inline-flex items-center justify-center space-x-1"
                      >
                        <Phone className="w-3 h-3 text-[#EA580C]" />
                        <span>撥打</span>
                      </a>
                      <a
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-lg bg-[#181818] hover:bg-black text-white text-xs font-bold text-center inline-flex items-center justify-center space-x-1"
                      >
                        <Navigation className="w-3 h-3 text-[#EA580C]" />
                        <span>導航</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 顧客回饋引導卡片 (簡單乾淨入口) */}
        <div className="mt-8 bg-white rounded-2xl border border-[#E2DAD0] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif-tc text-lg font-bold text-[#181818]">
              吃得滿意嗎？歡迎告訴我們您的用餐感受
            </h3>
            <p className="text-xs text-[#70645B]">
              您的真實評價是我們改善餐點與服務最重要的動力。
            </p>
          </div>
          <Link
            to="/feedback"
            className="px-5 py-2.5 rounded-xl bg-[#FAF5EE] hover:bg-[#EAE3D6] border border-[#D5CCC0] text-xs font-bold text-[#181818] shrink-0 transition-colors"
          >
            <span>留下用餐回饋</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
