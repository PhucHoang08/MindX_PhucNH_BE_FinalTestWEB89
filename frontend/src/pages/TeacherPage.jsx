import React, { useEffect, useState } from "react";
import TeacherFormDrawer from "../components/TeacherFormDrawer.jsx";
import TeacherTable from "../components/TeacherTable.jsx";
import { RefreshCwIcon, UserPlusIcon } from "lucide-react";

export default function TeacherPage() {
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(()=>{
    if(reload){
      window.location.reload();
      setReload(false);

    }
  },[reload])

  return (
    <div className="w-full h-fit px-8 mx-auto py-2 bg-gray-200">
    <h1 className="text-xl text-gray-500 font-bold">Giáo viên</h1>
    <div className=" flex justify-end gap-2 items-center pt-4 bg-white pr-4">
      <button
        onClick={() => setReload(true)}
        className="px-3 py-1 flex flex-row  hover:text-purple-400 gap-2 hover:border-purple-400 transition-all duration-300 items-center border-2 border-gray-200 text-black rounded"
      >
        <RefreshCwIcon/>
        Tải lại
      </button>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 flex flex-row hover:text-purple-400 gap-2 hover:border-purple-400 transition-all duration-300 items-center border-2 border-gray-200 text-black rounded"
      >
        <UserPlusIcon/>
        Tạo mới
      </button>
    </div>

    <TeacherTable />


    {open && (
        <TeacherFormDrawer
          onClose={() => setOpen(false)}
          onCreated={() => setOpen(false)}
        />
      )}
  </div>
  );
}
