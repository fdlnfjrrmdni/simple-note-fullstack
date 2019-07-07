import React, { Component } from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './src/Publics/redux/store';
import Home from './src/Screens/Home';
import Note from './src/Screens/EditNote';
import AddNote from './src/Screens/AddNote';
import DrawerMenu from './src/Components/Drawer';

const AppDrawerNavigator = createDrawerNavigator({
  Home: { screen: Home },
  Note: { screen: Note },
  AddNote: { screen: AddNote }
}, {
  contentComponent: DrawerMenu,
  drawerWidth: 230
});

const AppContainer = createAppContainer(AppDrawerNavigator);
export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
