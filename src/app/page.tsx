"use client";

import { useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { TaskList, TaskCreateForm, TaskPagination } from "@/features/Task";
import { useTaskStore } from "@/store/task";
import { useModalStore } from "@/store";

export default function Home() {
  const {
    apiController: { fetchTasks },
  } = useTaskStore.getState();
  const { handleOpen } = useModalStore.getState();

  useEffect(() => {
    fetchTasks(1);
  }, [1]);

  return (
    <div>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          🏆 Task Board
        </Typography>

        <Box mb={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen(<TaskCreateForm />)}
          >
            ➕ Add Task
          </Button>
        </Box>

        <Box mb={3}>
          <Typography variant="h6">Tasks:</Typography>
          <TaskList />
        </Box>

        <Stack spacing={2} alignItems="center">
          <TaskPagination />
        </Stack>
      </Box>
    </div>
  );
}
