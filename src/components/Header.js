import React, {useContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import {useTheme} from '@react-navigation/native';
import {ThemeContext} from '@/context/Theme';

const Header = ({type = 'inside'}) => {
  const {colors} = useTheme();
  const {theme} = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.headerContainer,
        {backgroundColor: colors.headerBg, height: rh(136)},
      ]}>
      {type === 'inside' &&
        (theme === 'light' ? (
          <Image
            source={require('@/assets/images/aybumobilelight.png')}
            style={{marginTop: 16, width: rw(176), height: rh(48)}}
          />
        ) : (
          <Image
            source={require('@/assets/images/aybumobiledark.png')}
            style={{marginTop: 16, width: rw(176), height: rh(48)}}
          />
        ))}
      {type === 'outside' && <Text>WELCOME</Text>}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    elevation: -1,
  },
});
