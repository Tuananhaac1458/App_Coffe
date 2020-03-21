import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StatusBar
} from 'react-native';


////////////////////////// Import Redux ////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pageActions from '../redux/actions/SplashAction';
import SplashScreen from 'react-native-splash-screen'
import {  ReadFromLocalDB } from '../helpers/AsyncStorage';




class SplashScreens extends Component {
	constructor(props) {
	  super(props);
	  this.state = { 
	  	imgload: false 
	  };
	}
	
	// static getDerivedStateFromProps(props, state){
		
	// }

	componentDidMount() {
		SplashScreen.hide();



		ReadFromLocalDB('doneIntro').then(e => {
			this.props.dispatch.getDataProps();
			if(e === 'true'){
				ReadFromLocalDB('skiplogin').then(a => {
					if(a === 'true'){
						setTimeout(() => {
							this.props.navigation.navigate('Dashboard')
						},2000)	
						return
					}
					setTimeout(() => {
						this.props.navigation.navigate('LoginScreen')
					},2000)	
				})
			}else{
				setTimeout(() => {
					this.props.navigation.navigate('IntroScreen')
				},2000)
			}
		})
			

	}

	componentDidUpdate(prevProps, prevState) {
		if(!prevProps.gateProps.networkInfo){
			return
		}
	}
	render(){
		console.log('gateProps===>',this.props.gateProps)
		return(
			<View style={{ flex: 1, alignItems:'center', justifyContent:'center', backgroundColor:'black'}}>
				<StatusBar 
				    barStyle="light-content" 
				    backgroundColor= 'black'
				    translucent={false}
				/>
				 <Image
					style={{ width: 200, height: 100, resizeMode:"contain"}}
  					source={require('../img/logoCoffe.png')}
		          	//source={{uri:'https://w0.pngwave.com/png/441/249/white-coffee-cappuccino-espresso-ristretto-coffee-png-clip-art-thumbnail.png'}}
		          	onLoad={() => this.setState({imgload: true})}
		        />
				<Text style={{color:'white'}}>
					Americano Academy Welcome!
				</Text>
			</View>
		)
	}
}



////////////////////////////
const ActionCreators = Object.assign(
  {},
  pageActions,
)

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(ActionCreators, dispatch),
// });

const mapStateToProps = state => ({
   gateProps: state.gateProps
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: bindActionCreators(ActionCreators, dispatch),  
  }
};

export default connect(state => mapStateToProps, mapDispatchToProps)(SplashScreens);
