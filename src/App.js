import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { useEffect } from "react";
import AppRouter from './AppRouter';
import useAuthStore from "./store/useAuthStore";
import { theme } from "./theme";

export default function App() {
  const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)
  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}
