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
  ToastAndroid,
  BackHandler
} from 'react-native';
import { PropTypes } from 'prop-types';

//////////////////////////////

import  { BACK_GROUND_DEFAULT, COLOR_HIGTHPERLINK } from '../util/ValueString';
import Modal, { SlideAnimation } from 'react-native-modals';
import Coupon from './Coupon'
import ListCoupon from './ListCoupon'

import  { RenderViewMoney } from '../util/init';

const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 



class ButtonBuy extends Component {
  constructor(props) {
    super(props);
    this.couponCode = null;
      this.state = {
        visible: false,
        visible2: false,
        isType : 0,
        couponCode: null
      }
  }
  componentDidUpdate(){
    if(!this.state.visible){
        console.log("666===",this.state.visible)
        if(this.abc !== undefined){
          this.abc.remove()
        }
    }
    if(this.state.visible){
        console.log("555===",this.state.visible)
        this.handleBackPress()
    }
    if(!this.state.visible2){
        console.log("666===",this.state.visible2)
        if(this.abcd !== undefined){
          this.abcd.remove()
        }
    }
    if(this.state.visible2){
        console.log("555===",this.state.visible2)
        this.handleBackPress2()
    }
  }

   handleBackPress = () => {
    if(this.state.visible){
        this.abc = BackHandler.addEventListener('hardwareBackPressss02', () => {
           if(!this.state.visible){
            return false
          }
          this.setState({
            visible: false
          })
          return true
      })
    }
  }

  handleBackPress2 = () => {
    if(this.state.visible2){
        this.abcd = BackHandler.addEventListener('hardwareBackPressss02', () => {
           if(!this.state.visible2){
            return false
          }
          this.setState({
            visible2: false
          })
          return true
      })
    }
  }
  closeModal = () => {
    console.log("33333===",this.state.visible)
    if(!this.state.visible){
      return
    }
    this.setState({
      visible: false
    })
  }

  closeModal2 = () => {
    console.log("33333===",this.state.visible2)
    this.setState({
      visible2: !this.state.visible2
    })
  }
   
  _coponCode = (text) => {
    this.couponCode = text
    this.setState({
      couponCode:text
    })
  }

  _onChoseCoupon = (obj) => {
    this.setState({
      couponCode:obj.code
    })
  }
  renderModal = (dataProduct) => {
    return(
       <Modal
            visible={this.state.visible}
            onTouchOutside={() => this.closeModal()}
            modalAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
          >
              {this.renderModal02()}
              <Coupon
                couponCode={this._coponCode}
                couponValue = {this.state.couponCode}
                coloseModol = {this.closeModal}
                openCloseModal2 = {this.closeModal2}
              />
      </Modal>
    )
  }

  renderModal02 = () => {
    return(
       <Modal
            visible={this.state.visible2}
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
          >
              <ListCoupon
                onChose = {this._onChoseCoupon}
                openCloseModal2 = {this.closeModal2}
              />
      </Modal>
    )
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
          <TouchableHighlight
            style={{flex:1}}
            underlayColor="transparent"
          >
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
          </TouchableHighlight>
          <TouchableHighlight
            style={{flex:1}}
            underlayColor="transparent"
            onPress={() => {
              this.setState({
                visible:true,
                isType:2
              })
            }}
          >

          <View style={styles.boxCoupon}>
            <Image
              style={styles.image}
              source={require('../img/coupon1.png')}
            />
            <Text style={styles.text}>
              Mã ưu đãi
            </Text>
             {
              (this.couponCode !== null) && (
                <Text style={{fontSize:15, fontWeight: 'bold'}}>
                  { this.couponCode } 
                </Text>
              ) 
             }
          </View> 
          </TouchableHighlight>
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

        {this.renderModal()}
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
