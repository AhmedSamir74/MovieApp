import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { theme } from './src/constants';
import AppNavigation from './src/navigation/AppNavigation';
import { store } from './src/services/redux';

export default function App() {
    useEffect(() => {
        SplashScreen?.hide();
    }, []);
    return (
        <ReduxProvider store={store}>
            <PaperProvider theme={theme}>
                <AppNavigation />
            </PaperProvider>
        </ReduxProvider>
    );
}
