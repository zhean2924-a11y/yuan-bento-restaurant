import React, { useState } from 'react';
import { Link, useRouter } from '../router/Router';
import { STORE_INFO, STORE_LOCATIONS } from '../data/bentoData';
import { Phone, ShoppingBag, Menu, X, Store, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NAV_LINKS = [
  { label: '首頁', to: '/', sub: 'HOME' },
  { label: '線上菜單', to: '/menu', sub: 'MENU' },
  { label: '門市據點', to: '/locations', sub: 'STORES' },
  { label: '品牌理念', to: '/about', sub: 'STORY' },
  { label: '最新公告', to: '/news', sub: 'NEWS' },
  { label: '聯絡訂餐', to: '/contact', sub: 'CONTACT' },
  { label: '顧客回饋', to: '/feedback', sub: 'FEEDBACK' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath } = useRouter();
  const { totalCount, totalAmount, openCart, selectedBranch, setSelectedBranch } = useCart();

  const activeBranch = STORE_LOCATIONS.find((b) => b.id === selectedBranch) || STORE_LOCATIONS[0];

  return (
    <header className="sticky top-0 z-50 bg-[#121212] text-white border-b border-[#292421] shadow-lg">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#1C1815] text-[#D8CEBF] text-[11px] py-1.5 px-4 border-b border-[#2C2621]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
            <span className="font-medium">
              嚴選現點現做・每日當令新鮮時蔬配菜・支援機關團體便當外送預約
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-[#AEA294]">
              <Store className="w-3 h-3 text-[#EA580C]" />
              <span>當前服務門市：</span>
              <span className="text-white font-bold">{activeBranch.branch}</span>
            </div>
            <a
              href={`tel:${STORE_INFO.phone.replace(/-/g, '')}`}
              className="hover:text-[#EA580C] transition-colors font-mono text-white font-bold"
            >
              總店電話：{STORE_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group text-decoration-none focus:outline-none shrink-0"
            aria-label="緣便當快餐店 首頁"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#EA580C] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0 border border-white/20">
              <span className="font-serif-tc text-2xl font-black leading-none">緣</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-serif-tc text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#EA580C] transition-colors">
                  緣便當快餐店
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#29221C] text-[#EA580C] border border-[#EA580C]/30 hidden xs:inline-block">
                  線上點餐
                </span>
              </div>
              <span className="text-[10px] text-[#A69B8E] tracking-wider font-mono">
                YUAN BENTO RESTAURANT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - 桌面版清楚水平導覽 */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {NAV_LINKS.map((item) => {
              const isActive = currentPath === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-xs xl:text-sm tracking-wide transition-colors px-2.5 py-1.5 rounded-lg font-bold relative whitespace-nowrap ${
                    isActive
                      ? 'text-[#EA580C] bg-[#221C18]'
                      : 'text-[#DDD4C9] hover:text-[#EA580C] hover:bg-[#1C1815]'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area: Cart Header Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Branch Dropdown on Wide Desktop */}
            <div className="hidden 2xl:flex items-center bg-[#1C1815] border border-[#3A322B] rounded-xl px-2.5 py-1 text-xs text-[#D8CEBF]">
              <Store className="w-3.5 h-3.5 text-[#EA580C] mr-1.5 shrink-0" />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer text-xs"
                title="切換自取門市"
              >
                {STORE_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-[#1C1815] text-white">
                    {loc.branch}
                  </option>
                ))}
              </select>
            </div>

            {/* 固定式購物車入口 (Prominent Cart Button in Header) */}
            <button
              onClick={openCart}
              type="button"
              className="flex items-center space-x-2 bg-[#EA580C] hover:bg-[#D84E07] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md transition-all active:scale-95 focus:outline-none cursor-pointer shrink-0 min-h-[44px]"
              aria-label="打開購物車"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-white text-[#EA580C] font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {totalCount}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap">
                {totalCount > 0 ? `NT$ ${totalAmount}` : '購物車'}
              </span>
            </button>

            {/* Mobile Hamburger Button (手機版漢堡選單) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl text-white hover:text-[#EA580C] hover:bg-[#221C18] focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center lg:hidden transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="打開導覽選單"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#161311] border-b border-[#2C241E] px-5 py-4 space-y-4 animate-in slide-in-from-top-2 duration-150">
          {/* Branch Picker for mobile */}
          <div className="bg-[#201B17] p-3 rounded-xl border border-[#3A312A] space-y-1.5">
            <span className="text-[11px] text-[#A69B8E] font-bold block">
              當前選取門市（點餐自取／外送）：
            </span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full bg-[#161311] text-white font-bold p-2.5 rounded-lg text-xs border border-[#44382E] focus:outline-none min-h-[44px]"
            >
              {STORE_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} {loc.isMain ? '（直營總店）' : '（加盟店）'}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col divide-y divide-[#2C241E]">
            {NAV_LINKS.map((item) => {
              const isActive = currentPath === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3.5 text-sm tracking-wide flex items-center justify-between transition-colors min-h-[44px] ${
                    isActive
                      ? 'text-[#EA580C] font-bold'
                      : 'text-[#DDD4C9] hover:text-[#EA580C]'
                  }`}
                >
                  <span className="font-serif-tc text-base">{item.label}</span>
                  <div className="flex items-center space-x-1 text-[#8C8074] text-xs">
                    <span className="font-mono">{item.sub}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#EA580C] text-white font-bold text-sm shadow-sm min-h-[44px]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>查看購物車（{totalCount} 份・NT$ {totalAmount}）</span>
            </button>
            <a
              href={`tel:${STORE_INFO.phone.replace(/-/g, '')}`}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border border-[#44382E] bg-[#221C18] text-white text-xs font-bold min-h-[44px]"
            >
              <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>撥打總店電話：{STORE_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
