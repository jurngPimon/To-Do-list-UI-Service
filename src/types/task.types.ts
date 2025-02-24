export enum TaskStatusType {
  ToDo = "OPEN",
  InProgress = "IN PROGRESS",
  Done = "DONE",
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatusType;
}

export interface ITaskGetResponse {
  tasks: ITask[];
  total: number;
}
