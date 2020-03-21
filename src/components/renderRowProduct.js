
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  StyleSheet,
  BackHandler

} from 'react-native';
import PropTypes from 'prop-types';
import Loading from './Loading'
import { COLOR_HIGTHPERLINK } from '../util/ValueString';
import Iconnn from 'react-native-vector-icons/AntDesign';

import Modal, { SlideAnimation } from 'react-native-modals';

import Oderdetail from '../containers/Oderdetail'
import  { RenderViewMoney } from '../util/init';

const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 

 class RenderRowProduct extends Component {
  constructor(props) {
      super(props);
      this.state = {
        visible: false,
      }
    }
    componentDidUpdate(){
      if(!this.state.visible && this.abc !== undefined){
        this.abc.remove()
      }
    }
    handleBackPress = () => {
    if(this.state.visible){
      this.abc = BackHandler.addEventListener('hardwareBackPressss02', () => {
          this.setState({
            visible: false
          })
          return true
      })
    }
  }
  componentWillUnmount(){
    console.log('unmonut-----> rwo')
  }

  renderModal = (dataProduct) => {
    return (
      <View style={{flex:1}}>
      <Modal
        visible={this.state.visible}
        onTouchOutside={() => this.closeModal()}
        onHardwareBackPress={this.handleBackPress()}
        modalAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
          >
        <Oderdetail
          dataProduct = {dataProduct}
          closeModal = {this.closeModal}
          setOderInvoice = {this.props.setOderDetail} 
          setLoveProduct = {this.props.setLoveProduct}
          invoice={true}
        />
      </Modal>
      </View>
    )
  }

  closeModal = () => {
    console.log('123444444444444+.')
    this.setState({
      visible: false
    })
  }

    ////// render nama size and topping to arr ////////////
  renderOptionName = (arr, type) => {
    if(arr === undefined || !Array.isArray(arr)){
      return
    }
    let nameView = [];
    arr.forEach((element) => {
      if(!element.selection){
        return
      }
      if(type === 'size'){
        nameView.push(element.name)
        return  
      }
      nameView.push(element.name)
    })
    return nameView.join()
  }



  /////// render money to product /////////
  renderPrince = (dataProduct) => {
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
    return RenderViewMoney(RealPrince * dataProduct.amount)
  }


  render() {
    const { product } = this.props;
    return (
        <View >
         <TouchableHighlight
            onPress={() => this.setState({visible: !this.state.visible})}
            underlayColor="rgba(226,167,37,0.1)"
         >
           <View  style={{flexDirection:'row', height:60,alignItems:'center',borderColor: 'gray', borderBottomWidth: 1, marginVertical:15}}>
            <View style={{height:40, width:40, borderWidth:1, borderColor:'black',alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:COLOR_HIGTHPERLINK}}>
                {product.amount}
              </Text>
            </View>
            <View style={{paddingLeft:10,height:"100%",flex:1,justifyContent:'space-between',flexDirection:'row',alignItems:'center', marginBottom:10}}>
              <View style={{justifyContent:'center',flex:1, marginRight:5}}>
                <Text style={styles.textModal}>
                  {product.name}
                </Text>
                { (product.arrSize.length > 0) &&
                  (<Text style={{color:'gray'}} numberOfLines={1}>
                    { this.renderOptionName(product.arrSize, 'size') }
                  </Text>)
                }

                { (product.arrTopping.length > 0) &&
                 (<Text style={{color:'gray'}} numberOfLines={2}>
                    { this.renderOptionName(product.arrTopping, 'Topping') }
                   </Text>)
                }

              </View>  
                 <Text style={{fontSize:18}}>
                  { this.renderPrince(product) } đ
                </Text>
            </View>
          </View>
         </TouchableHighlight>
         {this.renderModal(product)}
        </View>
    );
  }
}

RenderRowProduct.defaultProps = {
  
}

RenderRowProduct.propTypes = {
  
};


const styles = StyleSheet.create({

  
});
export default RenderRowProduct;
