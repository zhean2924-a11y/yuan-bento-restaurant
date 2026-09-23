import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function FloatingCartButton() {
  const { totalCount, totalAmount, openCart } = useCart();

  return (
    <>
      {/* Floating Action Button (Desktop & Mobile) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={openCart}
          type="button"
          className="group relative flex items-center space-x-3 bg-[#181818] hover:bg-black text-white pl-4 pr-5 py-3 rounded-full shadow-2xl border-2 border-[#EA580C] transition-all hover:scale-105 active:scale-95 focus:outline-none"
          aria-label={`查看購物車，目前共 ${totalCount} 件餐點`}
        >
          {/* Cart Icon with Live Counter Badge */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#FFFFFF] text-[#EA580C] font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md border border-[#EA580C]">
                {totalCount}
              </span>
            )}
          </div>

          {/* Cart Info Label */}
          <div className="text-left">
            <div className="text-[11px] text-[#C5BDB3] font-medium leading-none">
              {totalCount > 0 ? '購物車已選' : '線上點餐'}
            </div>
            <div className="font-serif-tc text-sm font-bold tracking-tight text-white flex items-center space-x-1.5 mt-0.5">
              <span>{totalCount > 0 ? `NT$ ${totalAmount}` : '查看購物車'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EA580C] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>
      </div>

      {/* Sticky Bottom Bar for Mobile when cart has items */}
      {totalCount > 0 && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-[#181818] text-white border-t-2 border-[#EA580C] px-4 py-2.5 shadow-2xl flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#EA580C] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="absolute -top-1 -right-1 bg-white text-[#EA580C] font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#C5BDB3] block leading-tight">已點 {totalCount} 份便當</span>
              <span className="font-serif-tc text-sm font-bold text-white">NT$ {totalAmount}</span>
            </div>
          </div>

          <button
            onClick={openCart}
            type="button"
            className="px-4 py-2 rounded-lg bg-[#EA580C] hover:bg-[#D84E07] text-white text-xs font-bold shadow-sm flex items-center space-x-1"
          >
            <span>查看購物車</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
}
