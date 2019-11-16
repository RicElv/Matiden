import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import Navigation from './navigation'
import Index from './reducers/index'

const store = createStore(Index);
export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <Navigation />
        </View>
      </Provider>
    );
  }
}



