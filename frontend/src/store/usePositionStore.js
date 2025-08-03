// src/store/usePositionStore.js
import { create } from 'zustand'
import axios from '../api/axios.js'

const usePositionStore = create((set) => ({
  positions: [],
  loading: false,

  fetchPositions: async () => {
    set({ loading: true })
    try {
      const res = await axios.get('http://localhost:6080/api/teacher-positions')
      set({ positions: res.data, loading: false })
    } catch (error) {
      console.error('Lỗi khi lấy vị trí công tác:', error)
      set({ loading: false })
    }
  },

  createPosition: async (data) => {
    const res = await axios.post('http://localhost:6080/api/teacher-positions', data)
    return res.data
  },
}))

export default usePositionStore
