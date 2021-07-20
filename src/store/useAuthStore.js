import create from 'zustand'
import { persist } from "zustand/middleware"
import api, { setHeaderToken } from '../api/api'

const TOKEN_COOKIE_NAME = 'token'

const useAuthStore = create(persist(
  (set, get) => ({
    user: null,
    login: async ({ username, password }) => {
      try {
        const loginRes = await api.post('/auth/login', { username, password })
        const accessToken = loginRes.data.accessToken
        if (!accessToken) return
        console.log(loginRes.data)
      }
      catch (e) {
        console.log(e.response)
      }
    },
    logout: async () => {
      try {
        const res = await api.post('/auth/logout')
        get().clearUser()
      } catch (e) {
        console.log(e.response)
      }
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
      setHeaderToken('')
      set({ user: null })
    },
  }),
  {
    name: "auth", // unique name
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
))

export default useAuthStore