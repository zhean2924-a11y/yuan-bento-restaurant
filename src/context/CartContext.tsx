import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { STORE_LOCATIONS } from '../data/bentoData';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  totalAmount: number;
  isCartOpen: boolean;
  selectedBranch: string;
  diningOption: 'takeout' | 'dinein' | 'delivery';
  orderSuccessMessage: string | null;
  addToCart: (item: MenuItem, quantity?: number) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setSelectedBranch: (branchId: string) => void;
  setDiningOption: (opt: 'takeout' | 'dinein' | 'delivery') => void;
  submitOrder: (customerInfo: { name: string; phone: string; note: string }) => { success: boolean; summary: string };
  clearSuccessMessage: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'yuan_bento_cart_v1';
const BRANCH_STORAGE_KEY = 'yuan_bento_branch_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedBranch, setSelectedBranchState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(BRANCH_STORAGE_KEY);
      return saved || 'zhongshan';
    } catch {
      return 'zhongshan';
    }
  });

  const [diningOption, setDiningOption] = useState<'takeout' | 'dinein' | 'delivery'>('takeout');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccessMessage, setOrderSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const setSelectedBranch = (branchId: string) => {
    setSelectedBranchState(branchId);
    try {
      localStorage.setItem(BRANCH_STORAGE_KEY, branchId);
    } catch {
      // ignore
    }
  };

  const addToCart = (item: MenuItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { item, quantity }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.item.id === itemId) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + i.item.price * i.quantity, 0);

  const submitOrder = (customerInfo: { name: string; phone: string; note: string }) => {
    const branch = STORE_LOCATIONS.find((b) => b.id === selectedBranch) || STORE_LOCATIONS[0];
    const diningText =
      diningOption === 'takeout' ? '外帶自取' : diningOption === 'dinein' ? '現場內用' : '外送服務';

    const orderLines = items
      .map((i) => `・${i.item.name} x ${i.quantity} 份（單價 NT$${i.item.price}）= NT$${i.item.price * i.quantity}`)
      .join('\n');

    const summary = `【緣便當快餐店 訂單預約單】\n取餐門市：${branch.name}\n用餐形式：${diningText}\n聯絡姓名：${customerInfo.name || '現場顧客'}\n聯絡電話：${customerInfo.phone || '未提供'}\n備註需求：${customerInfo.note || '無特殊需求'}\n\n訂購明細：\n${orderLines}\n\n總計數量：${totalCount} 份\n應付總額：NT$ ${totalAmount}\n門市專線：${branch.phone}`;

    setOrderSuccessMessage(summary);
    clearCart();
    return { success: true, summary };
  };

  const clearSuccessMessage = () => setOrderSuccessMessage(null);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalAmount,
        isCartOpen,
        selectedBranch,
        diningOption,
        orderSuccessMessage,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        openCart,
        closeCart,
        setSelectedBranch,
        setDiningOption,
        submitOrder,
        clearSuccessMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
