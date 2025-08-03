import React, { useEffect, useState } from "react";
import PositionFormDrawer from "../components/PositionFormDrawer";
import PositionTable from "../components/PositionTable";
import { PlusIcon, RefreshCwIcon } from "lucide-react";

export default function PositionPage() {
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(()=>{
    if(reload){
      window.location.reload();
      setReload(false);

    }
  },[reload])
  return (
    <div className="w-full px-8 mx-auto py-8 bg-gray-200">
      <h1 className="text-xl font-bold">Vị trí công tác</h1>
      <div className="px-4 gap-2 flex justify-end items-center bg-white">
        <button
          onClick={() => setOpen(true)}
          className="px-3 mt-4 py-1 flex flex-row hover:text-purple-400 gap-2 hover:border-purple-400 transition-all duration-300 items-center border-2 border-gray-200 text-black rounded"
        >
          <PlusIcon />
          Tạo
        </button>
        <button
          onClick={() => setReload(true)}
          className="px-3 mt-4 py-1 flex flex-row hover:text-purple-400 gap-2 hover:border-purple-400 transition-all duration-300 items-center border-2 border-gray-200 text-black rounded"
        >
          <RefreshCwIcon />
          Làm mới
        </button>
      </div>

      <PositionTable />

      {open && (
        <PositionFormDrawer
          onClose={() => setOpen(false)}
          onCreated={() => setOpen(false)}
        />
      )}
    </div>
  );
}
