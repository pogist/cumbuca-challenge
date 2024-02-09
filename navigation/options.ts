import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Theme } from '@theme';

function stackScreenOptions(theme: Theme): NativeStackNavigationOptions {
  return {
    headerStyle: {
      backgroundColor: theme.colors.background as string,
    },
    headerTitleStyle: {
      color: theme.colors.primaryText as string,
    },
    headerTintColor: theme.colors.secondary as string,
  };
}

function tabsScreenOptions(theme: Theme): BottomTabNavigationOptions {
  const shadowColor = theme.isDark ? theme.colors.border : '#000000';
  return {
    tabBarStyle: {
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    tabBarActiveTintColor: theme.colors.primary as string,
    tabBarInactiveTintColor: theme.colors.secondaryText as string,
    headerStyle: {
      shadowColor,
      shadowOpacity: 0.3,
      backgroundColor: theme.colors.background,
    },
    headerTitleStyle: {
      color: theme.colors.primaryText,
    },
  };
}

export { stackScreenOptions, tabsScreenOptions };
