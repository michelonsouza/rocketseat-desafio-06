import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import { colors } from '../../styles';

import { LoadingContainer } from '../User/styles';

export default function Repository({ navigation }) {
  return (
    <WebView
      source={{ uri: navigation.getParam('repository').html_url }}
      startInLoadingState
      renderLoading={() => (
        <LoadingContainer>
          <ActivityIndicator size="large" color={colors.darken} />
        </LoadingContainer>
      )}
    />
  );
}

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

Repository.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repository').name,
});
