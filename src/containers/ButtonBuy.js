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
  ImageBackground,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';
import { PropTypes } from 'prop-types';

//////////////////////////////

import  { BACK_GROUND_DEFAULT, COLOR_HIGTHPERLINK } from '../util/ValueString';

import  { RenderViewMoney } from '../util/init';

const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 



class ButtonBuy extends Component {
  constructor(props) {
    super(props);
      this.state = {
      }
  }
  
   componentWillUnmount() {
      // this.state.oderOption.topping.forEach(function(element) {
      //     element.selected = false
      // })
      // const arrSizeReset = this.state.arrSize;
      // for(let i in this.state.arrSize){
      //   if(i === "0"){
      //     this.state.arrSize[i].selected = true
      //     continue;
      //   }
      //   this.state.arrSize[i].selected = false
      // }
  }
  render(){
    const { money } = this.props;
    return(
      <View>
        <View style={styles.container}>
          <View style={styles.boxTypeMoney}>
            <Image
              style={styles.image}
              source={require('../img/money.png')}
            />
            <Text style={styles.text}>
              Thanh toán Khi nhận hàng
            </Text>
            <Text style={{fontSize:15, fontWeight: 'bold'}}>
              { money } đ
            </Text>
          </View> 
          <View style={styles.boxCoupon}>
            <Image
              style={styles.image}
              source={require('../img/coupon1.png')}
            />
            <Text style={styles.text}>
              Mã ưu đãi
            </Text>
          </View> 
        </View>
        <TouchableHighlight
          onPress = {() => {
            ToastAndroid.show('Tính năng oder tạm đóng', ToastAndroid.SHORT);
          }}
        >
          <View style={styles.buttonBuy}>
            <View style={{flex:1,}}>
            </View>
            <View style={{flex:1,  alignItems:'center'}}>
              <Text style={{fontWeight:'bold',fontSize:15, color:'white'}}>
                Đặt hàng
              </Text>
            </View>
            <View style={{flex:1, alignItems:'center'}}>
              <Text style={{fontWeight:'bold',fontSize:15, color:'white'}}>
                { money } đ
              </Text>
            </View>

          </View>
        </TouchableHighlight>
      </View>
    )
  }

}

ButtonBuy.defaultProps = {
}

ButtonBuy.propTypes = {
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth:1,
    borderColor: 'gray',
    justifyContent:"space-between",
    height: 100,
    width:widthDefalt,
    paddingVertical:20,
    backgroundColor:'white',

  },
  boxTypeMoney:{
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    borderRightWidth:1,
    borderColor: 'gray',

  },
  boxCoupon:{
    height:'100%',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBuy:{
    height:60,
    width:widthDefalt,
    backgroundColor:COLOR_HIGTHPERLINK,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  image:{
    height:20,
    width: 30,
  },
  text: {
    paddingVertical:8,
    textAlign: 'center',
    fontSize: 10,
    color:'#333'
  }
});


export default ButtonBuy;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
