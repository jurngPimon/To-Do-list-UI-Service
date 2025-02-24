import { ITask } from "@/types/task.types";
import axiosInstance from "./axiosInstance";

const endpoint = "/tasks";

export const fetchTasksApi = async (): Promise<ITask[]> => {
  return (await axiosInstance.get<ITask[]>(endpoint)).data;
};

export const createTaskApi = async (task: Omit<ITask, "id" | "status">) => {
  return (await axiosInstance.post(endpoint, task)).data;
};

export const updateTaskApi = async (
  id: number,
  task: { title: string; status: string }
) => {
  return (await axiosInstance.patch(`${endpoint}/${id}`, task)).data;
};

export const deleteTaskApi = async (id: number) => {
  return (await axiosInstance.delete(`${endpoint}/${id}`)).data;
};
