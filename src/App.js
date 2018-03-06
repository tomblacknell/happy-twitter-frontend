import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { reactLocalStorage } from 'reactjs-localstorage';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

class App extends Component {

  constructor(props) {
      super(props);
  }

  loadSettingsFromLocalStorage() {
      const settings = reactLocalStorage.getObject('settings');
      if (Object.keys(settings).length === 0 && settings.constructor === Object) {
          //alert("Settings not found in local storage");
          reactLocalStorage.setObject('settings', {setting1: false, setting2:true, setting3:false, setting4:true, setting5:false});
      } else {
          //alert("Settings found in local storage");
          console.log(settings);
      }
  }

  componentDidMount() {
      this.loadSettingsFromLocalStorage();
  }

  render() {
    return (
        <MuiThemeProvider>
            <Header/>
            <Main/>
        </MuiThemeProvider>
    );
  }
}

export default App;
