import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StatusBar,
  StyleSheet
} from 'react-native';


////////////////////////// Import Redux ////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pageActions from '../redux/actions/SplashAction';
import SplashScreen from 'react-native-splash-screen'
import AppIntroSlider from 'react-native-app-intro-slider';
import { WriteFromLocalDB } from '../helpers/AsyncStorage';

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../img/1.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../img/2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../img/3.jpg'),
    backgroundColor: '#22bcb5',
  }
];



class IntroScreen extends Component {
	constructor(props) {
	  super(props);
	  this.state = { 
	  };
	}


 _renderItem = (item) => {
 	console.log('item====>', item.item)
    return (
      <View style={[styles.mainContent, {backgroundColor:item.item.backgroundColor}]}>
        <Text style={styles.title}>{item.item.title}</Text>
        	<Image 
        		style={styles.image}
        		source={item.item.image} 
        	/>
        <Text style={styles.text}>{item.item.text}</Text>
      </View>
    );
}

  _onDone = () => {
	WriteFromLocalDB('doneIntro','true').then(() => {
    	this.props.navigation.navigate('LoginScreen')
  	})
  }

	render(){
		return(
			<View style={{ flex: 1, alignItems:'center', justifyContent:'center', backgroundColor:'black'}}>
				<StatusBar 
				    barStyle="light-content" 
				    backgroundColor= 'rgba(0,0,0,0)'
				    translucent={true}
				/>
				 <AppIntroSlider 
				 	slides={slides}
				 	renderItem={this._renderItem} 
				 	onDone={this._onDone}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop:30
    
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});

////////////////////////////
const ActionCreators = Object.assign(
  {},
  pageActions,
)

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(ActionCreators, dispatch),
// });

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: bindActionCreators(ActionCreators, dispatch),  
  }
};

export default connect(state => mapStateToProps, mapDispatchToProps)(IntroScreen);
