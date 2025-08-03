// src/components/TeacherFormDrawer.jsx
import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import useTeacherStore from '../store/useTeacherStore.js'
import bgGundam from "../image/bgGundam.jpg"
import { UploadCloudIcon } from 'lucide-react'
import usePositionStore from '../store/usePositionStore.js'
export default function TeacherFormDrawer({ onClose }) {
  const { createTeacher, fetchTeachers, degreeTypes } = useTeacherStore()
  const { positions, fetchPositions } = usePositionStore()

  useEffect(() => {
    fetchPositions()
  }, [])
  const initialValues = {
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    identity: '',
    dob: '',
    teacherPositionsId: [],
    degrees: [
      {
        type: '',
        school: '',
        major: '',
        year: '',
        isGraduated: true
      }
    ]
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Bắt buộc'),
    email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
    phoneNumber: Yup.string().required('Bắt buộc'),
    address: Yup.string().required('Bắt buộc'),
    identity: Yup.string().required('Bắt buộc'),
    dob: Yup.date().required('Bắt buộc'),
    teacherPositionsId: Yup.array().min(1, 'Chọn ít nhất 1 chức vụ'),
    degrees: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required('Loại bằng cấp?'),
        school: Yup.string().required('Trường?'),
        major: Yup.string().required('Ngành?'),
        year: Yup.number().required('Năm?'),
        isGraduated: Yup.boolean()
      })
    )
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        user: {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: values.address,
          identity: values.identity,
          dob: values.dob,
        },
        teacherPositionsId: values.teacherPositionsId,
        degrees: {
          type: values.degrees[0].type,
          school: values.degrees[0].school,
          major: values.degrees[0].major,
          year: values.degrees[0].year,
          isGraduated: values.degrees[0].isGraduated
        }
      }
      await fetchTeachers()
      await createTeacher(payload)

      onClose()
    } catch (error) {
      alert("Tạo giáo viên thất bại.")
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-2/3 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Tạo giáo viên mới</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form className="space-y-4">
              <div className='w-full flex flex-row justify-between'>
                <div className='w-1/3 h-fit flex flex-row justify-between items-center'>

                  <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                    <div className="md:flex">
                      <div className="w-full p-3">
                        <div
                          className="relative h-48 rounded-lg border-2 border-dashed border-blue-500 bg-gray-50 flex justify-center items-center transition-shadow duration-300 ease-in-out"
                        >
                          <div className="absolute flex flex-col items-center">
                            <UploadCloudIcon />
                            <span className="block text-gray-500 font-semibold">
                              Upload file
                            </span>
                            <span className="block text-gray-400 font-normal mt-1">
                              Chọn ảnh
                            </span>
                          </div>

                          <input
                            name=""
                            className="h-full w-full opacity-0 cursor-pointer"
                            type="file"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div>
                  <div>
                    <h1 className='font-bold'>Thông tin cá nhân</h1>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label>Họ và tên</label>
                      <Field name="name" className="input" />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label>Ngày sinh</label>
                      <Field name="dob" type="date" className="input" />
                      <ErrorMessage name="dob" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label>Số điện thoại</label>
                      <Field name="phoneNumber" className="input" />
                      <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label>Email</label>
                      <Field name="email" className="input" />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label>Số CCCD</label>
                      <Field name="identity" className="input" />
                      <ErrorMessage name="identity" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label>Địa chỉ</label>
                      <Field name="address" className="input" />
                      <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                    </div>


                  </div>
                </div>
              </div>
              {/* Thông tin công tác */}
              <div>
                <h3 className="font-semibold mb-2">Thông tin công tác</h3>

                <div className="">

                  <label>Chức vụ</label>
                  <Field as="select" name="teacherPositionsId" multiple className="input h-32 bg-white border-2 border-black focus:outline-none ">
                    {positions.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="positions" component="div" className="text-red-500 text-sm" />
                </div>

              </div>


              {/* Học vị */}
              <div>
                <h3 className="font-semibold">Học vị</h3>
                <FieldArray name="degrees">
                  {({ push, remove }) => (
                    <div className="space-y-4">
                      {values.degrees.map((_, index) => {
                        console.log("degreeTypes", degreeTypes)
                        return (
                          <div key={index} className="grid grid-cols-6 gap-2 items-end border p-2 rounded">
                            <div className="col-span-1">
                              <Field as="select" name={`degrees.${index}.type`} className="input h-10 bg-transparent border-2 border-black ">
                                {degreeTypes.map((d) => (
                                  <option key={d.name} value={d.name}>
                                    {d.name}
                                  </option>
                                ))}
                              </Field>
                            </div>
                            <div className="col-span-1">
                              <Field name={`degrees.${index}.school`} placeholder="Trường" className="input" />
                            </div>
                            <div className="col-span-1">
                              <Field name={`degrees.${index}.major`} placeholder="Chuyên ngành" className="input" />
                            </div>
                            <div className="col-span-1">
                              <Field name={`degrees.${index}.year`} type="text" placeholder="Tốt nghiệp năm" className="input" />
                            </div>
                            <div className="col-span-1 flex justify-center items-center h-10">
                              <label className="inline-flex items-center gap-1">
                                <Field type="checkbox" name={`degrees.${index}.isGraduated`} className=" flex" />
                                Hoàn thành
                              </label>
                            </div>
                            <div className="col-span-1 flex justify-center items-center h-10">
                              <button type="button" onClick={() => remove(index)} className="text-red-500">Xóa</button>
                            </div>
                          </div>
                        )
                      })}
                      <button
                        type="button"
                        onClick={() =>
                          push({ type: '', school: '', major: '', year: '', isGraduated: false })
                        }
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Thêm
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Hủy</button>
                <button
                  type="submit"
                  className={`px-4 py-2 bg-green-600 text-white rounded ${isSubmitting?`bg-green-600 `:`bg-gray-400`}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}