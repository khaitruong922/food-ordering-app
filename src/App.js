import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import AppRouter from './AppRouter';
import chakraTheme from './chakraTheme';
import useAuthStore from "./store/useAuthStore";
export default function App() {
  const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)
  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])
  return (
    <HelmetProvider>
      <ChakraProvider theme={chakraTheme}>
        <AppRouter />
      </ChakraProvider>
    </HelmetProvider>
  );
}
