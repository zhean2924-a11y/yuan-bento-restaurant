import React, { useState } from 'react';
import { MENU_ITEMS, STORE_LOCATIONS } from '../data/bentoData';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types';
import {
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Search,
  Filter,
  Flame,
  Store,
  Eye,
  X,
} from 'lucide-react';

export default function MenuPage() {
  const { addToCart, items, updateQuantity, selectedBranch } = useCart();
  const [filter, setFilter] = useState<'all' | '110' | '120'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'popular' | 'pork' | 'chicken' | 'other'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedItemAnimationId, setAddedItemAnimationId] = useState<string | null>(null);
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [quickViewQty, setQuickViewQty] = useState(1);

  const activeBranch = STORE_LOCATIONS.find((b) => b.id === selectedBranch) || STORE_LOCATIONS[0];

  const filteredItems = MENU_ITEMS.filter((item) => {
    // Price filter
    const matchesPrice =
      filter === 'all'
        ? true
        : filter === '110'
        ? item.price === 110
        : item.price === 120;

    // Search filter
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tag && item.tag.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category / Tag filter
    let matchesCategory = true;
    if (categoryFilter === 'popular') {
      matchesCategory = ['crispy-chicken-leg', 'crispy-pork-chop', 'steamed-pork-mustard-greens', 'braised-pork-chop'].includes(item.id);
    } else if (categoryFilter === 'pork') {
      matchesCategory = item.name.includes('肉') || item.name.includes('排骨') || item.name.includes('豬腳');
    } else if (categoryFilter === 'chicken') {
      matchesCategory = item.name.includes('雞');
    } else if (categoryFilter === 'other') {
      matchesCategory = item.name.includes('魚') || item.name.includes('牛') || item.name.includes('招牌');
    }

    return matchesPrice && matchesSearch && matchesCategory;
  });

  const getCartItemQuantity = (id: string) => {
    const found = items.find((i) => i.item.id === id);
    return found ? found.quantity : 0;
  };

  const handleAdd = (item: MenuItem, qty = 1) => {
    addToCart(item, qty);
    setAddedItemAnimationId(item.id);
    setTimeout(() => {
      setAddedItemAnimationId(null);
    }, 1500);
  };

  return (
    <div className="bg-[#FAF7F2] py-8 sm:py-12 min-h-screen text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 電商核心商品展示 Header */}
        <div className="bg-[#181818] text-white rounded-3xl p-6 sm:p-9 border border-[#2E2721] shadow-xl mb-8 relative overflow-hidden">
          <div className="max-w-3xl relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#241F1B] border border-[#3E332B] text-xs font-bold text-[#EA580C]">
              <Flame className="w-3.5 h-3.5" />
              <span>電商點餐核心・全 10 款現點現做</span>
            </div>

            <h1 className="font-serif-tc text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              線上商品菜單
            </h1>

            <p className="text-xs sm:text-sm text-[#C5BDB3] leading-relaxed">
              點擊「加入購物車」即可挑選餐點，所有便當均附飽滿台灣白米飯與每日熱鍋現炒三道新鮮蔬菜。
            </p>

            <div className="pt-1 flex items-center space-x-2 text-xs text-[#D8CEBF]">
              <Store className="w-4 h-4 text-[#EA580C]" />
              <span>目前預設取餐門市：</span>
              <strong className="text-white font-bold">{activeBranch.name}</strong>
              <span className="text-[11px] text-[#A69B8E]">（可於購物車內隨時切換）</span>
            </div>
          </div>
        </div>

        {/* 搜尋與篩選列 */}
        <div className="bg-white rounded-2xl border border-[#E5DFD5] p-4 sm:p-5 mb-8 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C8074] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="搜尋餐點名稱、特色、關鍵字（例如：雞腿、排骨、古法...）"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5CCC0] focus:outline-hidden focus:border-[#EA580C] text-xs sm:text-sm bg-[#FAF8F5]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C8074] hover:text-[#181818]"
                >
                  清除
                </button>
              )}
            </div>

            {/* Price Filter Buttons */}
            <div className="flex items-center space-x-1.5 shrink-0 bg-[#F5EFE6] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === 'all'
                    ? 'bg-[#181818] text-white shadow-xs'
                    : 'text-[#665B51] hover:text-[#181818]'
                }`}
              >
                全部（10款）
              </button>
              <button
                type="button"
                onClick={() => setFilter('110')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === '110'
                    ? 'bg-[#EA580C] text-white shadow-xs'
                    : 'text-[#665B51] hover:text-[#181818]'
                }`}
              >
                NT$ 110 款
              </button>
              <button
                type="button"
                onClick={() => setFilter('120')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === '120'
                    ? 'bg-[#EA580C] text-white shadow-xs'
                    : 'text-[#665B51] hover:text-[#181818]'
                }`}
              >
                NT$ 120 款
              </button>
            </div>
          </div>

          {/* Quick Category / Tag Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F0ECE4] text-xs">
            <span className="text-[#8C8074] font-bold flex items-center space-x-1">
              <Filter className="w-3 h-3 text-[#EA580C]" />
              <span>主題標籤：</span>
            </span>
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-[#181818] text-white'
                  : 'bg-[#FAF5EE] text-[#665B51] hover:bg-[#EDE5DA]'
              }`}
            >
              全部顯示
            </button>
            <button
              onClick={() => setCategoryFilter('popular')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                categoryFilter === 'popular'
                  ? 'bg-[#EA580C] text-white'
                  : 'bg-[#FAF5EE] text-[#665B51] hover:bg-[#EDE5DA]'
              }`}
            >
              ★ 熱門人氣
            </button>
            <button
              onClick={() => setCategoryFilter('chicken')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                categoryFilter === 'chicken'
                  ? 'bg-[#EA580C] text-white'
                  : 'bg-[#FAF5EE] text-[#665B51] hover:bg-[#EDE5DA]'
              }`}
            >
              雞肉類（雞腿・辣子雞）
            </button>
            <button
              onClick={() => setCategoryFilter('pork')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                categoryFilter === 'pork'
                  ? 'bg-[#EA580C] text-white'
                  : 'bg-[#FAF5EE] text-[#665B51] hover:bg-[#EDE5DA]'
              }`}
            >
              豬肉類（排骨・扣肉・控肉・豬腳）
            </button>
            <button
              onClick={() => setCategoryFilter('other')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                categoryFilter === 'other'
                  ? 'bg-[#EA580C] text-white'
                  : 'bg-[#FAF5EE] text-[#665B51] hover:bg-[#EDE5DA]'
              }`}
            >
              牛腩・鯖魚・特製招牌
            </button>
          </div>
        </div>

        {/* 10 款商品展示卡片 (Aspect 4/3 大圖，價格醒目，加入購物車按鈕) */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E5DFD5] p-12 text-center space-y-3">
            <p className="text-base text-[#7A7066]">找不到符合條件的便當餐點</p>
            <button
              onClick={() => {
                setFilter('all');
                setCategoryFilter('all');
                setSearchTerm('');
              }}
              className="px-5 py-2 rounded-xl bg-[#EA580C] text-white text-xs font-bold"
            >
              重設所有篩選條件
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-12">
            {filteredItems.map((item) => {
              const qty = getCartItemQuantity(item.id);
              const isAdded = addedItemAnimationId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#E5DFD5] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Large Product Image */}
                    <div className="relative aspect-4/3 w-full bg-[#F5F0E8] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Tag Badge */}
                      {item.tag && (
                        <div className="absolute top-3 right-3 bg-[#EA580C] text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md">
                          {item.tag}
                        </div>
                      )}

                      {/* Japanese Sub-label */}
                      <div className="absolute bottom-2.5 left-3 bg-[#181818]/85 text-[#D8CEBF] px-2.5 py-0.5 rounded text-[11px] font-mono">
                        {item.jpName}
                      </div>

                      {/* Quick view button */}
                      <button
                        onClick={() => {
                          setQuickViewItem(item);
                          setQuickViewQty(1);
                        }}
                        className="absolute bottom-2.5 right-3 bg-white/90 hover:bg-white text-[#181818] p-1.5 rounded-lg shadow-sm transition-colors text-xs font-bold inline-flex items-center space-x-1"
                        title="查看大圖"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#EA580C]" />
                        <span>大圖</span>
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif-tc text-xl sm:text-2xl font-bold text-[#181818] group-hover:text-[#EA580C] transition-colors">
                          {item.name}
                        </h3>
                        <div className="text-right shrink-0">
                          <span className="text-[11px] text-[#8C8074] font-bold block">售價</span>
                          <span className="font-serif-tc text-2xl sm:text-3xl font-black text-[#EA580C] leading-none">
                            NT$ {item.price}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#665B51] leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      <div className="pt-1 flex items-center space-x-1.5 text-[11px] text-[#8C8074]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                        <span>附飽滿台灣白米飯・每日熱鍋現炒三道配菜</span>
                      </div>
                    </div>
                  </div>

                  {/* E-Commerce Add to Cart Action Area */}
                  <div className="p-5 pt-0 border-t border-[#F0ECE4] bg-[#FAF8F5]">
                    <div className="pt-3.5 flex items-center justify-between gap-3">
                      {qty > 0 ? (
                        <div className="flex items-center justify-between w-full bg-white border-2 border-[#EA580C] rounded-xl px-3 py-1.5 shadow-xs">
                          <span className="text-xs font-bold text-[#EA580C]">
                            已在購物車（{qty}份）
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 rounded-lg bg-[#FAF5EE] hover:bg-[#EAE3D6] text-[#181818] flex items-center justify-center transition-colors"
                              aria-label="減少數量"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-bold text-sm text-[#181818] min-w-5 text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 rounded-lg bg-[#EA580C] hover:bg-[#D84E07] text-white flex items-center justify-center transition-colors shadow-xs"
                              aria-label="增加數量"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAdd(item)}
                          type="button"
                          className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-sm active:scale-95 cursor-pointer ${
                            isAdded
                              ? 'bg-[#16A34A] text-white'
                              : 'bg-[#EA580C] hover:bg-[#D84E07] text-white hover:shadow-md'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>已加入購物車！</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4" />
                              <span>加入購物車・NT$ {item.price}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick View Modal */}
        {quickViewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E5DFD5] relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setQuickViewItem(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-4/3 w-full bg-[#F5F0E8] relative">
                <img
                  src={quickViewItem.image}
                  alt={quickViewItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#181818]/90 text-[#D8CEBF] px-3 py-1 rounded text-xs font-mono">
                  {quickViewItem.jpName}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif-tc text-2xl font-bold text-[#181818]">
                      {quickViewItem.name}
                    </h3>
                    <p className="text-xs text-[#8C8074] mt-0.5">{quickViewItem.tag}</p>
                  </div>
                  <span className="font-serif-tc text-3xl font-black text-[#EA580C]">
                    NT$ {quickViewItem.price}
                  </span>
                </div>

                <p className="text-sm text-[#52443A] leading-relaxed">
                  {quickViewItem.description}
                </p>

                <div className="flex items-center space-x-3 pt-2">
                  <div className="flex items-center border border-[#D5CCC0] rounded-xl px-3 py-1.5 bg-[#FAF8F5]">
                    <button
                      onClick={() => setQuickViewQty(Math.max(1, quickViewQty - 1))}
                      className="text-[#665B51] hover:text-[#181818]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-sm px-3">{quickViewQty}</span>
                    <button
                      onClick={() => setQuickViewQty(quickViewQty + 1)}
                      className="text-[#665B51] hover:text-[#181818]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      handleAdd(quickViewItem, quickViewQty);
                      setQuickViewItem(null);
                    }}
                    type="button"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#EA580C] hover:bg-[#D84E07] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>加入購物車（小計 NT$ {quickViewItem.price * quickViewQty}）</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
