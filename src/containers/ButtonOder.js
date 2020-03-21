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
import Iconnn from 'react-native-vector-icons/AntDesign'

//////////////////////////////

import  { BACK_GROUND_DEFAULT, COLOR_HIGTHPERLINK } from '../util/ValueString';

import  { RenderViewMoney } from '../util/init';

const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 



class ButtonOder extends Component {
  constructor(props) {
    super(props);
      this.state = {
        amount : (props.invoice !== undefined && props.dataProduct.amount !== undefined ) ?  props.dataProduct.amount : 1,
        oderOption : props.oderOption
      }
  }
  renderPrince = (dataProduct,amount) => {
    let RealPrince = dataProduct.Price; 
    dataProduct.arrSize.forEach(element => {
      if(element.selection === false){
        return
      }
      RealPrince += element.PlusPrice
    });
    dataProduct.arrTopping.forEach(element => {
      if(element.selection === false){
        return
      }
      RealPrince += element.PlusPrice
    });
    return RenderViewMoney(RealPrince * amount)
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
    const { dataProduct, setOderInvoice, closeModal, log, invoice } = this.props;
    console.log("this.propsbutton==>", invoice)

    return(
      <View style={styles.container}>
            <View style={styles.boxPlus}>
               <Iconnn 
                name = {"minuscircle"}
                size ={30} 
                color= {(this.state.amount > 1 || invoice === true ) ?  "red" : '#aaa'}
                onPress = { () => {
                  if(this.state.amount === 0 ){
                    return
                  }
                  if(this.state.amount === 1 && invoice === undefined){
                    return
                  }
                  this.setState({
                    amount: this.state.amount -= 1
                  })
                }}
                />

                  <Text style={styles.text}>

                    {this.state.amount}
                  </Text>

                 <Iconnn 
                  name = {"pluscircle"}
                  size ={30} 
                  color= {COLOR_HIGTHPERLINK}
                  onPress = { () => this.setState({
                    amount: this.state.amount += 1
                  })}
                />
            </View> 
            <View style={styles.boxbutton}>
               <TouchableHighlight 
                style={styles.boxTouchable}
                underlayColor="rgba(255,255,0,0.2)"
                onPress = {() => {
                    closeModal();
                    setOderInvoice({...dataProduct,amount: this.state.amount},invoice)
                }}
                >
                  <Text
                    style={{color: "white", fontSize:15}}
                  >
                    {(this.state.amount > 0) ? `${this.renderPrince(dataProduct,this.state.amount)} đ` : 'Bỏ sản phẩm này'} 
                  </Text>
               </TouchableHighlight>
            </View> 
      </View>
    )
  }

}

ButtonOder.defaultProps = {
}

ButtonOder.propTypes = {
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding:10,
    justifyContent:"space-between",
  },
  boxTouchable:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width:'80%',
    backgroundColor:COLOR_HIGTHPERLINK,
    borderRadius:10,

  },
  boxPlus:{
    flexDirection:'row',
    flex:1,
    alignItems: 'center',
  },
  boxbutton:{
    flex:1,
    alignItems: 'flex-end',

  },
  text: {
    paddingHorizontal:15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  }
});


export default ButtonOder;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
