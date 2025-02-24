"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/task/taskSlice";
import { Button, TextField } from "@mui/material";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { createTaskApi } = useTaskStore.getState().apiController;

  return (
    <div>
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
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        fullWidth
        onClick={() => {
          createTaskApi({
            title: title,
            description: description,
          });
          setTitle("");
          setDescription("");
        }}
      >
        Add Task
      </Button>
    </div>
  );
};

export default TaskForm;
