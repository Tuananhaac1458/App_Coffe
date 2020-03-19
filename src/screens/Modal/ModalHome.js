import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';
const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 

export default class ModalHome extends Component {
 static navigationOptions = {
    // title: 'Homeesd',
    // tabBarVisible: false
  };
  render(){
      return(
        <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
          <Text>
            List Music
          </Text>
          <Button onPress={() => this.props.navigation.goBack()} title="Dismiss" />
        </View>
      )
  }

}


