import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";

const Tab = createBottomTabNavigator();

function Placeholder({ title }) {
  return null;
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Dashboard} />
        <Tab.Screen name="Skills" component={() => <Placeholder title="Skills" />} />
        <Tab.Screen name="Projects" component={() => <Placeholder title="Projects" />} />
        <Tab.Screen name="Messages" component={() => <Placeholder title="Messages" />} />
        <Tab.Screen name="Profile" component={() => <Placeholder title="Profile" />} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
