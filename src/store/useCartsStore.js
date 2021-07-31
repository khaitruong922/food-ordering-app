import create from 'zustand'
import { persist } from "zustand/middleware"
import api from '../api/api'

const useCartsStore = create(persist(
  (set, get) => ({
    carts: {},
    addProductToCart: ({ storeId, product }) => {
      const { id: productId } = product
      const updatedCarts = get().carts
      // Cart not exist
      if (!updatedCarts.hasOwnProperty(storeId)) {
        updatedCarts[storeId] = {}
      }
      // Product already in cart
      if (updatedCarts[storeId].hasOwnProperty(productId)) {
        const currentProduct = updatedCarts[storeId][productId]
        updatedCarts[storeId][productId].quantity = currentProduct.quantity + 1
        set({ carts: updatedCarts })
        return
      }
      // Product not in cart
      updatedCarts[storeId][productId] = {
        data: product,
        quantity: 1,
      }
      set({ carts: updatedCarts })
    },
    removeProductFromCart: ({ storeId, productId }) => {
      const updatedCarts = get().carts
      // Cart not exist
      if (!updatedCarts.hasOwnProperty(storeId)) return
      // Product not in cart
      if (!updatedCarts[storeId].hasOwnProperty(productId)) return
      delete updatedCarts[storeId][productId]
      set({ carts: updatedCarts })
    },
    decreaseProductQuantity: ({ storeId, productId }) => {
      const updatedCarts = get().carts
      // Cart not exist
      if (!updatedCarts.hasOwnProperty(storeId)) return
      // Product not in cart
      if (!updatedCarts[storeId].hasOwnProperty(productId)) return
      const currentProduct = updatedCarts[storeId][productId]
      if (currentProduct.quantity <= 0) return
      updatedCarts[storeId][productId].quantity = currentProduct.quantity - 1
      set({ carts: updatedCarts })
    },
  }),
  {
    name: "carts", // unique name
    getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
  }
))

useCartsStore.subscribe((state, prevState) => console.log(state.carts))

export default useCartsStore