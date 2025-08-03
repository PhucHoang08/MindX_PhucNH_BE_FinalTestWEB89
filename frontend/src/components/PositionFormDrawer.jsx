// src/components/PositionFormDrawer.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import usePositionStore from "../store/usePositionStore";

export default function PositionFormDrawer({ onClose, onCreated }) {
  const { createPosition, fetchPositions } = usePositionStore();

  const initialValues = {
    name: "",
    code: "",
    des: "",
    isActive: true,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Tên là bắt buộc"),
    code: Yup.string().required("Mã là bắt buộc"),
    des: Yup.string(),
    isActive: Yup.boolean(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createPosition(values);
      await fetchPositions();
      if (onCreated) onCreated();
      onClose();
    } catch (err) {
      console.error("Lỗi khi tạo vị trí:", err);
      alert("Tạo thất bại. Mã có thể đã tồn tại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-xl">
        <h2 className="text-lg font-bold mb-4">Tạo vị trí công tác</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Mã</label>
                <Field name="code" className="input" />
                <ErrorMessage name="code" component="div" className="text-red-500 text-sm" />
              </div>

              
              <div>
                <label className="block text-sm font-medium">Tên</label>
                <Field name="name" className="input" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium">Mô tả</label>
                <Field name="des" as="textarea" className="input h-24" />
              </div>

              <div>
                <label className="inline-flex items-center gap-2">
                  <Field type="checkbox" name="isActive" />
                  Hoạt động
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 hover:bg-gray-200 border rounded transititon-all duration-300"
                  onClick={onClose}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 transititon-all duration-300 hover:bg-blue-800 bg-blue-600 text-white rounded disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
