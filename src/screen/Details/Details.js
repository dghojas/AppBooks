import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View } from 'react-native';
import Star from 'react-native-star-view';
import NegritaBold from '../../components/Commons/NegritaBold';
import moment from 'moment';
import { useTheme } from '../../context/Theme';

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  imageContainer: {
    width: 180,
    height: 280,
    elevation: 10,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  imageThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  pageCount: {
    fontSize: 13,
    color: '#a2a8ae',
    textAlign: 'center',
    marginTop: 15,
  },
  infoTitle: {
    fontFamily: 'NotoSerif-bold',
    fontSize: 20,
    color: '#33363a',
  },
  infoAuthor: {
    fontSize: 14,
    color: '#5c5e61',
    marginTop: 5,
  },
  titleDescription: {
    fontSize: 14,
    color: '#a2a8ae',
    marginBottom: 15,
  },
  infoAdditional: {
    fontSize: 14,
    color: '#5c5e61',
    marginBottom: 5,
  },
  infoBook: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  boxInfoBook: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  spaceBottomInfoBook: {
    marginBottom: 25,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  textAverageRating: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  textPageCount: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

const starStyle = {
  width: 60,
  height: 12,
};

const Details = (props) => {
  const { route } = props;
  const { dataBook } = route.params;
  const bookImageUrl =
    dataBook.imageLinks &&
    (dataBook.imageLinks.small || dataBook.imageLinks.thumbnail);
  const imageURI = bookImageUrl
    ? bookImageUrl.replace(/^http:\/\//i, 'https://')
    : '';
  const averageRating =
    dataBook.averageRating !== undefined ? dataBook.averageRating : 0;
  const date = moment(dataBook.publishedDate).format('MMM. D, YYYY');

  const {
    mainTheme: { backgroundColor, textColor },
  } = useTheme();

  return (
    <ScrollView
      style={[styles.ScrollView, { backgroundColor: backgroundColor }]}>
      <View style={[styles.viewCenter, { backgroundColor: backgroundColor }]}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: imageURI,
            }}
            resizeMode="cover"
            style={styles.imageThumbnail}
          />
        </View>
      </View>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <View style={[styles.infoBook, { backgroundColor: backgroundColor }]}>
          <View style={styles.spaceBottomInfoBook}>
            <Text
              style={[styles.infoTitle, { color: textColor }]}
              numberOfLines={1}>
              {dataBook.title}
            </Text>
            {!!dataBook.authors && (
              <Text
                style={[styles.infoAuthor, { color: textColor }]}
                numberOfLines={1}>
                {dataBook.authors}
              </Text>
            )}
          </View>

          <View
            style={[
              styles.boxInfoBook,
              styles.spaceBottomInfoBook,
              { backgroundColor: backgroundColor },
            ]}>
            <View>
              <Text style={[styles.textAlignCenter, { color: textColor }]}>
                Rating
              </Text>
              <Star score={averageRating} style={starStyle} />
              <Text style={[styles.textAverageRating, { color: textColor }]}>
                {averageRating}
              </Text>
            </View>
            {!!dataBook.pageCount && (
              <View>
                <Text style={[styles.textAlignCenter, { color: textColor }]}>
                  Number of pages
                </Text>
                <Text style={[styles.textPageCount, { color: textColor }]}>
                  Pages {dataBook.pageCount}
                </Text>
              </View>
            )}
            {!!dataBook.language && (
              <View>
                <Text style={[styles.textAlignCenter, { color: textColor }]}>
                  Language
                </Text>
                <Text style={[styles.textAverageRating, { color: textColor }]}>
                  {dataBook.language}
                </Text>
              </View>
            )}
          </View>

          <View>
            <Text style={[styles.titleDescription, { color: textColor }]}>
              {dataBook.description}
            </Text>
            {!!dataBook.publishedDate && (
              <Text style={[styles.infoAdditional, { color: textColor }]}>
                <NegritaBold>Publication:</NegritaBold> {date}
              </Text>
            )}
            {!!dataBook.publisher && (
              <Text style={[styles.infoAdditional, { color: textColor }]}>
                <NegritaBold>Editor:</NegritaBold> {dataBook.publisher}
              </Text>
            )}
            {!!dataBook.categories && (
              <Text style={[styles.infoAdditional, { color: textColor }]}>
                <NegritaBold>Genders:</NegritaBold> {dataBook.categories}
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;
