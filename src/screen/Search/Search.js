import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { fetchGetSearchBooks } from '../../api/fetchGetBooks';
import { size } from 'lodash';
import { Searchbar, Text } from 'react-native-paper';
import { useTheme } from '../../context/Theme';
import colors from '../../config/colors';

const styles = StyleSheet.create({
  input: {
    marginTop: -3,
    backgroundColor: '#fff',
    color: colors.white,
  },
  boxContainer: {
    width: '97%',
    flex: 1,
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
  SafeAreaView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contView: {
    padding: 20,
  },
  titleBook: {
    fontFamily: 'NotoSerif',
    fontSize: 16,
    marginBottom: 5,
    color: '#33363a',
  },
  ScrollView: {
    marginTop: 25,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
});

const SearchScreen = ({ navigation }) => {
  const [books, setBooks] = useState(null);
  const [searchBooks, setSearchBooks] = useState('');

  const {
    mainTheme: { backgroundColor, textColor },
  } = useTheme();

  useEffect(() => {
    if (size(searchBooks) > 2) {
      fetchGetSearchBooks(searchBooks).then((response) => {
        setBooks(response);
      });
    }
  }, [searchBooks]);

  return (
    <SafeAreaView
      style={[styles.SafeAreaView, { backgroundColor: backgroundColor }]}>
      <View style={styles.contView}>
        <Searchbar
          placeholder="Search"
          placeholderTextColor={colors.black}
          iconColor={colors.black}
          style={styles.input}
          onChangeText={(e) => setSearchBooks(e)}
        />
        <View style={styles.ScrollView}>
          <FlatList
            data={books}
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
                    navigation.navigate('Details', {
                      dataBook: item.volumeInfo,
                    })
                  }>
                  <View style={styles.boxContainer}>
                    <View
                      style={[
                        styles.card,
                        { backgroundColor: backgroundColor },
                      ]}>
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
                          numberOfLines={3}>
                          {item.volumeInfo.title}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={() => (
              <View>
                <Text style={styles.textAlignCenter}>No hay items</Text>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
