import create from 'zustand'
import { persist } from "zustand/middleware"
import api from '../api/api'

const useAuthStore = create(persist(
  (set, get) => ({
    user: null,
    login: async ({ username, password }) => {
      try {
        const loginRes = await api.post('/auth/login', { username, password })
        const accessToken = loginRes.data?.accessToken
        return accessToken
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
    fetchCurrentUser: async () => {
      try {
        const res = await api.get('users/me')
        const user = res.data
        set({ user })
        return get().user
      } catch (e) {
        console.log(e.response)
        get().clearUser()
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

useAuthStore.subscribe((state, prevState) => console.log(state))

export default useAuthStore