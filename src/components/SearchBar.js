import React, { Component } from 'react';
import Iconn from 'react-native-vector-icons/Feather'
import { ifIphoneX, ifAndroid } from '../util';
import {
  View,
  StyleSheet,
  TextInput,
  Animated,
  TouchableHighlight,
  Keyboard,
  Text
} from 'react-native';

import { Divider } from 'react-native-elements';

export default class SearchBarx extends Component {
 constructor(props) {
    super(props);
    this.state = {
      icon : 'search',
      valueSearch: this.props.textSearch,
    }
  }

  _onFocus = () => {
    this.setState({
      icon:'arrow-left',
    })
    this.props.onFocusNow()
  }

  _onEndEditing = () => {
    this.setState({
      icon:'search'
    })
    this.props._onEndEditing()
  }

  

  onChangeText = (text) => {
    console.log('eeeee===>',text)
    this._onchangce(text)  
    this.setState({
      valueSearch:text
    })
  }

  _onchangce = (e) => {
    this.props._value(e)
  }
  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState) {
    // if(prevState.onLoadMusic != this.state.onLoadMusic){
    //   this.onLoadMusic()
    // }
    if(this.props.textSearch !== this.state.valueSearch){
      this.setState({
        valueSearch: prevProps.textSearch
      })
      return
    }
  }

  render() {
    const {valueSearch} = this.state
    return (
      <View style={{flexDirection: 'row', alignItems:'center',borderWidth: 1 , borderColor: 'gray', flex:1, borderRadius: 12}}>
        <TouchableHighlight
          onPress = {() => { 
            Keyboard.dismiss(); 
            this.refSearch.clear();
            this.props.navigation.goBack();
          }}
          underlayColor="transparent"
        >
          <Iconn
            style={{paddingLeft:5}}
            name={this.state.icon} 
            size={25}/>
        </TouchableHighlight>
          <View style={{flex:1}}>
            <TextInput
              autoFocus = {true}
              ref = { search => this.refSearch = search}
              onFocus={() => this._onFocus()}
              onEndEditing={() => this._onEndEditing()}
              style={{ height: '120%',  paddingLeft:10, fontSize: 13, alignItems:'center'}}
              placeholder='Search'
              value={valueSearch}
              onChangeText={text => this.onChangeText(text)}
              // onBlur={(e) => this._onchangce(e)}
          />
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});