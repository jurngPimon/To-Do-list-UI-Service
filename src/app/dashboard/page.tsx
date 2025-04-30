"use client";

import { useEffect } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { TaskList, TaskCreateForm, TaskPagination } from "@/features/Task";
import { useTaskStore } from "@/store/task";
import { useModalStore } from "@/store";
import { AppBar } from "@/features";

export default function Home() {
  const fetchTasks = useTaskStore((s) => s.apiController.fetchTasks);
  const { handleOpen } = useModalStore.getState();

  useEffect(() => {
    fetchTasks(1);
  }, []);

  return (
    <>
      <AppBar />
      <Container maxWidth="lg">
        <Box sx={{ p: 4 }}>
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
      </Container>
    </>
  );
}
