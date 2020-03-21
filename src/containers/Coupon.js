import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { PropTypes } from 'prop-types';

//////////////////////////////
import {  Button, Overlay } from 'react-native-elements';
import  { BACK_GROUND_DEFAULT, COLOR_HIGTHPERLINK } from '../util/ValueString';

class Coupon extends Component {
  constructor(props) {
    super(props);
    this._couponValue = null
    this.state = {
      value : '',
      loading: false
    }
  }

  _onChangeText = (text : string) => {
    this.setState({
      value: text
    })
  }
  componentDidUpdate(){
    if(this.props.couponValue !== this._couponValue){
      this._couponValue = this.props.couponValue
      this.setState({
        value: this.props.couponValue
      })
    }
  }
  componentDidMount(){
    if(this.props.couponValue !== this._couponValue){
      console.log('propv==.couponValue', this.props.couponValue)
      this._couponValue = this.props.couponValue
      this.setState({
        value: this.props.couponValue
      })
    }
  }
  render(){
    const { couponCode, coloseModol,openCloseModal2 } = this.props;
    return(
      <View style={{width:280,maxWidth:280,padding:15,justifyContent: 'center',alignItems: 'center',}}>
        <Overlay 
          overlayBackgroundColor={'rgba(255,255,255,0.5)'}
          fullScreen={true}
          isVisible={this.state.loading}>
          <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
            <ActivityIndicator 
              size="large" 
              color="#ffffff" 
            />
          </View>
        </Overlay>

        <Text style={{fontSize: 20,color:'black',fontWeight: 'bold',}}>
          Coupon
        </Text>
        <View style={{width:'100%',marginTop:15}}>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1,borderRadius:10}}
                onChangeText={text => this._onChangeText(text)}
                value={this.state.value}
              />
        </View>

         <View style={{ width:'100%', marginTop:15,flexDirection:'row',justifyContent: 'space-between',}}>
            <Button
              title="Your coupon"
              containerStyle={{width:'45%', borderRadius:10,borderWidth:1,overflow:'hidden'}}
              buttonStyle={{backgroundColor:'white',}}
              titleStyle={{color:'black'}}
              onPress={() => {
                this.setState({
                  loading:true
                })
                setTimeout(() => {
                  this.setState({
                    loading:false
                  })
                 openCloseModal2()
                }, 1000)
              }}
            />
             <Button
              title="Use coupon"
              containerStyle={{width:'45%', borderRadius:10,borderWidth:1,borderColor:COLOR_HIGTHPERLINK,overflow:'hidden'}}
              buttonStyle={{backgroundColor:COLOR_HIGTHPERLINK,}}
              onPress={() => {
                this.setState({
                  loading:true
                })
                setTimeout(() => {
                  this.setState({
                    loading:false
                  })
                  couponCode(this.state.value);
                  coloseModol();
                }, 1000)
              }}
            />
            
        </View>

      </View>
    )
  }

}

Coupon.defaultProps = {
  
}

Coupon.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

const styles = StyleSheet.create({
 
  
});


export default Coupon;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
