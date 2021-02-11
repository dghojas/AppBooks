import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import colors from '../../config/colors';
import { useTheme } from '../../context/Theme';
import CategoryBooks from '../../components/Home/CategoryBooks';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexGrow: 1,
    flex: 1,
    backgroundColor: colors.white,
  },
});

const Home = ({ navigation }) => {
  const {
    mainTheme: { backgroundColor },
  } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: backgroundColor }}>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <CategoryBooks
          title="Daily Top 100"
          category="love"
          navigation={navigation}
        />
        <CategoryBooks
          title="New releases"
          category="feminism"
          navigation={navigation}
        />
        <CategoryBooks
          title="Bestsellers"
          category="inspirational"
          navigation={navigation}
        />
        <CategoryBooks
          title="Top authors"
          category="authors"
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
