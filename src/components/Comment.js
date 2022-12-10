import React, { useEffect, useRef, useState, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import { Narnia, Kratos, Editor, SteinsGate } from '../components/icons';
import moment from 'moment/min/moment-with-locales';
import { strings } from '../constants/localization';
import { errorMessage } from '../utils/showToast';
import { commentRating } from '../api/comment'
import { AuthContext } from '../context/Auth';

const Comment = ({ comment }) => {
  const { colors } = useTheme();
  const { token } = useContext(AuthContext)
  const animation = useRef(null);
  const isFirstRun = useRef(true);
  const [likeStatus, setLikeStatus] = useState(comment?.isLike)
  const [likeCount, setLikeCount] = useState(comment?.comment.likeCount)

  useEffect(() => {
    if (isFirstRun.current) {
      if (likeStatus) {
        animation.current.play(66, 66);
      } else {
        animation.current.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (likeStatus) {
      animation.current.play(19, 50);
    } else {
      animation.current.play(0, 19);
    }
  }, [likeStatus]);

  useEffect(() => {
    console.log(likeStatus)
  })
  const commentRatingMethod = async () => {
    likeStatus
      ? setLikeCount(likeCount - 1)
      : setLikeCount(likeCount + 1)
    setLikeStatus(!likeStatus)
    try {
      let response = await commentRating(token, comment?.comment._id, likeStatus);
      if (response.error) {
        errorMessage('Reaksiyon iletilemedi.');
      } else {
        console.log("a")
      }
    } catch (error) {
      errorMessage('Reaksiyon iletilemedi.');
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentHead}>
        <View style={styles.sampleRow}>
          {comment?.username == 'Schaleef' ? (
            <Kratos width={24} height={24} style={styles.svgView} />
          ) : comment?.username == 'Sapphique' ? (
            <SteinsGate width={24} height={24} style={styles.svgView} />
          ) : comment?.userRole == 'developer-admin' ? (
            <Narnia width={28} height={28} style={styles.svgDevAdminView} />
          ) : (
            comment?.userRole == 'admin' && (
              <Editor width={24} height={24} style={styles.svgView} />
            )
          )}
          <Text style={[styles.commentNameText, { color: colors.usernameText }]}>
            {comment?.username}
          </Text>
        </View>
        <Text style={[styles.commentDateText, { color: colors.dateText }]}>
          {moment(comment?.comment.createdAt)
            .locale(strings.lang == 'en' ? 'en' : 'tr')
            .fromNow()}
        </Text>
      </View>
      <View style={styles.commentBody}>
        <Text style={[styles.commentText, { color: colors.commentText }]}>
          {comment?.comment?.comment}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => commentRatingMethod()}
          activeOpacity={0.8}
          style={styles.commentLikeButton}>
          <Lottie
            ref={animation}
            style={styles.heartLottie}
            source={require('@/assets/sources/heart.json')}
            autoPlay={false}
            loop={false}
          />
          <Text
            style={[styles.commentLikeCount, { color: colors.dateBoxElement }]}>
            {likeCount}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  commentHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentNameText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
  },
  commentText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
  },
  commentDateText: {
    fontSize: 14,
    lineHeight: 16,
  },
  commentBody: {
    flex: 1,
    marginTop: 8,
    marginBottom: 8,
  },
  commentLikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
    marginLeft: -14,
  },
  commentLikeCount: {
    marginLeft: 4,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
  },
  heartLottie: {
    width: 50,
    height: 50,
  },
  commentLikeCount: {
    fontSize: 16,
    fontWeight: '400',
  },
  sampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleParent: {
    borderRadius: 24 / 2,
  },
  svgView: {
    borderRadius: 24 / 2,
    overflow: 'hidden',
    marginRight: 8,
  },
  svgDevAdminView: {
    borderRadius: 28 / 2,
    overflow: 'hidden',
    marginRight: 8,
  },
});

export default Comment;
