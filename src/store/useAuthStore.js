import create from 'zustand'
import { persist } from "zustand/middleware"
import api from '../api/api'

const useAuthStore = create(persist(
  (set, get) => ({
    user: null,
    login: async ({ username, password }) => {
      try {
        const loginRes = await api.post('/auth/login', { username, password })
        const accessToken = loginRes.data.accessToken
        if (!accessToken) return
      }
      catch (e) {
        console.log(e.response)
      }
    },
    logout: async () => {
      try {
        await api.post('/auth/logout')
        get().clearUser()
      } catch (e) {
        console.log(e.response)
      }
    },
    get isLoggedIn() {
      return get().user !== null
    },
    get isAdmin() {
      return get().user?.role === 'admin'
    },
    fetchCurrentUser: async () => {
      try {
        const res = await api.get('users/me')
        const user = res.data
        console.log(user)
        if (!user) {
          get().clearUser()
          return
        }
        set({ user })
        return get().user
      } catch (e) {
        console.log(e.response)
        return null
      }
    },
    clearUser: () => {
      console.log('Clear user!')
      set({ user: null })
    },
  }),
  {
    name: "auth", // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
))

export default useAuthStore