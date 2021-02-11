import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  textBold: {
    fontWeight: 'bold',
  },
});

const NegritaBold = (props) => (
  <Text style={styles.textBold}>{props.children}</Text>
);

export default NegritaBold;
