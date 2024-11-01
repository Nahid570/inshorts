import React from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Button,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

const {width, height} = Dimensions.get('window');

const newsData = [
  {
    id: '1',
    title: 'News 1',
    details: Array.from({length: 60}).map((_, index) => `Item ${index + 1}`),
  },
  {
    id: '2',
    title: 'News 2',
    details: Array.from({length: 60}).map((_, index) => `Item ${index + 1}`),
  },
  {
    id: '3',
    title: 'News 3',
    details: Array.from({length: 60}).map((_, index) => `Item ${index + 1}`),
  },
];

export default function HomeScreen({navigation}) {
  // const [currentNews, setCurrentNews] = useState(newsData[0]);
  // const [isShowingDetails, setIsShowingDetails] = useState(false);
  const swipeableRefs = React.useRef({});

  // const handleGoBack = id => {
  //   // setIsShowingDetails(false);
  //   if (swipeableRefs.current[id]) {
  //     swipeableRefs.current[id].close();
  //   }
  // };

  // const renderDetailsScreen = news => (
  //   <View style={styles.detailsScreen}>
  //     <Button title="Go Back" onPress={() => handleGoBack(news.id)} />
  //     <ScrollView showsVerticalScrollIndicator={false}>
  //       {news.details.map(item => (
  //         <Text key={item}>{item}</Text>
  //       ))}
  //     </ScrollView>
  //   </View>
  // );

  const renderNewsItem = ({item}) => {
    return (
      <Swipeable
        ref={ref => {
          swipeableRefs.current[item.id] = ref;
        }}
        // renderRightActions={() => renderDetailsScreen(item)}
        overshootFriction={8}
        onSwipeableWillOpen={() => {
          // setCurrentNews(item);
          navigation.navigate('details', {news: item});
          if (swipeableRefs.current[item.id]) {
            swipeableRefs.current[item.id].close();
          }
          // setIsShowingDetails(true);
        }}
        onSwipeableWillClose={() => null}
        rightThreshold={100}>
        <View style={styles.newsItem}>
          <Text style={styles.newsTitle}>{item.title}</Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <FlatList
      data={newsData}
      keyExtractor={item => item.id}
      renderItem={renderNewsItem}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      // scrollEnabled={!isShowingDetails}
      style={styles.newsFeed}
    />
  );
}

const styles = StyleSheet.create({
  newsFeed: {
    width,
    height,
  },
  newsItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  newsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsScreen: {
    flex: 1,
    width,
    padding: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
