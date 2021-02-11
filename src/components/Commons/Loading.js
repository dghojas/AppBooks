import React from 'react';
import { ActivityIndicator } from 'react-native';
import colors from '../../config/colors';

const Loading = ({ color = colors.black }) => (
  <ActivityIndicator color={color} size="large" />
);

export default Loading;
