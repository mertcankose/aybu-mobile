import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {deleteComment, getSingleFoodComment, postComment} from '../api/comment';
import BasicHeader from '../components/BasicHeader';
import Comment from '../components/Comment';
import {Send} from '../components/icons';
import Loading from '../components/Loading';
import {AuthContext} from '../context/Auth';
import {errorMessage, successMessage} from '../utils/showToast';
import {strings} from '../constants/localization';
import Admission from '../components/Admission';
import {deletePostAdmin, getAllPosts, postSend} from '../api/aybu-social/post';
import LoadingMore from '../components/LoadingMore';

/*
[
    {
      id:1,
      username: 'Admission 1',
      userRole:"User",
      createdAt: '01.01.2021',
      admission:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.",
      isLike: false,
      likeCount: 0,
    },
    {
      id:2,
      username: 'Admission 2',
      userRole:"User",
      createdAt: '01.01.2021',
      admission:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.",
      isLike: true,
      likeCount: 1,
    },
    {
      id:3,
      username: 'Admission 3',
      userRole:"User",
      createdAt: '01.01.2021',
      admission:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.",
      isLike: true,
      likeCount: 1,
    },
    {
      id:4,
      username: 'Admission 4',
      userRole:"User",
      createdAt: '01.01.2021',
      admission:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.",
      isLike: false,
      likeCount: 1,
    },
  ]
*/

const Admissions = ({route, navigation}) => {
  const {colors} = useTheme();

  const {token} = useContext(AuthContext);

  const [admissions, setAdmissions] = useState([]);
  const [admission, onChangeAdmission] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    initAdmissions();
  }, []);

  const initAdmissions = () => {
    setLoading(true);
    getAdmissions(0);
  };

  const onRefresh = () => {
    setRefreshing(true);
    Keyboard.dismiss();
    onChangeAdmission('');
    getAdmissions(0);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getAdmissions = async givenPage => {
    try {
      let response = await getAllPosts(token, givenPage, 6);
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        console.log('rr: ', response?.data);
        setAdmissions([...admissions, ...response?.data]); // push state
        // push first
        setPage(page + 1);
      }
    } catch (error) {
      errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const getAdmissionsAfter = async givenPage => {
    try {
      let response = await getAllPosts(token, givenPage, 6);
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        console.log('rr: ', response?.data);
        setAdmissions([...response?.data, ...admissions]); // push state
        // push first
        setPage(page + 1);
      }
    } catch (error) {
      errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const getMoreAdmissions = async () => {
    console.log('moreeee');
    setLoadingMore(true);
    try {
      let response = await getAllPosts(token, page, 6);
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        setAdmissions([...admissions, ...response?.data]); // push state
        setPage(page + 1); // increase page
      }
    } catch (error) {
      errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoadingMore(false);
    }
  };

  const sendAdmission = async () => {
    setLoading(true);
    try {
      let response = await postSend(token, admission);
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        successMessage(strings.admissionSent);
        onChangeAdmission('');
        getAdmissionsAfter(0);
      }
    } catch (error) {
      errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAdmission = async id => {
    try {
      let response = await deletePostAdmin(token, id);
      console.log('delete response: ', response);
      successMessage('İtiraf silindi.');
      getAdmissions(0);
    } catch (error) {
      console.log('Delete Admission Error: ', error);
      errorMessage('İtiraf silinemedi.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' && 'height'}
      style={{
        flex: 1,
        position: 'relative',
      }}
      keyboardVerticalOffset={20}>
      <BasicHeader
        style={{backgroundColor: colors.trendHeader}}
        navigation={navigation}
        text={strings.admission}
        textStyle={{fontWeight: 'bold', fontSize: 18}}
        isBack={false}
      />
      {loading && <Loading />}
      {loadingMore && <LoadingMore />}
      {!loading && admissions?.length == 0 ? (
        <Text style={[styles.noComment, {color: colors.noCommentText}]}>
          {strings.noAdmission1 + '\n' + strings.noAdmission2}
        </Text>
      ) : (
        <FlatList
          data={admissions}
          keyExtractor={item => item.id}
          key={item => item.id}
          contentContainerStyle={{
            paddingHorizontal: 35,
            paddingTop: 24,
            paddingBottom: 72,
          }}
          ItemSeparatorComponent={() => <View style={{height: 24}} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => (
            <Admission
              navigation={navigation}
              admission={item}
              deleteUserAdmission={id => deleteUserAdmission(id)}
            />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={getMoreAdmissions}
        />
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <View
            style={[
              styles.commentInputContainer,
              {backgroundColor: colors.commentInputBg},
            ]}>
            <TextInput
              style={[styles.commentInput, {color: colors.commentInputText}]}
              onChangeText={onChangeAdmission}
              value={admission}
              multiline={true}
              numberOfLines={10}
              textAlignVertical="top"
              placeholder={strings.writeAdmission}
              placeholderTextColor={colors.placeholderText}
              keyboardType="default"
              
            />
            <TouchableOpacity
              onPress={() => sendAdmission()}
              activeOpacity={0.8}>
              <Send width="24" height="24" color={colors.sendIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  commentInputContainer: {
    height: 48,
    borderRadius: 24,
    paddingRight: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.65,
    elevation: 3,
    zIndex: 3,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  commentInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    paddingHorizontal: 16,
    textAlignVertical: 'top',
  },
  noComment: {
    textAlign: 'center',
    marginTop: 24,
  },
});

export default Admissions;
