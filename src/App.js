import { ChakraProvider } from "@chakra-ui/react";
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
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </ChakraProvider>
    </HelmetProvider>
  );
}
