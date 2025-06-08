import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCourseStore = create(persist(
  (set) => ({
    courseData: null,
    setCourseData: (data) => set({ courseData: data }),
  }),
  {
    name: 'customlearn-course-content',
  }
))

export default useCourseStore
