import React from 'react';
import {View, Text, ScrollView} from 'react-native';

const DetailsScreen = ({route}) => {
  const {news} = route.params;
  return (
    <View>
      <ScrollView>
        {news.details.map(item => (
          <Text key={item}> {item}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;
