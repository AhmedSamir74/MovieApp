import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import { theme } from "./src/constants";
import AppNavigation from "./src/navigation/AppNavigation";
import { store } from "./src/services/redux";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    SplashScreen?.hide();
  }, []);
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AppNavigation />
        </QueryClientProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}
