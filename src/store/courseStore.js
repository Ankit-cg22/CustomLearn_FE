import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCourseStore = create(persist(
  (set) => ({
    courseData: null,
    courseId : null ,
    setCourseData: (data) => set({ courseData: data }),
    setCourseId : (id) => set({ courseId: id }),
  }),
  {
    name: 'customlearn-course-content',
  }
))

export default useCourseStore
