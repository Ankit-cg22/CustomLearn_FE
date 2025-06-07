import { create } from 'zustand'

const useCourseStore = create((set) => ({
  courseData: null,
  setCourseData: (data) => set({ courseData: data }),
}))

export default useCourseStore
