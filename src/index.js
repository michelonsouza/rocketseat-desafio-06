import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

import { colors } from './styles';
import './config/ReactotronConfig';

import Routes from './routes';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.white} />
      <Routes />
    </>
  );
}
