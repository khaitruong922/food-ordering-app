import { ThemeProvider } from "@material-ui/core";
import AppRouter from './AppRouter';
import { theme } from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}
