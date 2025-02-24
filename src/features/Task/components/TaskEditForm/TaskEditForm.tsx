"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/task/taskSlice";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { TaskStatusType } from "@/types/task.types";

interface TaskEditFormProps {
  id: number;
}

const TaskEditForm = ({ id }: TaskEditFormProps) => {
  const targetTask = useTaskStore.getState().getTaskById(id);
  const [title, setTitle] = useState(targetTask?.title ?? "");
  const [description, setDescription] = useState(targetTask?.description ?? "");
  const [status, setStatus] = useState<TaskStatusType>(
    targetTask?.status ?? TaskStatusType.ToDo
  );

  const { updateTaskApi } = useTaskStore.getState().apiController;
  console.log("targetTask", targetTask, status);
  return (
    <div>
      <TextField
        type="text"
        name="id"
        placeholder="id"
        label="id"
        id="id"
        fullWidth
        disabled
        value={targetTask?.id}
        sx={{ mb: 2 }}
      />
      <TextField
        type="text"
        name="title"
        placeholder="Title"
        label="Title"
        id="title"
        fullWidth
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        sx={{ mb: 2 }}
      />
      <TextField
        type="text"
        label="Description"
        placeholder="Description"
        name="description"
        id="description"
        fullWidth
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth>
        <InputLabel id="status-label">Status</InputLabel>{" "}
        <Select
          labelId="status-label"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatusType)}
        >
          {Object.entries(TaskStatusType).map(([key, value]) => (
            <MenuItem key={key} value={value} selected={status === value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        fullWidth
        onClick={() => {
          updateTaskApi(id, {
            title: title,
            description: description,
            status: status,
          });
          setTitle("");
          setDescription("");
        }}
      >
        Update Task
      </Button>
    </div>
  );
};

export default TaskEditForm;
