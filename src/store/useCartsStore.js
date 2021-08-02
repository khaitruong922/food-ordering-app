import create from 'zustand'
import { persist } from "zustand/middleware"
import api from '../api/api'
import getArrayEntries from '../util/getArrayEntries'


const useCartsStore = create(persist(
  (set, get) => ({
    carts: {},
    createStoreCart: ({ storeId }) => {
      const updatedCarts = get().carts
      // Cart not exist
      if (!updatedCarts.hasOwnProperty(storeId)) {
        updatedCarts[storeId] = {
          products: {},
          total: 0,
        }
        set({ carts: updatedCarts })
      }
    },
    addProductToCart: ({ storeId, product }) => {
      const { id: productId } = product
      const updatedCarts = get().carts
      // Cart not exist
      get().createStoreCart({ storeId })
      // Product already in cart
      if (updatedCarts[storeId].products.hasOwnProperty(productId)) {
        const currentProduct = updatedCarts[storeId].products[productId]
        // Update product and quantity
        updatedCarts[storeId].products[productId] = {
          data: product,
          quantity: currentProduct.quantity + 1
        }
      } else {
        // Product not in cart
        updatedCarts[storeId].products[productId] = {
          data: product,
          quantity: 1,
        }
      }

      updatedCarts[storeId].total = get().calculateTotalPrice({ storeId })
      set({ carts: updatedCarts })
    },
    decreaseProductQuantity: ({ storeId, productId }) => {
      const updatedCarts = get().carts
      // Cart not exist
      if (!updatedCarts.hasOwnProperty(storeId)) return
      // Product not in cart
      if (!updatedCarts[storeId].products.hasOwnProperty(productId)) return
      const currentProduct = updatedCarts[storeId].products[productId]
      if (currentProduct.quantity <= 0) return
      const newQuantity = currentProduct.quantity - 1
      if (newQuantity <= 0) {
        delete updatedCarts[storeId].products[productId]
      } else {
        updatedCarts[storeId].products[productId].quantity = newQuantity
      }
      updatedCarts[storeId].total = get().calculateTotalPrice({ storeId })
      set({ carts: updatedCarts })
    },
    calculateTotalPrice: ({ storeId }) => {
      const products = getArrayEntries(get().carts[storeId].products)
      let total = 0
      products.forEach(({ data: { price }, quantity }) => {
        total += price * quantity
      })
      return total
    },
    submitOrder: async ({ storeId, address, note, name, phoneNumber, deliveredAt = '2021-08-08' }) => {
      const products = getArrayEntries(get().carts[storeId].products)
      const orderDetails = products.map(product => { return { product: product.id, quantity: product.quantity } })
      const body = { name, phoneNumber, address, note, deliveredAt, orderDetails }
      console.log(body)
      try {
        const res = await api.post('/orders', body)
        console.log(res.data)
        get().clearCart({ storeId })
        return res.data
      } catch (e) {
        console.log(e.response)
        return null
      }
    },
    clearCart: ({ storeId }) => {
      const updatedCarts = get().carts
      updatedCarts[storeId] = {
        products: {},
        total: 0,
      }
      set({ carts: updatedCarts })
    }
  })
  , {
    name: "carts", // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  })
)


useCartsStore.subscribe((state, prevState) => console.table(state.carts))

export default useCartsStore