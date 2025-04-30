"use client";

import { useLoadingStore } from "@/store";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  console.log({ isLoading });
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
