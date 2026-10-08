import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Laptop } from '../types/product';
import { CartItem, CouponCode } from '../types/cart';
import { PROMO_COUPONS } from '../data/deals';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  appliedCoupon: CouponCode | null;
  totalItemCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  grandTotal: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    laptop: Laptop,
    selectedRam?: string,
    selectedStorage?: string,
    selectedColor?: string,
    selectedGpu?: string,
    extraPrice?: number,
    quantity?: number,
    warrantyIncluded?: boolean
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  toggleWarranty: (cartItemId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [items, setItems] = useState<CartItem[]>(() => 
    getStorageItem<CartItem[]>('rs_cart_items', [])
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(() => 
    getStorageItem<CouponCode | null>('rs_applied_coupon', null)
  );

  useEffect(() => {
    setStorageItem('rs_cart_items', items);
  }, [items]);

  useEffect(() => {
    setStorageItem('rs_applied_coupon', appliedCoupon);
  }, [appliedCoupon]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const WARRANTY_COST = 14999; // in INR

  const addToCart = (
    laptop: Laptop,
    selectedRam = laptop.config.ramOptions[0]?.label || laptop.specs.ram,
    selectedStorage = laptop.config.storageOptions[0]?.label || laptop.specs.storage,
    selectedColor = laptop.config.colorOptions[0]?.name || 'Standard',
    selectedGpu = laptop.specs.gpu,
    extraPrice = 0,
    quantity = 1,
    warrantyIncluded = false
  ) => {
    const uniqueId = `${laptop.id}-${selectedRam}-${selectedStorage}-${selectedColor}-${warrantyIncluded ? 'warr' : 'nowarr'}`;
    const unitPrice = laptop.price + extraPrice + (warrantyIncluded ? WARRANTY_COST : 0);

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      const newItem: CartItem = {
        id: uniqueId,
        laptop,
        quantity,
        selectedRam,
        selectedStorage,
        selectedColor,
        selectedGpu,
        extraPrice,
        unitPrice,
        warrantyIncluded
      };
      return [...prevItems, newItem];
    });

    showToast('Added to Hardware Bag', `${laptop.name} has been added to your cart.`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Removed from Bag', 'Item removed from your cart.', 'info');
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleWarranty = (cartItemId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const nextWarranty = !item.warrantyIncluded;
          const priceDiff = nextWarranty ? WARRANTY_COST : -WARRANTY_COST;
          return {
            ...item,
            warrantyIncluded: nextWarranty,
            unitPrice: item.unitPrice + priceDiff
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const trimmed = code.trim().toUpperCase();
    const found = PROMO_COUPONS.find((c) => c.code === trimmed);

    if (!found) {
      showToast('Invalid Coupon', 'The promo code entered does not exist or has expired.', 'error');
      return { success: false, message: 'Invalid promo code' };
    }

    if (found.minSpend && subtotal < found.minSpend) {
      const msg = `Minimum spend of ₹${found.minSpend.toLocaleString('en-IN')} required for code ${trimmed}`;
      showToast('Minimum Order Not Met', msg, 'warning');
      return { success: false, message: msg };
    }

    setAppliedCoupon(found);
    showToast('Promo Code Applied!', `${found.discountPercentage}% discount added to your order.`, 'success');
    return { success: true, message: 'Coupon applied successfully' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Promo code removed from your order.', 'info');
  };

  // Calculations in INR
  const totalItemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.unitPrice * curr.quantity, 0);

  const freeShippingThreshold = 99999;
  const shippingFee = subtotal === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : 1499;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  let discountAmount = 0;
  if (appliedCoupon && subtotal > 0) {
    const rawDiscount = (subtotal * appliedCoupon.discountPercentage) / 100;
    discountAmount = appliedCoupon.maxDiscount ? Math.min(rawDiscount, appliedCoupon.maxDiscount) : rawDiscount;
  }

  const taxRate = 0.18; // 18% GST standard luxury computing hardware in India
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round(discountedSubtotal * taxRate);
  const grandTotal = Math.round(discountedSubtotal + shippingFee + taxAmount);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        appliedCoupon,
        totalItemCount,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        grandTotal,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        toggleWarranty
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
