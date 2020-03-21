import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight,
  ScrollView,
  Platform
} from 'react-native';
import { PropTypes } from 'prop-types';
import { ListItem, Divider, Input, Image, Button,Overlay } from 'react-native-elements';
import { WebView } from 'react-native-webview';
const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 
//////////////////////////////
import AddPayment from './AddPayment'
import  { BACK_GROUND_DEFAULT } from '../util/ValueString';

const Listcard = [
  {
    "number": "12345678912",
    "expiry": "02/26",
    "cvc": "825",
    "name": "TUAN",
    "postalCode": "700000"
  }
]

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type : '',
      loading:false,
    }
  }
  

  _setType = (value) => {
    this.setState({
      type: value
    })
  }
  componentWillUnmount(){
   
  }

  render(){
    const { callback } = this.props;
    return(
       <View style={{marginTop:10, flex:1, }}>
          <Overlay 
            overlayBackgroundColor={'rgba(255,255,255,0.5)'}
            fullScreen={true}
            isVisible={this.state.loading}>
            <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
              <ActivityIndicator 
                size="large" 
                color="#0000ff" 
              />
            </View>
          </Overlay>

          <View>
            <View style={{height:60, backgroundColor:'white', justifyContent: 'center',alignItems: 'center', flexDirection: 'row'}}>
              <Text style={{paddingLeft:16,color:'black', fontSize:25, fontWeight: 'bold',}}>  
                Payment
              </Text>
            </View>
            <Divider style={{ backgroundColor: '#eeeeee',height:10}}></Divider>
          </View>
        <ScrollView>
          {
            (this.state.type === '') && (<View>
            <TouchableHighlight
              onPress = {() => {
                this.setState({
                  loading:true
                })
                setTimeout(() => {
                  this._setType('visa')
                  this.setState({
                    loading:false
                  })
                }, 2000);
              }}
              underlayColor="transparent"
            >
          <View style={styles.boxPay}>
            <Text>
              Visa/Mastercard
            </Text>
            <View style={{ flexDirection: 'row', }}>
                 <Image
                  source={require('../img/mastercard.png')}
                  style={{ width: 50, height: 50 }}
                />
                <Image
                  source={require('../img/visa.png')}
                  style={{ width: 50, height: 50 }}
                />
              </View>
            </View>
            </TouchableHighlight>

            <TouchableHighlight
               onPress = {() => {
                this.setState({
                  loading:true
                })
                setTimeout(() => {
                  this._setType('paypal')
                  this.setState({
                    loading:false
                  })
                }, 2000);
              }}
              underlayColor="transparent"
            >
            <View style={styles.boxPay}>
              <Text>
                Paypal
              </Text>
              <View style={{ flexDirection: 'row', }}>
                   <Image
                    source={require('../img/paypal.png')}
                    style={{ width: 50, height: 50 }}
                  />
              </View>
            </View>
            </TouchableHighlight>
          </View>)
          }

          {
            (this.state.type === 'visa') && (
              <AddPayment
                callback={callback}
              />
            )
          }
          {
            (this.state.type === 'paypal') &&(
              <View style={{flex:1, height:heightDefalt}}>
                <WebView 
                  userAgent={'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'}
                  source={{uri: 'https://www.paypal.com/au/signin'}}
                  onLoad={() => this.onLoadWeb()}
                  onError={() => this.onErrorWeb()}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={true}
                  mixedContentMode={'always'}
                  originWhitelist={["*"]}
                  useWebKit={Platform.OS == 'ios'}
                  thirdPartyCookiesEnabled={true}
                  scrollEnabled={true}
                  allowUniversalAccessFromFileURLs={true}
                  style={{
                    flex: 1,
                    width:'100%'
                  }}
                />
              </View>
            )
          }
      </ScrollView>

      </View>
    )
  }
 onLoadWeb = () => {
    console.log('onLoadWeb')
    this.setState({onLoadModal: false})    
  }
  onErrorWeb = () => {
    console.log('onLoadWeberrr')
  }
}

Payment.defaultProps = {
 
}

Payment.propTypes = {
  
};

const styles = StyleSheet.create({
 boxPay:{
    flexDirection: 'row', 
    height:80, 
    alignItems:'center', 
    justifyContent:'space-between',
    paddingHorizontal:15,
    overflow: 'hidden',
    marginBottom:10,
    borderColor: '#999',
    // https://github.com/facebook/react-native/issues/10049#issuecomment-366426897
    backgroundColor: '#FFF',
    // Android shadow
    elevation:2
 }
  
});


export default Payment;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
