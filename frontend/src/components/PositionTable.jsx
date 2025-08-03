// src/components/PositionTable.jsx
import React, { useEffect } from "react";
import usePositionStore from "../store/usePositionStore";
import { SettingsIcon } from "lucide-react";

export default function PositionTable() {
  const { positions, loading, fetchPositions } = usePositionStore();

  useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <div className="bg-white h-full p-4">
      {loading ? (
        <p>Đang tải danh sách vị trí...</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-purple-100">
            <tr className="text-left">
              <th className="p-2">STT</th>
              <th className="p-2">Mã</th>
              <th className="p-2">Tên</th>
              <th className="p-2">Trạng thái</th>
              <th className="p-2">Mô tả</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {positions.map((p, idx) => (
              <tr key={p._id} className="border-b hover:bg-purple-100 hover:text-purple-800 transition-all duration-200">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">{p.code}</td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      p.isActive ? "bg-green-500" : "bg-gray-400"
                    }`}
                  >
                    {p.isActive ? "Hoạt động" : "Ngừng"}
                  </span>
                </td>
                <td className="p-2">{p.des}</td>
                <td className="p-2 flex justify-end"><SettingsIcon/></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
