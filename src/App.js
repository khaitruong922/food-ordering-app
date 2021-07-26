import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import AppRouter from './AppRouter';
import useAuthStore from "./store/useAuthStore";
import { theme } from "./theme";

export default function App() {
  const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)
  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </HelmetProvider>
  );
}
