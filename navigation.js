import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'


import HomeScreen from './screens/HomeScreen'
import GroceriesScreen from './screens/GroceriesScreen'
import RecipesScreen from './screens/RecipesScreen'

const rootStack = createStackNavigator(
    {
      Home: {screen: HomeScreen},
      Groceries: {screen: GroceriesScreen},
      Recipes: {screen: RecipesScreen}
    },
    {
      headerLayoutPreset: 'center'
    });
  
  const App = createAppContainer(rootStack);
  export default App;