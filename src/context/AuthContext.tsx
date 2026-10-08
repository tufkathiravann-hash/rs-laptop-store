import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types/user';
import { Order } from '../types/cart';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (email: string, password?: string) => boolean;
  loginAsDemo: () => void;
  register: (fullName: string, email: string, password?: string) => boolean;
  logout: () => void;
  addOrder: (order: Order) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr_rs_8892',
  fullName: 'Alexander Wright',
  email: 'alex.wright@executive.tech',
  avatar: '/images/avatars/avatar-user.jpg',
  phone: '+91 98765 43210',
  memberTier: 'Elite Black',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Alexander Wright',
      email: 'alex.wright@executive.tech',
      phone: '+91 98765 43210',
      street: '742 Cyber City, Cyber Tower 4, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560066',
      country: 'India',
      isDefault: true
    }
  ],
  orders: [
    {
      id: 'RS-982314-8841',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      items: [
        {
          laptopId: 'rog-scar-18-2024',
          name: 'ROG Strix SCAR 18 (2024)',
          image: '/images/laptops/rog-scar-18.jpg',
          quantity: 1,
          unitPrice: 289999,
          configSummary: '32GB DDR5 | 2TB NVMe | Off Black'
        }
      ],
      shippingAddress: {
        fullName: 'Alexander Wright',
        email: 'alex.wright@executive.tech',
        phone: '+91 98765 43210',
        street: '742 Cyber City, Cyber Tower 4, Whitefield',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560066',
        country: 'India'
      },
      shippingMethod: 'express',
      shippingCost: 0,
      paymentMethod: 'card',
      paymentDetailsLast4: '4242',
      subtotal: 289999,
      discount: 25000,
      couponCode: 'RSWELCOME10',
      tax: 47699,
      total: 312698,
      status: 'shipped',
      trackingNumber: 'RS-EXP-89421-IN',
      estimatedDelivery: 'In 2 business days'
    }
  ],
  savedPaymentMethods: [
    {
      id: 'card-1',
      cardBrand: 'Visa Signature',
      last4: '4242',
      expiry: '12/28',
      holderName: 'Alexander Wright'
    }
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [user, setUser] = useState<UserProfile | null>(() => 
    getStorageItem<UserProfile | null>('rs_user', DEFAULT_DEMO_USER)
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (user) {
      setStorageItem('rs_user', user);
    } else {
      removeStorageItem('rs_user');
    }
  }, [user]);

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email: string) => {
    const loggedUser: UserProfile = {
      id: `usr_${Math.random().toString(36).substring(2, 8)}`,
      fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      avatar: '/images/avatars/avatar-user.jpg',
      memberTier: 'Pro VIP',
      addresses: [],
      orders: [],
      savedPaymentMethods: []
    };
    setUser(loggedUser);
    closeAuthModal();
    showToast('Welcome back!', `Logged in as ${loggedUser.email}`, 'success');
    return true;
  };

  const loginAsDemo = () => {
    setUser(DEFAULT_DEMO_USER);
    closeAuthModal();
    showToast('Demo VIP Logged In', 'Accessing Alexander Wright’s VIP account', 'info');
  };

  const register = (fullName: string, email: string) => {
    const newUser: UserProfile = {
      id: `usr_${Math.random().toString(36).substring(2, 8)}`,
      fullName,
      email,
      avatar: '/images/avatars/avatar-user.jpg',
      memberTier: 'Standard',
      addresses: [],
      orders: [],
      savedPaymentMethods: []
    };
    setUser(newUser);
    closeAuthModal();
    showToast('Account Created!', 'Welcome to the RS VIP Club ecosystem.', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('Logged Out', 'You have been safely signed out.', 'info');
  };

  const addOrder = (order: Order) => {
    if (!user) {
      // Create guest order profile
      const guestUser: UserProfile = {
        id: `guest_${Date.now()}`,
        fullName: order.shippingAddress.fullName,
        email: order.shippingAddress.email,
        avatar: '/images/avatars/avatar-user.jpg',
        memberTier: 'Standard',
        addresses: [{ ...order.shippingAddress, id: 'addr_1', isDefault: true }],
        orders: [order],
        savedPaymentMethods: []
      };
      setUser(guestUser);
      return;
    }

    setUser({
      ...user,
      orders: [order, ...user.orders]
    });
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser({
      ...user,
      ...data
    });
    showToast('Profile Updated', 'Your changes have been saved successfully.', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        loginAsDemo,
        register,
        logout,
        addOrder,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
