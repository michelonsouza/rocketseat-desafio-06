import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { colors } from './styles';

import Main from './screens/Main';
import User from './screens/User';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
    },
    {
      headerTitleAlign: 'center',
      headerBackTitleVIsible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
      },
    },
  ),
);

export default Routes;
