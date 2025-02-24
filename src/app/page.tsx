"use client";

import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { TaskList, TaskForm } from "@/features/Task";
import { useTaskStore } from "@/store/task";
import { useModalStore } from "@/store";

export default function Home() {
  const { fetchTasks } = useTaskStore.getState().apiController;
  const { handleOpen } = useModalStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          🏆 Task Board
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen(<TaskForm />)}
        >
          ➕ Add Task
        </Button>

        <TaskList />

        {/* Add Task Modal */}
      </Box>
    </div>
  );
}
