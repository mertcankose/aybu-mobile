import {DarkTheme} from '@react-navigation/native';

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#090909',
    tabBarText: '#565656',
    tabBarTextActive: '#fff',
    tabBarButtonBackground: '#000',
    tabBarButtonBackgroundActive: '#0AD4EE',
    tabBarIconColor: '#fff',
    tabBarIconColorActive: '#fff',
    headerBg: '#0AD4EE',
  },
};

export default customDarkTheme;
