// src/components/TeacherTable.jsx
import React, { useEffect } from 'react'
import useTeacherStore from '../store/useTeacherStore.js'
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import bgGundam from "../image/bgGundam.jpg"

export default function TeacherTable() {
  // Lấy các state và action từ store
  const { teachers, fetchTeachers, total, page, limit, setPage, setLimit, loading } = useTeacherStore()

  useEffect(() => {
    // Gọi API mỗi khi 'page' hoặc 'limit' thay đổi
    fetchTeachers(page, limit)
  }, [page, limit, fetchTeachers])

  // Tính toán số trang
  const totalPages = Math.ceil(total / limit)
  
  // Hàm này đã rất tốt, không cần sửa
  const getPageNumbers = () => {
    // ... (logic giữ nguyên)
    const pageNumbers = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (page >= totalPages - 2) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = page - 1; i <= page + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }
    
    return pageNumbers
  }

  // Xử lý khi click vào nút số trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage) // Gọi action setPage từ store
    }
  }

  // Xử lý khi thay đổi số lượng item trên trang
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value)
    setLimit(newLimit) // Gọi action setLimit từ store
    setPage(1) // Quan trọng: Quay về trang 1
  }

  return (
    <div className="p-4 bg-white">
      {/* ... (phần Table giữ nguyên) */}
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-purple-100 text-left">
            <th className="p-2">Mã</th>
            <th className="p-2">Giáo viên</th>
            <th className="p-2">Trình độ (cao nhất)</th>
            <th className="p-2">TT Công tác</th>
            <th className="p-2">Địa chỉ</th>
            <th className="p-2">Trạng thái</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="p-4 text-center">Đang tải...</td>
            </tr>
          ) : Array.isArray(teachers) && teachers.length > 0 ? (
            teachers.map((t) => {
              return (
                <tr key={t._id} className='border-b hover:bg-purple-100 hover:text-purple-800 transition-all duration-200'>
                  <td className="p-2">{t.code}</td>
                  <td className="p-2 flex flex-row items-center justify-start gap-2">
                    <img src={bgGundam} className='object-cover w-12 h-12 rounded-full'/>
                    <div>
                      <p className="font-medium">{`${t.userId?.name ? t.userId?.name:"Chưa cập nhật"}`}</p>
                      <p className="text-xs text-gray-500">{t.userId?.email}</p>
                      <p className="text-xs text-gray-500">{t.userId?.phoneNumber}</p>
                    </div>
                  </td>
                  <td className="p-2">
                    <div>
                      <p>Bậc: {t.degrees[0]?.type}</p>
                      <p>Chuyên ngành: {t.degrees[0]?.major}</p>
                    </div>
                  </td>
                  <td className="p-2">{t.teacherPositionsId[0]?.name}</td>
                  <td className="p-2">{`${t.userId?.address ? t.userId?.address:"Chưa cập nhật"}`}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-white text-xs ${t.isActive ? 'bg-green-500' : 'bg-gray-400'}`}>
                      {t.isActive ? "Đang công tác" : "Kết thúc"}
                    </span>
                  </td>
                  <td className="p-2">
                    <button className='flex items-center gap-1 px-2 py-1 bg-white border rounded-md hover:bg-gray-50'>
                      <Eye className='w-4 h-4' />
                      <span>Chi tiết</span>
                    </button>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-500">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm">
        {/* Left side - Items per page selector */}
        <div className="flex items-center gap-2">
          <select 
            value={limit} 
            onChange={handleLimitChange}
            className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={10}>10 / trang</option>
            <option value={20}>20 / trang</option>
            <option value={50}>50 / trang</option>
            <option value={100}>100 / trang</option>
          </select>
        </div>

        {/* Right side - Page navigation */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600">
            Tổng: {total}
          </span>
          
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="p-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === '...' ? (
                  <span className="px-2 py-1">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 border rounded ${
                      page === pageNum 
                        ? 'bg-purple-500 text-white border-purple-500' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="p-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}