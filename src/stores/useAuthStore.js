import create from 'zustand'
import api from '../api/api'
import { persist } from "zustand/middleware"


const useAuthStore = create(persist(
  (set, get) => ({
    user: null,
    login: async ({ username, password }) => {
      try {
        const loginRes = await api.post('/auth/login', { username, password })
        if (!loginRes.data.accessToken || loginRes.status !== 200) return
        await get().fetchCurrentUser()
      }
      catch (e) {
        console.log(e.response)
      }
    },
    logout: async () => {
      try {
        const res = await api.post('/auth/logout')
        if (res.status !== 200) return
        set({ user: null })
      } catch (e) {
        console.log(e.response)
      }
    },
    fetchCurrentUser: async () => {
      try {
        const res = await api.get('users/me')
        const user = res.data
        if (user) set({ user })
      } catch (e) {
        console.log(e.response)
      }
    }
  }),
  {
    name: "auth", // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
))

export default useAuthStore