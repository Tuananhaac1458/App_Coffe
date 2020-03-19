import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
 } from 'react-native';
import { PropTypes } from 'prop-types';
import { 
    Header
  } from 'react-navigation'
import Iconn from 'react-native-vector-icons/Feather'
import Iconnn from 'react-native-vector-icons/AntDesign'
import Loading from '../components/Loading'


////////////////////////////////
import { COLOR_HIGTHPERLINK, COLOR_HEAD_BAR } from '../util/ValueString';

/////////////////////////
const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 
export default class HeaderBar extends Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     progress: 0,
  //     indeterminate: true,
  //   };
  // }

  // // componentDidMount() {
  // //   this.animate();
  // // }




  // //   animate() {
  // //   let progress = 0;
  // //   this.setState({ progress });
  // //     setInterval(() => {
  // //       progress += Math.random() / 5;
  // //       if (progress > 1) {
  // //         progress = 1;
  // //       }
  // //       this.setState({ progress });
  // //     }, 100);
    
  // // }






	render(){
    // console.log('statusBarHeight: ', this.props);
    // console.log('HeaderBar render')
    const HeaderHight = Header.HEIGHT;
	   const { Router, functionArrowleft, title, onLoading, typeArrow } = this.props;
    if(!Router){
        return (
          <SafeAreaView>
          <View>
            <View 
              style={[styles.container, {height: HeaderHight}]}
            >
                <StatusBar
                  barStyle="default"
                  backgroundColor= {COLOR_HEAD_BAR}
                />
              <View>
                <TouchableHighlight
                    underlayColor="gray"
                    onPress = { () => functionArrowleft()}
                  >
                    <View>
                      <Iconnn name = {(typeArrow === 'arrow' ? "arrowleft" : "close")} size ={30} style={{marginLeft:10}} />
                    </View>
                </TouchableHighlight>
              </View>

              <View
                style={{
                  flex:1,
                  justifyContent:'center',
                  alignItems:'center',
                  marginHorizontal:20
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  numberOfLines={1}
                >
                  {title}
                </Text>
              </View>

              <View
                style={{
                  width:40,
                }}
              >
                   
              </View>
          
          </View>
          {/*///////////////////////*/}
             <Loading
              onLoading={onLoading}
              type={'col'}
             >
              <View
                style={{
                  width:widthDefalt,
                  height:3
                }}
                >
              </View>
             </Loading>
          {/*///////////////////////*/}
 
          </View>
          </SafeAreaView>
        )
    }
  	return(
			<View 
        style={[styles.container, {height: HeaderHight}]}
      >
        <View>
          <TouchableHighlight
              underlayColor="gray"
            >
              <View>
                <Iconn name ="user" size ={30} style={{marginLeft:10}} />
              </View>
          </TouchableHighlight>
        </View>

          <View style={{
            marginLeft: 10,
            height: '65%',
            width: 100,
            justifyContent:'center',
            alignItems:'center',
            borderRadius: 20,
            borderWidth: 2,
            borderColor:COLOR_HIGTHPERLINK,
          }}>
                <Text style={{color: COLOR_HIGTHPERLINK}}>
                  Đăng Nhập
                </Text>
          </View>


        <View style= {{ flex: 1,justifyContent: 'center', alignItems:'flex-end'}}>
          <TouchableHighlight>
                <Iconnn name ="bells" size ={30} style={{marginRight:20}}/>
          </TouchableHighlight>
        </View>
      </View>
		)
	}
}
const styles = StyleSheet.create({
  container:{
    flexDirection: 'row', 
    alignItems:'center', 
    backgroundColor: COLOR_HEAD_BAR, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 2,
  }
})
HeaderBar.defaultProps = {
  title:'',
  onLoading: false,
  functionArrowleft: () => {}
}

HeaderBar.propTypes = {
  functionArrowleft: PropTypes.func,
  title: PropTypes.string,
  onLoading: PropTypes.bool
};