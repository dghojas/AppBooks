import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 50,
    color: '#465881',
  },
});

const FormInput = ({ labelValue, placeholderText, iconType, ...rest }) => (
  <TextInput
    value={labelValue}
    style={styles.input}
    numberOfLines={1}
    placeholder={placeholderText}
    placeholderTextColor="#666"
    {...rest}
  />
);

export default FormInput;
