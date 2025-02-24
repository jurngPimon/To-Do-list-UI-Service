import {
  fetchTasksApi,
  deleteTaskApi,
  updateTaskApi,
  createTaskApi,
} from "@/api/taskApi";
import { ITask, TaskStatusType } from "@/types/task.types";
import { create } from "zustand";

export const useTaskStore = create<TaskSlice>((set, get) => ({
  tasks: [],
  getTaskById: (id: number) => {
    return get().tasks.find((task) => task.id === id);
  },
  apiController: {
    fetchTasks: async () => {
      const resp = await fetchTasksApi();
      set({ tasks: resp || [] });
    },
    createTaskApi: async (task) => {
      const { tasks } = get();

      try {
        const resp = await createTaskApi(task);
        set({ tasks: [...tasks, resp] });
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
          updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], ...resp }; // ✅ Only updates the necessary task
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
  getTaskById: (id: number) => ITask | undefined;
  apiController: {
    fetchTasks: () => Promise<void>;
    createTaskApi: (task: Omit<ITask, "id" | "status">) => Promise<void>;
    updateTaskApi: (id: number, task: Omit<ITask, "id">) => Promise<void>;
    deleteTaskApi: (id: number) => Promise<void>;
  };
}
