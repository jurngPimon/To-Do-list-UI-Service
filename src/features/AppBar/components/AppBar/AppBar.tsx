"use client";
import { useRouter } from "next/navigation";
import { useFirebaseStore } from "@/store";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

const AppBar = () => {
  const user = useFirebaseStore((s) => s.user);
  const router = useRouter();

  const handleLogout = async () => {
    const { signOut } = useFirebaseStore.getState().apiController;

    await signOut();
    router.push("/login");
  };

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🏆 Task Board
        </Typography>
        {user && (
          <Button color="inherit" onClick={() => handleLogout()}>
            Logout
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
