"use client";

import { useTaskStore } from "@/store/task/useTaskStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { validateSchema } from "./TaskCreateForm.util";

interface ITaskCreateForm {
  title: string;
  description: string;
}

const TaskCreateForm = () => {
  const { createTaskApi } = useTaskStore.getState().apiController;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITaskCreateForm>({
    resolver: yupResolver(validateSchema),
  });

  const onSubmit: SubmitHandler<ITaskCreateForm> = (data) => {
    createTaskApi({
      title: data.title,
      description: data.description,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        placeholder="Title"
        label="Title"
        id="title"
        fullWidth
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
        sx={{ mb: 2 }}
      />
      <TextField
        type="text"
        label="Description"
        placeholder="Description"
        id="description"
        fullWidth
        {...register("description")}
        error={!!errors.description}
        helperText={errors.title?.message}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        fullWidth
        type="submit"
      >
        Add Task
      </Button>
    </form>
  );
};

export default TaskCreateForm;
