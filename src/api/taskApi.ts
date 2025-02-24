import { ITask, ITaskGetResponse } from "@/types/task.types";
import axiosInstance from "./axiosInstance";

const endpoint = "/tasks";

export const fetchTasksApi = async (
  page: number = 1,
  limit: number = 6
): Promise<ITaskGetResponse> => {
  return (
    await axiosInstance.get<ITaskGetResponse>(endpoint, {
      params: { page, limit },
    })
  ).data;
};

export const createTaskApi = async (task: Omit<ITask, "id" | "status">) => {
  return (await axiosInstance.post(endpoint, task)).data;
};

export const updateTaskApi = async (
  id: number,
  task: { title: string; description: string; status: string }
) => {
  return (await axiosInstance.patch(`${endpoint}/${id}`, task)).data;
};

export const deleteTaskApi = async (id: number) => {
  return (await axiosInstance.delete(`${endpoint}/${id}`)).data;
};
