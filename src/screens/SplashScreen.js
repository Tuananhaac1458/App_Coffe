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




class SplashScreen extends Component {
	constructor(props) {
	  super(props);
	  this.state = { 
	  	imgload: false 
	  };
	}
	
	// static getDerivedStateFromProps(props, state){
		
	// }

	componentDidMount() {
		this.props.dispatch.getDataProps();
			
	}

	componentDidUpdate(prevProps, prevState) {
		if(!prevProps.gateProps.networkInfo){
			return
		}
		if(prevState.imgload === false){
			setTimeout(() => {
				this.props.navigation.navigate('Dashboard')
			},2000)
		}else{
			setTimeout(() => {
				this.props.navigation.navigate('Dashboard')
			},4000)
		}
	}
	render(){
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

export default connect(state => mapStateToProps, mapDispatchToProps)(SplashScreen);
