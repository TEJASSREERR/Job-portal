import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../services/api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post('/auth/login/', credentials)
          const { access, refresh } = response.data
          
          localStorage.setItem('access_token', access)
          localStorage.setItem('refresh_token', refresh)
          
          // Fetch user profile
          const userRes = await api.get('/accounts/profile/')
          const user = userRes.data
          
          set({ 
            user, 
            token: access, 
            isAuthenticated: true, 
            isLoading: false 
          })
          return true
        } catch (error) {
          set({ 
            error: error.response?.data?.detail || 'Login failed', 
            isLoading: false 
          })
          return false
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null })
        try {
          await api.post('/accounts/register/', data)
          set({ isLoading: false })
          return true
        } catch (error) {
          set({ 
            error: error.response?.data || 'Registration failed', 
            isLoading: false 
          })
          return false
        }
      },

      logout: () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        set({ user: null, token: null, isAuthenticated: false, error: null })
      },

      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)