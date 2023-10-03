import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  ScrollView,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/Theme';
import Header from '../components/Header';
import UsernameBox from '../components/UsernameBox';
import { ProfileContext } from '../context/Profile';
import TYPOGRAPHY from '../constants/typography';
import ToggleButton from 'react-native-toggle-element';
import { Sun, Moon } from '../components/icons/';
import { useTheme } from '@react-navigation/native';
import { strings } from '../constants/localization';
import AppText from '../components/AppText';
import Rate, { AndroidMarket } from 'react-native-rate'

const Profile = ({ navigation }) => {
  const { colors } = useTheme();
  const { theme, changeTheme } = useContext(ThemeContext);
  const { username, faculty, department } = useContext(ProfileContext);
  const [toggleValue, setToggleValue] = useState(
    theme == 'light' ? true : false,
  );
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${strings.downloadLinks}\nApple Store: https://apps.apple.com/us/app/ayb%C3%BC-mobile/id1658659307\nGoogle Play Store: https://play.google.com/store/apps/details?id=com.aybumobile`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={[styles.homeContainer, { backgroundColor: colors.background }]}>
      <Header type="inside" />
      <UsernameBox username={username} />
      <ScrollView
        contentContainerStyle={styles.innerView}
        showsVerticalScrollIndicator={false}
        style={{
          paddingBottom: 40,
        }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.fieldText}>{strings.faculty}</Text>
          <View
            style={[
              styles.departmentArea,
              { borderColor: colors.boxBorder, backgroundColor: colors.boxBg },
            ]}>
            <Text
              numberOfLines={2}
              style={[
                styles.departmentInnerText,
                { color: colors.usernameText },
              ]}>
              {faculty}
            </Text>
          </View>
          <Text style={[styles.fieldText, { marginTop: 20 }]}>
            {strings.department}
          </Text>
          <View
            style={[
              styles.departmentArea,
              { borderColor: colors.boxBorder, backgroundColor: colors.boxBg },
            ]}>
            <Text
              numberOfLines={2}
              style={[
                styles.departmentInnerText,
                { color: colors.usernameText },
              ]}>
              {department}
            </Text>
          </View>
          <Text style={[styles.fieldText, { marginTop: 20 }]}>
            {strings.mood}
          </Text>
          <ToggleButton
            value={toggleValue}
            onPress={newState => {
              setToggleValue(newState);
              toggleValue ? changeTheme('dark') : changeTheme('light');
            }}
            containerStyle={{ alignSelf: 'center' }}
            thumbActiveComponent={<Sun width="24" height="24" />}
            thumbInActiveComponent={<Moon width="24" height="24" />}
            thumbStyle={{
              backgroundColor: '#0AD4EE',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            trackBar={{
              activeBackgroundColor: colors.toggleBack,
              inActiveBackgroundColor: colors.toggleBack,
              width: 100,
            }}
          />
          <TouchableOpacity
            style={{ marginTop: 16 }}
            onPress={onShare}
            activeOpacity={0.5}>
            <Text
              style={[
                styles.shareWithFriends,
                { color: colors.shareFriendsText },
              ]}>
              {strings.sharedWithFriends}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('ProfileEdit');
          }}>
          <View
            style={[
              styles.editButton,
              {
                borderColor: colors.editBorderColor,
                backgroundColor: colors.editBackgroundColor,
              },
            ]}>
            <Text style={[styles.editText, { color: '#0AD4EE' }]}>
              {strings.edit}
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: 1,
            backgroundColor: '#eee',
            width: '100%',
            marginVertical: 20,
          }}></View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('About');
          }}>
          <AppText
            style={[
              styles.editText,
              {
                color: colors.text,
                textDecorationLine: 'underline',
              },
            ]}>
            {strings.abouttheapp}
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{ marginTop: 20 }}
          onPress={() => {
            navigation.navigate('Contact');
          }}>
          <View
            style={[
              styles.editButton,
              {
                borderColor: colors.editBorderColor,
                // backgroundColor: colors.editBackgroundColor,
                backgroundColor: 'gold',
              },
            ]}>
            <AppText style={[styles.editText, { color: '#fff' }]}>
              {strings.contact}
            </AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            const options = {
              AppleAppID: "1658659307",
              GooglePackageName: "com.aybumobile",
              preferredAndroidMarket: AndroidMarket.Google,
              preferInApp: false,
              openAppStoreIfInAppFails: true,
              fallbackPlatformURL: "https://aybumobile.com/",
            }
            Rate.rate(options, (success, errorMessage) => {
              if (success) {
                // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
              }
              if (errorMessage) {
                // errorMessage comes from the native code. Useful for debugging, but probably not for users to view
                console.error(`Example page Rate.rate() error: ${errorMessage}`)
              }
            })
          }}>
          <View
            style={[
              styles.editButton,
              {
                borderColor: colors.editBorderColor,
                backgroundColor: colors.editBackgroundColor,
                marginTop: 20
              },
            ]}>
            <Text style={[styles.editText, { color: '#0AD4EE' }]}>
              {strings.rate}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  innerView: {
    paddingTop: 30,
    paddingBottom: 40,
  },
  editButton: {
    borderRadius: 32,
    width: '50%',
    borderWidth: 1,
    alignSelf: 'center',
    shadowColor: '#0AD4EE',
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.1,
    elevation: 1,
    zIndex: 5,
  },
  fieldText: [
    TYPOGRAPHY.H5Regular,
    {
      color: '#A0A0A0',
      marginBottom: 8,
      alignSelf: 'center',
    },
  ],
  shareWithFriends: [
    TYPOGRAPHY.H5Semibold,
    {
      alignSelf: 'center',
    },
  ],
  editText: [
    TYPOGRAPHY.H4Regular,
    {
      alignSelf: 'center',
      marginVertical: 20,
    },
  ],
  departmentArea: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 32,
    padding: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    width: '70%',
    alignSelf: 'center',
  },
  departmentInnerText: [
    TYPOGRAPHY.H55Regular,
    {
      flex: 1,
      textAlign: 'center',
    },
  ],
});

export default Profile;
