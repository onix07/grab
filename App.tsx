/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useColorScheme} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

// redux
import {Provider} from 'react-redux';
import {store} from './scr/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import {DriverScreen} from './scr/screen/DriverScreen';
import {RideScreen} from './scr/screen/RideScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  gesturenEnabled: false,
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const containerStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <Provider store={store}>
      <SafeAreaView style={containerStyle}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={screenOptions}
            initialRouteName={'Driver'}>
            <Stack.Screen name={'Driver'} component={DriverScreen} />
            <Stack.Screen name={'Ride'} component={RideScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
