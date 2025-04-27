import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context/theme";


const container = document.getElementById("app");
const root = createRoot(container);

// Create query client (before App component)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </QueryClientProvider>
  </BrowserRouter>
);