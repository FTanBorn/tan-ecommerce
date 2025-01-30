// src/contexts/CartContext.tsx
'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'

import type { Product, CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  productStocks: { [key: number]: number }
}

interface CartContextType extends CartState {
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  updateStock: (productId: number, stock: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_STOCK'; payload: { productId: number; stock: number } }
  | { type: 'LOAD_CART'; payload: CartState }

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  productStocks: {}
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // Sepette aynı ürünün olup olmadığını kontrol et
      const existingItem = state.items.find(item => item.product.id === action.payload.id)
      // Ürünün mevcut stok miktarını al, eğer yoksa ürünün başlangıç stok miktarını kullan
      const currentStock = state.productStocks[action.payload.id] ?? action.payload.stock

      if (existingItem) {
        // Eğer ürün sepette varsa ve miktarı stok miktarına eşit veya fazlaysa, mevcut durumu değiştirmeden geri dön
        if (existingItem.quantity >= currentStock) return state

        // Sepetteki ürünleri güncelle, aynı ürünün miktarını bir artır
        const updatedItems = state.items.map(item =>
          item.product.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        )

        // Güncellenmiş durumu döndür
        return {
          ...state,
          items: updatedItems,
          totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
          totalPrice: updatedItems.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          ),
          productStocks: {
            ...state.productStocks,
            [action.payload.id]: currentStock - 1
          }
        }
      }

      // Eğer ürünün stoğu yoksa, mevcut durumu değiştirmeden geri dön
      if (currentStock <= 0) return state

      // Yeni bir sepet ürünü oluştur
      const newItem: CartItem = {
        product: action.payload,
        quantity: 1
      }

      // Sepete yeni ürünü ekle
      const updatedItems = [...state.items, newItem]

      // Güncellenmiş durumu döndür
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: updatedItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
        productStocks: {
          ...state.productStocks,
          [action.payload.id]: currentStock - 1
        }
      }
    }

    case 'REMOVE_FROM_CART': {
      // Sepetten çıkarılacak ürünü bul
      const item = state.items.find(item => item.product.id === action.payload)
      // Eğer ürün sepette yoksa, mevcut durumu değiştirmeden geri dön
      if (!item) return state

      // Sepetten ürünü çıkar
      const updatedItems = state.items.filter(item => item.product.id !== action.payload)

      // Güncellenmiş durumu döndür
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: updatedItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
        productStocks: {
          ...state.productStocks,
          [action.payload]: (state.productStocks[action.payload] || 0) + item.quantity
        }
      }
    }

    case 'UPDATE_QUANTITY': {
      // Miktarı güncellenecek ürünü bul
      const item = state.items.find(item => item.product.id === action.payload.productId)
      // Eğer ürün sepette yoksa, mevcut durumu değiştirmeden geri dön
      if (!item) return state

      // Miktar farkını hesapla
      const diff = action.payload.quantity - item.quantity
      // Ürünün mevcut stok miktarını al
      const currentStock = state.productStocks[action.payload.productId]

      // Eğer miktar artışı stok miktarını aşıyorsa, mevcut durumu değiştirmeden geri dön
      if (diff > 0 && currentStock < diff) return state

      let updatedItems = state.items

      // Eğer yeni miktar 0 veya daha azsa, ürünü sepetten çıkar
      if (action.payload.quantity <= 0) {
        updatedItems = state.items.filter(item => item.product.id !== action.payload.productId)
      } else {
        // Sepetteki ürünleri güncelle, ilgili ürünün miktarını güncelle
        updatedItems = state.items.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }

      // Güncellenmiş durumu döndür
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: updatedItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
        productStocks: {
          ...state.productStocks,
          [action.payload.productId]: currentStock - diff
        }
      }
    }

    case 'CLEAR_CART': {
      // Sepetteki ürünlerin stok miktarlarını güncelle
      const updatedStocks = { ...state.productStocks }
      state.items.forEach(item => {
        updatedStocks[item.product.id] = (updatedStocks[item.product.id] || 0) + item.quantity
      })

      // Sepeti temizle ve güncellenmiş stok miktarlarıyla başlangıç durumuna dön
      return {
        ...initialState,
        productStocks: updatedStocks
      }
    }

    case 'UPDATE_STOCK': {
      // Ürünün stok miktarını güncelle
      return {
        ...state,
        productStocks: {
          ...state.productStocks,
          [action.payload.productId]: action.payload.stock
        }
      }
    }

    case 'LOAD_CART': {
      // Sepet durumunu yükle
      return action.payload
    }

    default:
      // Tanımlanmayan action type için mevcut durumu değiştirmeden geri dön
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // useReducer hook'unu kullanarak cartReducer fonksiyonunu ve başlangıç durumunu tanımladım.
  // Bu hook, sepet durumunu (state) ve dispatch fonksiyonunu döndürür.

  const [state, dispatch] = useReducer(cartReducer, initialState)
  // İlk render işleminde, localStorage'dan sepet verilerini yüklüyorum.
  // Eğer veriler varsa, LOAD_CART eylemi ile sepet durumunu güncelliyorum.

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])
  // Sepet durumu her değiştiğinde, localStorage'a sepet verilerini kaydediyorum.
  // Böylece sayfa yenilendiğinde veya uygulama yeniden başlatıldığında sepet verileri korunmuş oluyor.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  // Sepete ürün ekleme işlemi için addToCart fonksiyonunu tanımladım.
  // Bu fonksiyon, ADD_TO_CART eylemi ile sepete ürün eklemek için dispatch fonksiyonunu çağırır.
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  // Sepetten ürün çıkarma işlemi için removeFromCart fonksiyonunu tanımladım.
  // Bu fonksiyon, REMOVE_FROM_CART eylemi ile sepetten ürün çıkarmak için dispatch fonksiyonunu çağırır.
  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  // Ürün miktarını güncelleme işlemi için updateQuantity fonksiyonunu tanımladım.
  // Bu fonksiyon, UPDATE_QUANTITY eylemi ile ürün miktarını güncellemek için dispatch fonksiyonunu çağırır.
  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }

  // Sepeti temizleme işlemi için clearCart fonksiyonunu tanımladım.
  // Bu fonksiyon, CLEAR_CART eylemi ile sepeti temizlemek için dispatch fonksiyonunu çağırır.
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  // Ürün stoğunu güncelleme işlemi için updateStock fonksiyonunu tanımladım.
  // Bu fonksiyon, UPDATE_STOCK eylemi ile ürün stoğunu güncellemek için dispatch fonksiyonunu çağırır.
  const updateStock = (productId: number, stock: number) => {
    dispatch({ type: 'UPDATE_STOCK', payload: { productId, stock } })
  }

  // CartContext.Provider bileşenini kullanarak sepet durumunu ve işlevlerini alt bileşenlere sağlıyorum.
  // Alt bileşenler, CartContext'i kullanarak sepet verilerine ve işlevlerine erişebilirler.
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        updateStock
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
// Bu kodda, sepet durumunun yönetimini ve işlevlerini CartProvider bileşeni içinde ele aldım.
// useReducer ve useEffect hook'larını kullanarak sepet durumunu yönetiyor ve localStorage ile senkronize ediyorum.
// Ayrıca, sepete ürün ekleme, çıkarma, miktar güncelleme, sepeti temizleme ve stok güncelleme gibi işlevleri tanımlayarak bunları alt bileşenlere sağlıyorum.

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
