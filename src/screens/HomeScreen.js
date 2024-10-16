import React, {useState} from 'react';
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
  {id: '1', title: 'News 1', details: 'Details of News 1'},
  {id: '2', title: 'News 2', details: 'Details of News 2'},
  {id: '3', title: 'News 3', details: 'Details of News 3'},
];

export default function HomeScreen() {
  const [currentNews, setCurrentNews] = useState(newsData[0]);
  const [isShowingDetails, setIsShowingDetails] = useState(false);
  const swipeableRefs = React.useRef({});

  const handleGoBack = id => {
    setIsShowingDetails(false);
    if (swipeableRefs.current[id]) {
      swipeableRefs.current[id].close();
    }
  };

  const renderDetailsScreen = news => (
    <View style={styles.detailsScreen}>
      <Button title="Go Back" onPress={() => handleGoBack(news.id)} />
      <Text style={styles.detailsTitle}>Details of {news.title}</Text>
      <Text>{news.details}</Text>
    </View>
  );

  const renderNewsItem = ({item}) => {
    return (
      <Swipeable
        ref={ref => {
          swipeableRefs.current[item.id] = ref;
        }}
        renderRightActions={() => renderDetailsScreen(item)}
        overshootFriction={8}
        onSwipeableWillOpen={() => {
          setCurrentNews(item);
          setIsShowingDetails(true);
        }}
        onSwipeableWillClose={() => setIsShowingDetails(false)}
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
      scrollEnabled={!isShowingDetails}
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
    padding: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
