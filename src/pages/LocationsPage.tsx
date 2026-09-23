import React from 'react';
import { STORE_LOCATIONS } from '../data/bentoData';
import { MapPin, Phone, Navigation, Store, Award, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function LocationsPage() {
  const { selectedBranch, setSelectedBranch } = useCart();

  return (
    <div className="bg-[#FAF7F2] py-10 sm:py-14 min-h-screen text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 找店核心 Header */}
        <div className="bg-[#181818] text-white rounded-3xl p-6 sm:p-10 border border-[#2E2721] shadow-xl text-center max-w-3xl mx-auto mb-10 relative overflow-hidden">
          <div className="inline-flex items-center space-x-2 text-[#EA580C] text-xs font-bold tracking-widest mb-2 uppercase">
            <Store className="w-4 h-4" />
            <span>FIND YOUR STORE</span>
          </div>
          <h1 className="font-serif-tc text-3xl sm:text-4xl font-black text-white tracking-tight">
            門市據點・找店導航
          </h1>
          <p className="text-xs sm:text-sm text-[#C5BDB3] mt-2.5 leading-relaxed">
            緣便當以桃園區「中山總店」為直營核心主店，並設有「八德加盟店」與「大湳加盟店」，請選擇離您最近的門市。
          </p>
        </div>

        {/* 三個清楚的門市區塊：八德店、大湳店、中山店 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {STORE_LOCATIONS.map((store) => {
            const isSelected = selectedBranch === store.id;

            return (
              <div
                key={store.id}
                className={`bg-white rounded-2xl border-2 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isSelected
                    ? 'border-[#EA580C] shadow-lg ring-2 ring-[#EA580C]/20 bg-[#FFFDFB]'
                    : 'border-[#E4DCD0] shadow-xs hover:border-[#D5CCC0]'
                }`}
              >
                <div>
                  {/* Top Badge & Store Status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-bold text-[#8C8074]">
                      {store.isMain ? 'HEADQUARTERS' : 'FRANCHISE'}
                    </span>

                    {store.isMain ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EA580C] text-white shadow-xs">
                        <Award className="w-3 h-3" />
                        <span>{store.typeLabel}</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-[#665B51] bg-[#F5EFE6] border border-[#E0D7CB]">
                        {store.typeLabel}
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif-tc text-2xl font-bold text-[#181818] mb-1">
                    {store.name}
                  </h2>

                  <p className="text-xs text-[#665B51] mb-5 font-medium leading-relaxed">
                    {store.note}
                  </p>

                  {/* Detail Info: 店名、地址、電話 */}
                  <div className="space-y-4 text-xs text-[#52463F] border-t border-[#EDE5DB] pt-4 mb-6">
                    <div>
                      <div className="flex items-center space-x-1.5 text-[#8A7C72] mb-1 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                        <span>門市地址</span>
                      </div>
                      <p className="pl-5 text-[#181818] font-bold leading-relaxed text-sm">
                        {store.address}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center space-x-1.5 text-[#8A7C72] mb-1 font-bold">
                        <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
                        <span>門市電話</span>
                      </div>
                      <a
                        href={`tel:${store.phone.replace(/-/g, '')}`}
                        className="pl-5 font-mono text-lg font-bold text-[#EA580C] hover:underline block tracking-wide"
                      >
                        {store.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* 頁面主要 CTA：「導航到這間店」以及「設為門市自取」 */}
                <div className="space-y-2.5 pt-3 border-t border-[#EDE5DB]">
                  {/* 主要 CTA: 導航到這間店 */}
                  <a
                    href={store.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#EA580C] hover:bg-[#D84E07] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>導航到這間店</span>
                  </a>

                  {/* 門市自取按鈕 */}
                  <button
                    type="button"
                    onClick={() => setSelectedBranch(store.id)}
                    className={`w-full py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                      isSelected
                        ? 'bg-[#181818] text-white border-[#181818]'
                        : 'border-[#D5CCC0] text-[#181818] hover:bg-[#F5EFE6]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#EA580C]" />
                        <span>目前已設為自取門市</span>
                      </>
                    ) : (
                      <span>設為門市自取門市</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
