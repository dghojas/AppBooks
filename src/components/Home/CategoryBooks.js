import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { fetchGetCategoryBooks } from '../../api/fetchGetBooks';
import colors from '../../config/colors';
import Loading from '../Commons/Loading';
import { useTheme } from '../../context/Theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  TitleCategory: {
    fontFamily: 'NotoSerif-Bold',
    fontSize: 28,
    paddingHorizontal: 25,
    paddingVertical: 15,
    color: '#33363a',
  },
  boxContainer: {
    width: width / 1.35,
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 25,
    justifyContent: 'center',
  },
  card: {
    height: 150,
    backgroundColor: colors.white,
    borderRadius: 6,
    padding: 10,
    marginLeft: 10,
    marginBottom: 15,
    elevation: 20,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  imageContainer: {
    width: 100,
    height: 150,
    marginLeft: 10,
    marginRight: 15,
    marginTop: -35,
    elevation: 10,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  imageThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  titleBook: {
    fontFamily: 'NotoSerif',
    fontSize: 16,
    marginBottom: 5,
    color: '#33363a',
  },
  authorsBook: {
    fontSize: 13,
    color: '#5c5e61',
  },
  lineBorder: {
    borderBottomColor: '#f1f1f4',
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  descriptionBook: {
    fontSize: 13,
    color: '#5c5e61',
  },
});

const CategoryBooks = ({ title, category, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [categoryBooks, setCategoryBooks] = useState([]);

  const {
    mainTheme: { backgroundColor, textColor },
  } = useTheme();

  useEffect(() => {
    fetchGetCategoryBooks(category).then((response) => {
      setCategoryBooks(response);
      setLoading(false);
    });
  }, [category]);

  if (loading) {
    return <Loading color={textColor} />;
  }

  return (
    <View>
      <Text style={styles.TitleCategory}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoryBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const bookImageUrl =
            item.volumeInfo.imageLinks &&
            (item.volumeInfo.imageLinks.small ||
              item.volumeInfo.imageLinks.thumbnail);
          const imageURI = bookImageUrl
            ? bookImageUrl.replace(/^http:\/\//i, 'https://')
            : '';

          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', { dataBook: item.volumeInfo })
              }>
              <View style={styles.boxContainer}>
                <View
                  style={[styles.card, { backgroundColor: backgroundColor }]}
                  elevation={5}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{
                        uri: imageURI,
                      }}
                      resizeMode="cover"
                      style={styles.imageThumbnail}
                    />
                  </View>
                  <View style={styles.viewColumn}>
                    <Text
                      style={[styles.titleBook, { color: textColor }]}
                      numberOfLines={2}>
                      {item.volumeInfo.title}
                    </Text>
                    {!!item.volumeInfo.authors && (
                      <Text
                        style={[styles.authorsBook, { color: textColor }]}
                        numberOfLines={2}>
                        Author: {item.volumeInfo.authors}
                      </Text>
                    )}
                    {!!item.volumeInfo.description && (
                      <View style={styles.lineBorder} />
                    )}
                    <Text
                      style={[styles.descriptionBook, { color: textColor }]}
                      numberOfLines={2}>
                      {item.volumeInfo.description}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CategoryBooks;
