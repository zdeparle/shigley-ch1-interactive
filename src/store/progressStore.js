import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProgressStore = create(
  persist(
    (set, get) => ({
      moduleProgress: {},
      unitTests: {},  // { 0: true, 1: true, ... } — which unit tests have been passed
      xp: 0,
      streak: 0,
      lastActiveDate: null,

      completeStep: (moduleId, stepIndex) => {
        const current = get().moduleProgress[moduleId] || { stepsCompleted: [], completed: false, correctAnswers: 0, totalQuestions: 0 }
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

      addXP: (amount) => {
        const today = new Date().toDateString()
        const lastDate = get().lastActiveDate
        const isConsecutive = lastDate && (() => {
          const last = new Date(lastDate)
          const diff = Math.floor((new Date(today) - last) / (1000 * 60 * 60 * 24))
          return diff <= 1
        })()

        set(state => ({
          xp: state.xp + amount,
          lastActiveDate: today,
          streak: isConsecutive ? (lastDate === today ? state.streak : state.streak + 1) : 1
        }))
      },

      recordAnswer: (moduleId, correct) => {
        const current = get().moduleProgress[moduleId] || { stepsCompleted: [], completed: false, correctAnswers: 0, totalQuestions: 0 }
        set(state => ({
          moduleProgress: {
            ...state.moduleProgress,
            [moduleId]: {
              ...current,
              correctAnswers: (current.correctAnswers || 0) + (correct ? 1 : 0),
              totalQuestions: (current.totalQuestions || 0) + 1
            }
          }
        }))
      },

      passUnitTest: (unitIndex) => {
        const already = get().unitTests[unitIndex]
        if (!already) {
          set(state => ({
            unitTests: { ...state.unitTests, [unitIndex]: true },
            xp: state.xp + 50,
          }))
        }
      },

      isUnitUnlocked: (unitIndex) => {
        if (unitIndex === 0) return true // First unit always unlocked
        return !!get().unitTests[unitIndex - 1]
      },

      getModuleProgress: (moduleId, totalSteps) => {
        const current = get().moduleProgress[moduleId]
        if (!current) return 0
        return Math.round((current.stepsCompleted.length / totalSteps) * 100)
      },

      resetAll: () => set({ moduleProgress: {}, unitTests: {}, xp: 0, streak: 0, lastActiveDate: null })
    }),
    { name: 'shigley-progress' }
  )
)

export default useProgressStore
