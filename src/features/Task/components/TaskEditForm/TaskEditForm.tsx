"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/task/useTaskStore";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { TaskStatusType } from "@/types/task.types";
import { useModalStore } from "@/store/modal/useModalStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./TaskEditForm.util";

interface TaskEditFormProps {
  id: number;
}

interface TaskFormInputs {
  title: string;
  description: string;
  status: TaskStatusType;
}

const TaskEditForm = ({ id }: TaskEditFormProps) => {
  const targetTask = useTaskStore.getState().getTaskById(id);
  // const [title, setTitle] = useState(targetTask?.title ?? "");
  // const [description, setDescription] = useState(targetTask?.description ?? "");
  // const [status, setStatus] = useState<TaskStatusType>(
  //   targetTask?.status ?? TaskStatusType.ToDo
  // );

  const { updateTaskApi } = useTaskStore.getState().apiController;
  const { handleClose } = useModalStore.getState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: targetTask?.title ?? "",
      description: targetTask?.description ?? "",
      status: targetTask?.status ?? TaskStatusType.ToDo,
    },
  });

  const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
    await updateTaskApi(id, data);
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        label="Title"
        fullWidth
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
        sx={{ mb: 2 }}
      />
      <TextField
        type="text"
        label="Description"
        fullWidth
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          {...register("status")}
          defaultValue={targetTask?.status ?? TaskStatusType.ToDo}
        >
          {Object.entries(TaskStatusType).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        fullWidth
      >
        Update Task
      </Button>
    </form>
  );
};

export default TaskEditForm;
