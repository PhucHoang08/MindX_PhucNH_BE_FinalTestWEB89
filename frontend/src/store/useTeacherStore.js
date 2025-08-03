// src/store/useTeacherStore.js
import { create } from 'zustand'
import axios from '../api/axios.js'

const useTeacherStore = create((set) => ({
  teachers: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  // Thêm mảng mới để lưu danh sách bậc học
  degreeTypes: [],

  // Action để cập nhật page
  setPage: (newPage) => set({ page: newPage }),

  // Action để cập nhật limit
  setLimit: (newLimit) => set({ limit: newLimit }),

  fetchTeachers: async (page = 1, limit = 10) => {
    set({ loading: true });
    try {
      const res = await axios.get(`http://localhost:6080/api/teachers?page=${page}&limit=${limit}`);
      const { teachers, total, page: currentPage, limit: currentLimit } = res.data;
      
      // Lấy danh sách degrees từ dữ liệu của giáo viên
      // Tạo một Set để chỉ lấy các giá trị duy nhất
      const uniqueDegrees = new Set();
      teachers.forEach(t => {
        t.degrees.forEach(d => {
          uniqueDegrees.add(d.type);
        });
      });

      // Chuyển Set thành mảng để lưu vào store
      const degreeTypesArray = Array.from(uniqueDegrees).map(type => ({ name: type }));

      set({
        teachers: teachers,
        total: total,
        page: currentPage,
        limit: currentLimit,
        loading: false,
        degreeTypes: degreeTypesArray, // Cập nhật danh sách bậc học vào store
      });
    } catch (error) {
      console.error(" Lỗi khi fetch teachers:", error);
      set({ loading: false });
    }
  },

  createTeacher: async (data) => {
    await axios.post('http://localhost:6080/api/teachers', data);
  },
}));

export default useTeacherStore;