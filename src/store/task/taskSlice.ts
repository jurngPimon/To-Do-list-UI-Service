import {
  fetchTasksApi,
  deleteTaskApi,
  updateTaskApi,
  createTaskApi,
} from "@/api/taskApi";
import { ITask } from "@/types/task.types";
import { create } from "zustand";

export const useTaskStore = create<TaskSlice>((set, get) => ({
  tasks: [],
  taskTotal: 0,
  TaskLimit: 6,
  currentPage: 1,
  setCurrentPage: (page: number) => set({ currentPage: page }),
  getTaskById: (id: number) => {
    return get().tasks.find((task) => task.id === id);
  },
  apiController: {
    fetchTasks: async (page: number) => {
      const limit = get().TaskLimit;
      const resp = await fetchTasksApi(page, limit);
      set({
        tasks: resp?.tasks || [],
        taskTotal: resp?.total || 0,
        currentPage: page,
      });
    },
    createTaskApi: async (task) => {
      const {
        apiController: { fetchTasks },
      } = get();

      try {
        await createTaskApi(task);
        await fetchTasks(1);
      } catch (error) {
        console.error(error);
      }
    },
    updateTaskApi: async (id, task) => {
      const { tasks } = get();

      try {
        const resp = await updateTaskApi(id, task);
        const taskIndex = tasks.findIndex((t) => t.id === id);

        if (taskIndex !== -1) {
          const updatedTasks = [...tasks];
          updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], ...resp };
          set({ tasks: updatedTasks });
        }
      } catch (error) {
        console.error(error);
      }
    },
    deleteTaskApi: async (id) => {
      try {
        await deleteTaskApi(id);
        const tasks = get().tasks.filter((task) => task.id !== id);
        set({ tasks });
      } catch (error) {
        console.error(error);
      }
    },
  },
}));

export interface TaskSlice {
  tasks: ITask[];
  taskTotal: number;
  TaskLimit: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  getTaskById: (id: number) => ITask | undefined;
  apiController: {
    fetchTasks: (page: number) => Promise<void>;
    createTaskApi: (task: Omit<ITask, "id" | "status">) => Promise<void>;
    updateTaskApi: (id: number, task: Omit<ITask, "id">) => Promise<void>;
    deleteTaskApi: (id: number) => Promise<void>;
  };
}
