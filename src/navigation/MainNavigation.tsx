import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { LoadingScreen, OnBoarding } from '../screens/';
import HomeNavigation from './HomeNavigation';
const MainFlow = createBottomTabNavigator();
const MainNavigation = () => {
    return (
        <MainFlow.Navigator>
            <>
                <MainFlow.Screen
                    name="Loading"
                    component={LoadingScreen}
                    options={{ tabBarVisible: false }}
                />
                <MainFlow.Screen
                    name="OnBoarding"
                    component={OnBoarding}
                    options={{ tabBarVisible: false }}
                />
                <MainFlow.Screen
                    name="Authorized"
                    component={HomeNavigation}
                    options={{ tabBarVisible: false }}
                />
            </>
        </MainFlow.Navigator>
    );
};

export default MainNavigation;
