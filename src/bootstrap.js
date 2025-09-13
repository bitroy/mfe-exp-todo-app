import React from "react";
import { createRoot } from "react-dom/client";
import TodoList from "./components/TodoList";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import cache from "./emotionCache";
import theme from "./theme";

const App = () => {
	return (
    <CacheProvider value={cache}>
			<ThemeProvider theme={theme}>
        <CssBaseline />
        <TodoList />;
      </ThemeProvider>
    </CacheProvider>
  ) 
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
