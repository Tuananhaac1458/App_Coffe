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
  RefreshControl,
  StyleSheet,
  StatusBar,
  
} from 'react-native';

import NotificationNetwork from '../components/NotificationNetwork';
////////////////////////// Import Redux ////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pageActions from '../redux/actions/pagelist';
////////////////////////////////////////////////////////////////////

////////////////////////////// Import Style //////////////// 
import { BACK_GROUND_DEFAULT, COLOR_DRIVER } from '../util/ValueString';
import { FuilterLoop, MakeArrayProductToTpye } from '../util/initArray'

////////////////////////////////////////////////////////////////////
import AddressCustomer from '../containers/AddressCustomer';

import Filter from '../containers/Filter'
import ScrollViewOder from '../containers/ScrollViewOder'

const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 
const dataProduct = [  
      {
          "id":7,
          "type":["Best Sell", "Coffe"],
          "image":"https://product.hstatic.net/1000075078/product/coldbrew_raspberry_ac577fc483484f0cb4e35efe6bf14426_master.png",
          "name":"COLD BREW PHÚC BỒN TỬ",
          "Price": 50000,
          "love": false,
          "odered":false,
          "arrSize":[],
          "arrTopping":[],
          "description":"Vị chua ngọt của trái phúc bồn tử, làm dậy lên hương vị trái cây tự nhiên vốn sẵn có trong hạt cà phê, hòa quyện thêm vị đăng đắng, ngọt dịu nhẹ nhàng của Cold Brew để mang đến một cách thưởng thức cà phê hoàn toàn mới, vừa thơm lừng hương cà phê quen thuộc, vừa nhẹ nhàng và thanh mát bởi hương trái cây đầy thú vị."
      },
      {
          "id":1,
          "type":["Coffe"],
          "image":"https://product.hstatic.net/1000075078/product/matcha_macchiato.jpg",
          "name":"Matcha Machiato",
          "Price": 25000,
          "love": false,
          "odered":false,
          "arrSize":[{"id":11, "name": "Loai L", "PlusPrice": 0, "selection":true},{"id":12, "name": "Loai XL", "PlusPrice": 15000,"selection":false}],
          "arrTopping":[{"id":123, "name": "Extra foanm", "PlusPrice": 5000, "selection":false},{"id":345, "name": "Trân châu trắng'", "PlusPrice": 5000,"selection":false}],
          "description":"Uong deo no bung dc dau"
      },
        {
          "id":2,
          "type":["Siro"],
          "image":"https://product.hstatic.net/1000075078/product/blueberry_smoothie_master.jpg",
          "name":"SINH TỐ VIỆT QUẤT",
          "Price": 59000,
          "love": false,
          "odered":false,
          "arrSize":[{"id":11, "name": "Loai L", "PlusPrice": 0, "selection":true},{"id":12, "name": "Loai XL", "PlusPrice": 15000,"selection":false},{"id":13, "name": "Loai XXL", "PlusPrice": 20000, "selection":false}],
          "arrTopping":[{"id":21, "name": "Trân châu trắng'", "PlusPrice": 5000,"selection":false},{"id":22, "name": "Trân châu trắng'", "PlusPrice": 5000,"selection":false},{"id":23, "name": "Trân châu trắng'", "PlusPrice": 5000,"selection":false},{"id":24, "name": "Thêm VIỆT QUẤT ", "PlusPrice": 5000, "selection":false},{"id":1232, "name": "Thêm đá", "PlusPrice": 5000, "selection":false},],
          "description":"Uong deo no bung dc dau"
      },
       {
          "id":3,
          "type": ["Coffe"],
          "image":"https://product.hstatic.net/1000075078/product/white_vnese_coffee_9968c1184d7f4634a9bb9fce7b5ff313_master.jpg",
          "name":"Bạc Sỉu",
          "Price": 29000,
          "love": false,
          "odered":false,
          "arrSize":[{"id":11, "name": "Loai L", "PlusPrice": 0, "selection":true},{"id":12, "name": "Loai XL", "PlusPrice": 15000,"selection":false}],
          "arrTopping":[],
          "description":"Theo chân những người gốc Hoa đến định cư tại Sài Gòn, Bạc sỉu là cách gọi tắt của 'Bạc tẩy sỉu phé' trong tiếng Quảng Đông, chính là: Ly sữa trắng kèm một chút cà phê."
      },
       {
          "id":4,
          "type":["Best Sell", "Milk"],
          "image":"https://product.hstatic.net/1000075078/product/cappuccino_master.jpg",
          "name":"CAPPUCINNO",
          "Price": 45000,
          "love": false,
          "odered":false,
          "arrSize":[],
          "arrTopping":[],
          "description":"Cappuccino được gọi vui là thức uống một-phần-ba - 1/3 Espresso, 1/3 Sữa nóng, 1/3 Foam"
      },
      {
          "id":5,
          "type":["Coffe"],
          "image":"https://product.hstatic.net/1000075078/product/colbrewcamsa_c2a45ec3fea94e248fd1b4f71abebe09_master.jpg",
          "name":"COLD BREW CAM SẢ",
          "Price": 45000,
          "love": false,
          "odered":false,
          "arrSize":[],
          "arrTopping":[],
          "description":"Tinh tế trong hương - sắc - vị"
      },
      {
          "id":6,
          "type":["Coffe"],
          "image":"https://product.hstatic.net/1000075078/product/coldbrewmilk_09db086189ce43d5bb78172613af57dc_master.jpg",
          "name":"COLD BREW SỮA TƯƠI",
          "Price": 50000,
          "love": false,
          "odered":false,
          "arrSize":[],
          "arrTopping":[],
          "description":"Thanh mát và cân bằng với hương vị cà phê nguyên bản 100% Arabica Cầu Đất cùng sữa tươi thơm béo cho từng ngụm tròn vị, hấp dẫn."
      },
      
      {
          "id":8,
          "type":["Siro"],
          "image":"https://product.hstatic.net/1000075078/product/mango_smoothie_master.jpg",
          "name":"SINH TỐ CAM XOÀI",
          "Price": 59000,
          "love": false,
          "odered":false,
          "arrSize":[{"id":11, "name": "Loai L", "PlusPrice": 0, "selection":true},{"id":12, "name": "Loai XL", "PlusPrice": 15000,"selection":false},{"id":13, "name": "Loai XXL", "PlusPrice": 20000, "selection":false}],
          "arrTopping":[{"id":21, "name": "Trân châu trắng'", "PlusPrice": 5000,"selection":false},{"id":22, "name": "Trân châu trắng'", "PlusPrice": 5000,"selection":false},{"id":23, "name": "Trân châu trắng'", "PlusPrice": 5000,"selection":false},{"id":24, "name": "Thêm VIỆT QUẤT ", "PlusPrice": 5000, "selection":false},{"id":1232, "name": "Thêm đá", "PlusPrice": 5000, "selection":false},],
          "description":"Vị mứt cam xoài hòa trộn độc đáo với sữa chua, cho cảm giác chua ngọt rất sướng. Điểm nhấn là những mẩu bánh cookie giòn tan giúp sự thưởng thức thêm thú vị."
      },
      {
          "id":9,
          "type":["Cake"],
          "image":"https://product.hstatic.net/1000075078/product/mango_smoothie_master.jpg",
          "name":"BÁNH BÔNG LAN TRỨNG MUỐI",
          "Price": 29000,
          "love": false,
          "odered":false,
          "arrSize":[],
          "arrTopping":[],
          "description":"Vị mứt cam xoài hòa trộn độc đáo với sữa chua, cho cảm giác chua ngọt rất sướng. Điểm nhấn là những mẩu bánh cookie giòn tan giúp sự thưởng thức thêm thú vị."
      },
      {
          "id":10,
          "type":["Cake"],
          "image":"https://product.hstatic.net/1000075078/product/choco_1x1_4faf8c80e6604cad88ce30528e2bd409_large.jpg",
          "name":"BÁNH CHOCOLATE",
          "Price": 29000,
          "love": false,
          "odered":false,
          "arrSize":[],
          "arrTopping":[],
          "description":"Vị mứt cam xoài hòa trộn độc đáo với sữa chua, cho cảm giác chua ngọt rất sướng. Điểm nhấn là những mẩu bánh cookie giòn tan giúp sự thưởng thức thêm thú vị."
      },
      {
          "id":11,
          "type":["Cake"],
          "image":"https://product.hstatic.net/1000075078/product/sungtrau_1x1_0e9a3e2590794cb9a6ff7ad9d9562c25_large.jpg",
          "name":"BÁNH CROISSANT BƠ TỎI",
          "Price": 29000,
          "love": false,
          "odered":false,
          "arrSize":[],
          "arrTopping":[],
          "description":"Vị mứt cam xoài hòa trộn độc đáo với sữa chua, cho cảm giác chua ngọt rất sướng. Điểm nhấn là những mẩu bánh cookie giòn tan giúp sự thưởng thức thêm thú vị."
      },
      {
          "id":12,
          "type":["Cake"],
          "image":"https://product.hstatic.net/1000075078/product/gau_1x1_8b308db3a67a47688ff0d69a8c5615bf_large.jpg",
          "name":"BÁNH GẤU CHOCOLATE",
          "Price": 39000,
          "love": false,
          "odered":false,
          "arrSize":[],
          "arrTopping":[],
          "description":"Vị mứt cam xoài hòa trộn độc đáo với sữa chua, cho cảm giác chua ngọt rất sướng. Điểm nhấn là những mẩu bánh cookie giòn tan giúp sự thưởng thức thêm thú vị."
      },
      {
          "id":13,
          "type":["Cake"],
          "image":"https://product.hstatic.net/1000075078/product/matcha_178bdeeb1f9b47ea9f782048eb145f49_large.jpg",
          "name":"BÁNH MATCHA",
          "Price": 29000,
          "love": false,
          "odered":false,
          "arrSize":[],
          "arrTopping":[],
          "description":"Vị mứt cam xoài hòa trộn độc đáo với sữa chua, cho cảm giác chua ngọt rất sướng. Điểm nhấn là những mẩu bánh cookie giòn tan giúp sự thưởng thức thêm thú vị."
      },
  ]

class StoreScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  pageList:[],
      dataProductStore: dataProduct,
		}
	}


  setDataToFuitler = (type) => {

    if(type === undefined){
      return
    }
    if(type === 'loved'){
      this.setState({
        dataProductStore:this.props.dataProductLove
      })
    }
    if(type === 'all'){
      this.setState({
        dataProductStore:dataProduct
      })
    }
    if(type === 'odered'){
      this.setState({
        dataProductStore:[]
      })
    }
  }
   
	render(){
    const dataProductStore = MakeArrayProductToTpye(FuilterLoop(this.state.dataProductStore),this.state.dataProductStore)
    console.log("dataProductStore",dataProductStore)
		return(
      <View style={styles.container}>
        <SafeAreaView>
            <StatusBar 
              barStyle="dark-content" 
              backgroundColor= 'white'
              translucent={false}
            />

            <NotificationNetwork
              networkInfo = {this.props.gateProps.networkInfo}
            />

            <AddressCustomer/>
            
            <View style={styles.driver}>
            </View>

            <Filter
              setDataToFuitler = {this.setDataToFuitler}
            />

            <View style={styles.driver}>
            </View>
            
        </SafeAreaView> 
            <View style={{flex:1}}>
                <ScrollViewOder
                  dataProductStore={dataProductStore}
                  navigation={this.props.navigation}
                />
            </View>
      </View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  driver:{
    backgroundColor:COLOR_DRIVER,
    height: 1,
    width: widthDefalt
  }
});



const mapStateToProps = state => ({
  gateProps: state.gateProps,
  dataProductLove: state.dataProductLove,

});

const ActionCreators = Object.assign(
  {},
  pageActions,
)

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(ActionCreators, dispatch),

// });

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: bindActionCreators(ActionCreators, dispatch),  
  }
};

export default connect(state => mapStateToProps, mapDispatchToProps)(StoreScreen);