import {DarkTheme} from '@react-navigation/native';

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#090909',
    mealBackground: '#151515',
    text: '#fff',
    lightBlue: '#0AD4EE',
    heartGray: '#2C2C2C',
    heartRed: '#F62053',
    tabBarText: '#565656',
    tabBarTextActive: '#fff',
    tabBarButtonBackground: '#000',
    tabBarButtonBackgroundActive: '#0AD4EE',
    tabBarIconColor: '#fff',
    tabBarIconColorActive: '#fff',
    headerBg: '#0AD4EE',
    reactionBg: '#0F0F0F',
  },
};

export default customDarkTheme;
