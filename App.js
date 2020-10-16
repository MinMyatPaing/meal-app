import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';

import MealsNavigator from './navigation/MealsNavigatior';
import mealReducer from './store/reducers/mealReducer';

const rootReducer = combineReducers({
  meals: mealReducer
})

const store = createStore(rootReducer);

enableScreens();

const loadFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [loadedFonts, setLoadedFonts] = useState(false);

  if(!loadedFonts) {
    return <AppLoading startAsync={loadFonts} onFinish={() => setLoadedFonts(true)} onError={(err) => console.log('Error is' + err)} />
  }

  return <Provider store={store}><MealsNavigator /></Provider>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
