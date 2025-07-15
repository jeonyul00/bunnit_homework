import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Mypage from '@src/screens/mypage';
import { colors } from '@src/constants/colors';
import { navigations } from '@src/constants/navigations';
import Home from '@src/screens/home';

import Library from '@src/screens/library';
import Calendar from '@src/screens/calendar';

export type TabParamList = {
  [navigations.Home]: undefined;
  [navigations.Calendar]: undefined;
  [navigations.Library]: undefined;
  [navigations.Mypage]: undefined;
};

const TabNavi = createBottomTabNavigator<TabParamList>();

const Tab = () => {
  return (
    <TabNavi.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.disabled,
        tabBarLabelStyle: { marginTop: 5 },
        tabBarItemStyle: { paddingTop: 5 },
      }}
    >
      <TabNavi.Screen
        name={navigations.Home}
        component={Home}
        options={{
          title: navigations.Home,
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <TabNavi.Screen
        name={navigations.Calendar}
        component={Calendar}
        options={{
          title: navigations.Calendar,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="calendar-month" color={color} size={size} />,
        }}
      />
      <TabNavi.Screen
        name={navigations.Library}
        component={Library}
        options={{
          title: navigations.Library,
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="book-open" color={color} size={size} />,
        }}
      />
      <TabNavi.Screen
        name={navigations.Mypage}
        component={Mypage}
        options={{
          title: navigations.Mypage,
          tabBarIcon: ({ color, size }) => <AntDesign name="user" color={color} size={size} />,
        }}
      />
    </TabNavi.Navigator>
  );
};

export default Tab;
