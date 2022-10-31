import {useRef} from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Backdrop from './Backdrop';
import Indicator from './Indicator';
import Square from './Square';

import {data} from '../../helpers/onboarding-helper';

const {width, height} = Dimensions.get('screen');

const Onboarding = () => {
  const scrollx = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Backdrop scrollx={scrollx} />
      <Square scrollx={scrollx} />
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollx}}}],
          {useNativeDriver: false},
        )}
        contentContainerStyle={styles.animatedFlatListContainer}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item}) => {
          return (
            <View style={styles.flatListItem}>
              <View style={styles.flatListItemInside}>
                <Image
                  source={{uri: Image.resolveAssetSource(item.image).uri}}
                  style={{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={styles.flatListItemTextContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollx={scrollx} data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedFlatListContainer: {
    paddingBottom: 100,
  },
  flatListItem: {
    width: width,
    alignItems: 'center',
    padding: 20,
  },
  flatListItemInside: {
    flex: 0.7,
    justifyContent: 'center',
  },
  flatListItemTextContainer: {
    flex: 0.3,
  },
  itemTitle: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#fff',
  },
  itemDescription: {
    fontWeight: '300',
    color: '#fff',
    fontSize: 14,
  },
});

export default Onboarding;

/*
// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

*/
