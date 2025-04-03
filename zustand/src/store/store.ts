import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  addHabit: (name: string, frequency: "daily" | "weekly") => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void; // ✅ Fixed incorrect parameter name
  fetchHabits:()=>Promise<void>
  isLoading:boolean,
  error:string | null
}

const useHabitStore = create<HabitState>()(
  devtools(
    persist(
      (set,get) => ({
        habits: [],
        isLoading:false,
        error:null,
        addHabit: (name, frequency) =>
          set((state) => ({
            habits: [
              ...state.habits,
              {
                id: crypto.randomUUID(),
                name,
                frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
            ],
          })),

        removeHabit: (id) =>
          set((state) => ({
            habits: state.habits.filter((habit) => habit.id !== id),
          })),

        toggleHabit: (id, date) =>
          set((state) => ({
            habits: state.habits.map((habit) =>
              habit.id === id
                ? {
                    ...habit,
                    completedDates: habit.completedDates.includes(date)
                      ? habit.completedDates.filter((d) => d !== date)
                      : [...habit.completedDates, date],
                  }
                : habit
            ),
          })),
          fetchHabits:async()=>{
            
            set({isLoading:true});
            try{
              const currHabits=get().habits;
              if(currHabits.length>0){
                set({isLoading:false});
                return 
              }
              await new Promise((resolve)=>{setTimeout(resolve,1000)})
              const mockHabits:Habit[]=[
                  {
                    id:'1',
                    name:"Gym",
                    frequency:"daily",
                    completedDates:[],
                    createdAt:new Date().toISOString()
                  },{
                    id:'2',
                    name:"Study",
                    frequency:"daily",
                    completedDates:[],
                    createdAt:new Date().toISOString()
                  }
              ]
              set({
                habits:mockHabits,
                isLoading:false
              })
            }catch(error){
              set({error :'Failed to fetch habits',isLoading:false})
            }
          }
      }),
      {
        name: "habit-local", // ✅ Added name for persisted state in localStorage
      }
    )
  )
);

export default useHabitStore;
