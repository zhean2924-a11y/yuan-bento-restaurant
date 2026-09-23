import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { STORE_LOCATIONS } from '../data/bentoData';
import { X, Trash2, Plus, Minus, ShoppingBag, Phone, Copy, Check, ArrowRight, Utensils, Store } from 'lucide-react';
import { Link } from '../router/Router';

export default function CartDrawer() {
  const {
    items,
    totalCount,
    totalAmount,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    selectedBranch,
    setSelectedBranch,
    diningOption,
    setDiningOption,
    submitOrder,
    orderSuccessMessage,
    clearSuccessMessage,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeBranch = STORE_LOCATIONS.find((b) => b.id === selectedBranch) || STORE_LOCATIONS[0];

  const handleCopySummary = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitOrder({
      name: customerName,
      phone: customerPhone,
      note: customerNote,
    });
    setShowCheckoutForm(false);
  };

  if (!isCartOpen && !orderSuccessMessage) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#121212]/75 backdrop-blur-xs transition-opacity"
        onClick={() => {
          closeCart();
          clearSuccessMessage();
        }}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] text-[#1A1A1A] flex flex-col shadow-2xl border-l-2 border-[#2C2724]">
          {/* Header */}
          <div className="bg-[#181818] text-white p-5 flex items-center justify-between border-b border-[#2C2724]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#EA580C] flex items-center justify-center text-white shadow-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-tc text-lg font-bold tracking-tight text-white">
                  點餐購物車
                </h2>
                <p className="text-xs text-[#A8A096]">
                  共 {totalCount} 份餐點・嚴選現做
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                closeCart();
                clearSuccessMessage();
              }}
              className="p-2 rounded-lg text-[#A8A096] hover:text-white hover:bg-[#2C2724] transition-colors"
              aria-label="關閉購物車"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Dialog Modal inside Drawer */}
          {orderSuccessMessage ? (
            <div className="p-6 flex-1 overflow-y-auto space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-center pt-2">
                  <div className="w-14 h-14 bg-[#16A34A]/20 text-[#16A34A] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-tc text-xl font-bold text-[#181818]">
                    訂單預約建立完成！
                  </h3>
                  <p className="text-xs text-[#6B635B] mt-1">
                    感謝您的預約，請將明細出示給店家或致電門市快速確認。
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E5DFD5] shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE4] mb-2">
                    <span className="text-xs font-bold text-[#EA580C]">預約明細預覽</span>
                    <button
                      onClick={() => handleCopySummary(orderSuccessMessage)}
                      className="text-xs font-bold text-[#181818] hover:text-[#EA580C] inline-flex items-center space-x-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? '已複製！' : '複製文字'}</span>
                    </button>
                  </div>
                  <pre className="text-xs text-[#2C2724] whitespace-pre-wrap font-sans leading-relaxed">
                    {orderSuccessMessage}
                  </pre>
                </div>
              </div>

              <div className="space-y-2.5 pt-4">
                <a
                  href={`tel:${activeBranch.phone.replace(/-/g, '')}`}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#EA580C] hover:bg-[#D84E07] text-white font-bold text-sm shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>撥打 {activeBranch.branch} 確認：{activeBranch.phone}</span>
                </a>
                <button
                  onClick={() => {
                    clearSuccessMessage();
                    closeCart();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#D5CDC2] text-[#181818] font-bold text-xs hover:bg-[#F2ECE3] transition-colors"
                >
                  關閉返回網站
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart View */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-[#EFE9DF] text-[#A69B8E] flex items-center justify-center">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="font-serif-tc text-lg font-bold text-[#181818]">
                  購物車目前是空的
                </h3>
                <p className="text-xs text-[#7A7066] leading-relaxed">
                  大隻現炸厚雞腿、香酥排骨與古法梅干扣肉等您挑選，立即加入購物車！
                </p>
              </div>
              <Link
                to="/menu"
                onClick={closeCart}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#EA580C] hover:bg-[#D84E07] text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>前往菜單選餐</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* Cart Content with Items */
            <>
              {/* Pickup Branch & Dining Option Bar */}
              <div className="bg-white p-4 border-b border-[#EAE3D6] space-y-3 shadow-2xs">
                <div>
                  <label className="text-[11px] font-bold text-[#756A60] tracking-wider uppercase flex items-center space-x-1.5 mb-1.5">
                    <Store className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>選擇取餐／服務門市</span>
                  </label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full text-xs font-bold bg-[#FAF7F2] border border-[#D8CEBF] rounded-lg p-2.5 text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                  >
                    {STORE_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} {loc.isMain ? '★ 直營總店' : `（${loc.typeLabel}）`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#756A60] tracking-wider uppercase flex items-center space-x-1.5 mb-1.5">
                    <Utensils className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>用餐方式</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDiningOption('takeout')}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                        diningOption === 'takeout'
                          ? 'bg-[#181818] text-white shadow-xs'
                          : 'bg-[#FAF7F2] text-[#6B635B] border border-[#E0D8CC] hover:bg-[#EFE9DF]'
                      }`}
                    >
                      外帶自取
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiningOption('dinein')}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                        diningOption === 'dinein'
                          ? 'bg-[#181818] text-white shadow-xs'
                          : 'bg-[#FAF7F2] text-[#6B635B] border border-[#E0D8CC] hover:bg-[#EFE9DF]'
                      }`}
                    >
                      現場內用
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiningOption('delivery')}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                        diningOption === 'delivery'
                          ? 'bg-[#181818] text-white shadow-xs'
                          : 'bg-[#FAF7F2] text-[#6B635B] border border-[#E0D8CC] hover:bg-[#EFE9DF]'
                      }`}
                    >
                      外送預約
                    </button>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#EAE3D6]">
                {items.map(({ item, quantity }) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    {/* Item Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover border border-[#D8CEBF] shrink-0 bg-[#EAE3D6]"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif-tc text-sm font-bold text-[#181818] truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#998D80] hover:text-[#DC2626] p-1 ml-1"
                          title="移除餐點"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-1 mt-0.5">
                        <span className="text-xs font-bold text-[#EA580C]">NT$ {item.price}</span>
                        <span className="text-[10px] text-[#8C8276]">/ 份</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2 bg-white border border-[#D8CEBF] rounded-lg px-2 py-0.5 shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-[#665C52] hover:text-[#181818]"
                            aria-label="減少數量"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#181818] min-w-4 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-[#665C52] hover:text-[#181818]"
                            aria-label="增加數量"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#181818]">
                          小計 NT$ {item.price * quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Form Modal / Slide Section */}
              {showCheckoutForm ? (
                <form
                  onSubmit={handleFinalSubmit}
                  className="bg-white p-4 border-t-2 border-[#2C2724] space-y-3 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-tc text-sm font-bold text-[#181818]">
                      填寫取餐聯絡資訊
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowCheckoutForm(false)}
                      className="text-xs text-[#7A7066] hover:underline"
                    >
                      返回明細
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="text-[11px] font-bold text-[#6B635B] block mb-1">
                        聯絡人稱呼
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="例如：王先生 / 陳小姐"
                        className="w-full text-xs p-2.5 rounded-lg border border-[#D5CDC2] bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#6B635B] block mb-1">
                        聯絡電話（手機）
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="例如：0912-345-678"
                        className="w-full text-xs p-2.5 rounded-lg border border-[#D5CDC2] bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#6B635B] block mb-1">
                        備註說明（選填）
                      </label>
                      <input
                        type="text"
                        value={customerNote}
                        onChange={(e) => setCustomerNote(e.target.value)}
                        placeholder="例如：預計12:15取餐、白飯多一點、不要蔥"
                        className="w-full text-xs p-2.5 rounded-lg border border-[#D5CDC2] bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCheckoutForm(false)}
                      className="flex-1 py-2.5 rounded-xl border border-[#D5CDC2] text-xs font-bold text-[#6B635B] hover:bg-[#F2ECE3]"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="flex-2 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#D84E07] text-white text-xs font-bold shadow-md transition-colors"
                    >
                      送出預約訂單
                    </button>
                  </div>
                </form>
              ) : (
                /* Bottom Total & Order Button */
                <div className="bg-white p-4 border-t-2 border-[#2C2724] space-y-3 shadow-lg">
                  {/* Total Calculations */}
                  <div className="space-y-1.5 text-xs text-[#6B635B]">
                    <div className="flex justify-between">
                      <span>商品數量</span>
                      <span className="font-bold text-[#181818]">{totalCount} 份</span>
                    </div>
                    <div className="flex justify-between">
                      <span>環保提袋／餐盒包裝</span>
                      <span className="text-[#16A34A] font-bold">免費提供</span>
                    </div>
                    <div className="pt-2 border-t border-[#F0ECE4] flex justify-between items-baseline">
                      <span className="font-serif-tc text-sm font-bold text-[#181818]">訂單總金額</span>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-xs text-[#EA580C] font-bold">NT$</span>
                        <span className="font-serif-tc text-2xl font-black text-[#EA580C]">
                          {totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => setShowCheckoutForm(true)}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#EA580C] hover:bg-[#D84E07] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                    >
                      <span>開始點餐送出預約（NT$ {totalAmount}）</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        onClick={clearCart}
                        className="text-[#998D80] hover:text-[#DC2626] font-medium"
                      >
                        清空購物車
                      </button>
                      <a
                        href={`tel:${activeBranch.phone.replace(/-/g, '')}`}
                        className="text-[#EA580C] hover:underline font-bold inline-flex items-center space-x-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>快速電話送單：{activeBranch.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
