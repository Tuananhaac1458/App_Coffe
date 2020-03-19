
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  StyleSheet

} from 'react-native';


import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

import Loading from './Loading'

import ModalContainer from '../containers/ModalContainer';

import { COLOR_HIGTHPERLINK } from '../util/ValueString';

import  { RenderViewMoney } from '../util/init';

import  { MakeArrFalesTrueWithId } from '../util/initArray';


const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 


 class Selection extends Component {

  constructor(props) {
      super(props);
      this.state = {
        onLoading: true,
        visible: false,
        dataProduct: props.dataProduct
      }
    }
 
  renderSize = (arrSize) => {
    return (arrSize.length > 1) ? (
      <View>
        <View style={styles.boxDriver}>
          <Text style={styles.styleText}>
            Size
          </Text>
        </View>

        <View  style={styles.boxSelects}>
        {
          arrSize.map((data, index) => {
                  return(
                     <View key={data.id}>
                        <TouchableHighlight
                          onPress={() => this.pressChoseSize(data.id)}
                          underlayColor="rgba(255,255,0,0.2)"
                        >
                          <View style={styles.boxSelect}>
                            <View style={styles.iconRound}>
                              {data.selection && <View style={styles.iconSelected}/>}
                            </View>
                            <View style={{flex:1, paddingHorizontal:20, flexDirection:"row", justifyContent:'space-between' }}>
                               <Text >
                                {data.name} 
                              </Text>
                              <Text >
                                {data.PlusPrice > 0 && `${RenderViewMoney(data.PlusPrice)} đ` } 
                              </Text>
                            </View>
                          </View>
                        </TouchableHighlight>
                        {arrSize.length - 1 > index && <View style={{backgroundColor:'#ddd',height:1}}/>}
                     </View>
                  )
                })
        }
        </View>
      </View>
    ) : null
  }

  renderTopping = (arrTopping) => {
    return (arrTopping.length > 1) ? (
      <View>
        <View style={styles.boxDriver}>
          <Text style={styles.styleText}>
            Topping
          </Text>
        </View>

        <View  style={styles.boxSelects}>
        {
          arrTopping.map((data, index) => {
                  return(
                     <View key={data.id}>
                        <TouchableHighlight
                          onPress={() => this.pressChoseTopping(data.id)}
                          underlayColor="rgba(255,255,0,0.2)"
                        >
                          <View style={styles.boxSelect}>
                            <View style={styles.iconSquare}>
                              {data.selection && <View style={styles.iconSelected2}/>}
                            </View>
                            <View style={{flex:1, paddingHorizontal:20, flexDirection:"row", justifyContent:'space-between' }}>
                               <Text >
                                {data.name} 
                              </Text>
                              <Text >
                                {RenderViewMoney(data.PlusPrice)} đ
                              </Text>
                            </View>
                          </View>
                        </TouchableHighlight>
                        {arrTopping.length - 1 > index && <View style={{backgroundColor:'#ddd',height:1}}/>}
                     </View>
                  )
                })
        }
        </View>
      </View>
    ) : null
  }
  pressChoseSize = (id) => {
    const {oderOption, dataProduct} = this.props;
    let arrayNew = [];
    dataProduct.arrSize.forEach(function(element) {
      if(element.selection){
        element.selection = false
      }
      arrayNew.push(element)
    })
    arrayNew.forEach(function(element) {
      if(element.id === id){
        element.selection = true
      }
    })
    // this.setState({
    //   arrSize: this.state.arrSize
    // })
    oderOption(dataProduct)
    return
  }

  pressChoseTopping = (id) => {
    const { dataProduct } = this.state;
    const { oderOption } = this.props;
    let arrTop = dataProduct.arrTopping;

      // for(let i in dataProduct.arrTopping){
      //   if(dataProduct.arrTopping[i].id === id && dataProduct.arrTopping[i].selected){
      //     dataProduct.arrTopping[i].selected = false
      //   }else if(dataProduct.arrTopping[i].id === id && !dataProduct.arrTopping[i].selected){
      //     dataProduct.arrTopping[i].selected = true
      //   }
      // }
      // let arrTop2 = MakeArrFalesTrueWithId(dataProduct,id)
      // console.log(arrTop2)
      arrTop.forEach(function(element) {
        if(element.id === id && element.selection){
          element.selection = false
        }else if(element.id === id && !element.selection){
          element.selection = true
        }
      })
      


      // dataProduct.arrTopping = arrTop;
      // this.setState({
      //   dataProduct: { "id":"1",
      //     "type":"Coffe",
      //     "image":"https://product.hstatic.net/1000075078/product/matcha_macchiato.jpg",
      //     "name":"Matcha Machiato",
      //     "Price": 25000,
      //     "loved": false,
      //     "arrSize":[{"id":11, "nameSize": "Loai L", "PlusPrice": 0, "selected":true},{"id":12, "nameSize": "Loai XL", "PlusPrice": 15000,"selected":false}],
      //     "arrTopping":[{"id":123, "nameTopping": "Extra foanm", "PlusPrice": 5000, "selected":true},{"id":345, "nameTopping": "Trân châu trắng'", "PlusPrice": 5000,"selected":false}],
      //     "description":"Uong deo no bung dc dau"}
      // })

      // log()

      oderOption(dataProduct)

      // getDataOder({
      //   size: this.state.arrSize,
      //   topping: this.state.arrToppings,
      // })
  

      return
  }
  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    console.log("dataSelection", this.props)
    const  { dataProduct } = this.state;
    return (
    <ScrollView style={styles.container}>
      <View
        style={{justifyContent:"flex-start"}}  
      >
        {this.renderSize(dataProduct.arrSize)}

        {this.renderTopping(dataProduct.arrTopping)}
        <View style={styles.boxDriver}>
          <Text style={styles.styleText}>
            Giới thiệu món
          </Text>
        </View>
        <View style={styles.boxDescription}>
          <Text>
            {dataProduct.description}
          </Text>
        </View>
      </View>
    </ScrollView>
      
    );
  }
}

Selection.defaultProps = {
  arrSize: [{id:123, nameSize: 'Loai L', PlusPrice: 5000, selected:true},{id:345, nameSize: 'Loai XL', PlusPrice: 15000,selected:false}],
  arrTopping: [{id:123, nameTopping: 'Extra foanm', PlusPrice: 5000, selected:false},{id:345, nameTopping: 'Trân châu trắng', PlusPrice: 5000,selected:false}],
  description:"Mon sieu ngon"
}

Selection.propTypes = {
  arrSize: PropTypes.array,
  arrTopping: PropTypes.array,
  description: PropTypes.string
};


const styles = StyleSheet.create({
 container:{
    maxHeight:heightDefalt/1.8,
  ////
 },
 boxDriver:{
  height:25,
  backgroundColor:'#E7E7E7',
  justifyContent:'center',
  paddingLeft:15,
  paddingVertical:17
 },
 styleText:{
  color: 'black',
  fontSize: 15,
  fontWeight: 'bold'
 },
 boxSelects:{
  borderWidth:1,
  borderColor:"#ddd",

  paddingHorizontal:15,
 },
 boxSelect:{
  paddingVertical:10,
  alignItems: 'center',
  flexDirection:"row"
 },
 iconRound:{
  borderColor:COLOR_HIGTHPERLINK,
  borderWidth:1,
  padding:1,
  borderRadius:30,
  overflow: 'hidden',
  height:20,
  width:20,
 },
 iconSquare:{
  borderColor:COLOR_HIGTHPERLINK,
  borderWidth:1,
  padding:1,
  overflow: 'hidden',
  height:20,
  width:20,
 },
 iconSelected:{
  backgroundColor:COLOR_HIGTHPERLINK,
  width:"100%",
  height:"100%",
  borderRadius:20,
  overflow: 'hidden',
 },
 iconSelected2:{
  backgroundColor:COLOR_HIGTHPERLINK,
  width:"100%",
  height:"100%",
  overflow: 'hidden',
 },
 boxDescription:{
  padding:15,
  borderWidth:1,
  borderColor:"#ddd",

 }
});

export default Selection;