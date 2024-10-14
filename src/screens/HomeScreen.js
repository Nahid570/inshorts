import React, {useState} from 'react';
import {View, Text, FlatList, Dimensions, StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const {width, height} = Dimensions.get('window');

const newsData = [
  {id: '1', title: 'News 1', details: 'Details of News 1'},
  {id: '2', title: 'News 2', details: 'Details of News 2'},
  {id: '3', title: 'News 3', details: 'Details of News 3'},
];

export default function HomeScreen() {
  const [currentNews, setCurrentNews] = useState(newsData[0]);
  const [isShowingDetails, setIsShowingDetails] = useState(false); // Track if details screen is visible

  // Render for the details screen
  const renderDetailsScreen = news => (
    <View style={styles.detailsScreen}>
      <Text style={styles.detailsTitle}>Details of {news.title}</Text>
      <Text>{news.details}</Text>
    </View>
  );

  // Render for each news item with Swipeable for individual swipe handling
  const renderNewsItem = ({item}) => (
    <Swipeable
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

  return (
    <FlatList
      data={newsData}
      keyExtractor={item => item.id}
      renderItem={renderNewsItem} // Render the swipeable news items
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
