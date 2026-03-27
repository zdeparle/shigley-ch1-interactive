import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProgressStore = create(
  persist(
    (set, get) => ({
      moduleProgress: {}, // { moduleId: { completed: bool, stepsCompleted: Set or array } }
      completeStep: (moduleId, stepIndex) => {
        const current = get().moduleProgress[moduleId] || { stepsCompleted: [], completed: false }
        const stepsCompleted = [...new Set([...current.stepsCompleted, stepIndex])]
        set(state => ({
          moduleProgress: {
            ...state.moduleProgress,
            [moduleId]: { ...current, stepsCompleted }
          }
        }))
      },
      completeModule: (moduleId) => {
        set(state => ({
          moduleProgress: {
            ...state.moduleProgress,
            [moduleId]: { ...state.moduleProgress[moduleId], completed: true }
          }
        }))
      },
      getModuleProgress: (moduleId, totalSteps) => {
        const current = get().moduleProgress[moduleId]
        if (!current) return 0
        return Math.round((current.stepsCompleted.length / totalSteps) * 100)
      },
      resetAll: () => set({ moduleProgress: {} })
    }),
    { name: 'shigley-progress' }
  )
)

export default useProgressStore
