import React from 'react';
import { Link } from '../router/Router';
import { STORE_INFO, STORE_LOCATIONS } from '../data/bentoData';
import { Phone, ExternalLink, Store } from 'lucide-react';

export default function Footer() {
  const zhongshanStore = STORE_LOCATIONS.find((s) => s.isMain) || STORE_LOCATIONS[0];

  return (
    <footer className="bg-[#111111] text-[#E5DDD3] border-t border-[#26221E] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Name */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#EA580C] flex items-center justify-center text-white font-serif-tc text-xl font-bold shadow-sm">
                緣
              </div>
              <div>
                <span className="font-serif-tc text-xl font-bold text-white block">
                  緣便當快餐店
                </span>
                <span className="text-[11px] text-[#A89D91] font-mono tracking-wider">
                  YUAN BENTO RESTAURANT
                </span>
              </div>
            </div>
            <p className="text-xs text-[#A89D91] leading-relaxed max-w-sm">
              在地人熟悉的家常好滋味，現點現做、份量實在。以中山總店直營領銜，設有八德加盟店與大湳加盟店，提供優質線上點餐與外送自取體驗。
            </p>
          </div>

          {/* 快速連結 */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold tracking-widest text-[#EA580C] uppercase">
              網站快速連結
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#C5BDB3]">
              <div>
                <Link to="/" className="hover:text-[#EA580C] transition-colors py-1 block">
                  首頁
                </Link>
                <Link to="/menu" className="hover:text-[#EA580C] transition-colors py-1 block">
                  線上菜單
                </Link>
                <Link to="/locations" className="hover:text-[#EA580C] transition-colors py-1 block">
                  門市據點
                </Link>
                <Link to="/about" className="hover:text-[#EA580C] transition-colors py-1 block">
                  品牌理念
                </Link>
              </div>
              <div>
                <Link to="/news" className="hover:text-[#EA580C] transition-colors py-1 block">
                  最新公告
                </Link>
                <Link to="/corporate" className="hover:text-[#EA580C] transition-colors py-1 block font-bold text-white">
                  企業訂餐
                </Link>
                <Link to="/contact" className="hover:text-[#EA580C] transition-colors py-1 block">
                  聯絡訂餐
                </Link>
                <Link to="/feedback" className="hover:text-[#EA580C] transition-colors py-1 block">
                  顧客回饋
                </Link>
              </div>
            </div>
          </div>

          {/* 門市資訊入口、電話、Facebook (只有確實提供官方連結的門市才顯示) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold tracking-widest text-[#EA580C] uppercase flex items-center space-x-1.5">
              <Store className="w-3.5 h-3.5" />
              <span>門市資訊與訂餐專線</span>
            </h4>

            <div className="space-y-2 text-xs text-[#C5BDB3]">
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold">中山總店專線：</span>
                <a
                  href={`tel:${STORE_INFO.phone.replace(/-/g, '')}`}
                  className="font-mono text-sm font-bold text-[#EA580C] hover:underline"
                >
                  {STORE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-[#A89D91]">
                <span>八德加盟店：03-368-9622</span>
                <span>・</span>
                <span>大湳加盟店：03-367-2222</span>
              </div>

              {/* 官方唯一 Facebook 粉絲專頁 (中山店) */}
              {zhongshanStore.hasFacebook && zhongshanStore.facebookUrl && (
                <div className="pt-2">
                  <a
                    href={zhongshanStore.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-[#1877F2] hover:underline font-bold bg-[#171D28] px-3 py-1.5 rounded-lg border border-[#23334D]"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>中山總店官方 Facebook</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              )}

              <div className="pt-1">
                <Link
                  to="/locations"
                  className="text-xs text-[#A89D91] hover:text-white underline inline-flex items-center space-x-1"
                >
                  <span>查看全台 3 間門市完整資訊入口</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-[#221D18] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#857B70]">
          <p>© {new Date().getFullYear()} 緣便當快餐店 版權所有.</p>
          <div className="flex items-center space-x-3">
            <span>中山總店直營</span>
            <span>・</span>
            <span>八德加盟店</span>
            <span>・</span>
            <span>大湳加盟店</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
