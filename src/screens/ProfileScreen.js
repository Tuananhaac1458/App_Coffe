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
  Animated,
  StatusBar,
  TouchableHighlight,
  Alert,
  BackHandler,
  PermissionsAndroid,
  Platform
} from 'react-native';

import Loading from '../components/Loading';

import Modal, { SlideAnimation } from 'react-native-modals';
import Oderdetail from '../containers/Oderdetail'
import { FuilterLoop, RemoveObjectonArrayWithObjectKey } from '../util/initArray';
import AddressCustomer from '../containers/AddressCustomer';

import ApiClient from '../helpers/ApiClient';

import Iconnn from 'react-native-vector-icons/AntDesign'
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons'


const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 
const Realm = require('realm');




export default class ProfileScreen extends Component {
	constructor(props) {
	    super(props);
	    this.sound = null;
	    this.state = { 
	      Loading: true,
    		visible: false,
    		handleBackPress: false,
        realm: []
    	}

  }

    componentDidMount() {


  }

    componentWillUnmount() {
  
  }
	render(){
    const ApiClient2 = new ApiClient();
    const xx =  {
          "id":10,
          "type":["Coffe"],
          "image":"https://product.hstatic.net/1000075078/product/coldbrewmilk_09db086189ce43d5bb78172613af57dc_master.jpg",
          "name":"COLD BREW SỮA TƯƠI",
          "price": 50000,
          "loved": false,
          "arrSize":[],
          "arrTopping":[],
          "discription":"Thanh mát và cân bằng với hương vị cà phê nguyên bản 100% Arabica Cầu Đất cùng sữa tươi thơm béo cho từng ngụm tròn vị, hấp dẫn."
      }
    const info = this.state.realm
    return(
      <View style={{marginTop:15,position:"relative",flex:1,}}>
         <View style={{ paddingHorizontal:15,alignItems:'center',flexDirection: 'row',height:56, width:widthDefalt, backgroundColor:'white'}}>
            <Iconnn 
                  name = {"user"}
                  size ={30} 
                  color= {'black'}
                />      
             <Text style={{marginLeft:15}}>
                Thông tin tài khoản
             </Text>   
        </View> 

          <View style={{ paddingHorizontal:15,alignItems:'center',flexDirection: 'row',height:56, width:widthDefalt, backgroundColor:'white'}}>
            <Iconn 
                  name = {"playlist-music-outline"}
                  size ={30} 
                  color= {'black'}
                />      
             <Text style={{marginLeft:15}}>
                Nhạc đang phát
             </Text>   
        </View> 

          <View style={{ paddingHorizontal:15,alignItems:'center',flexDirection: 'row',height:56, width:widthDefalt, backgroundColor:'white'}}>
            <Iconn 
                  name = {"book-outline"}
                  size ={30} 
                  color= {'black'}
                />      
             <Text style={{marginLeft:15}}>
                Lịch sử
             </Text>   
        </View> 

          <View style={{ paddingHorizontal:15,alignItems:'center',flexDirection: 'row',height:56, width:widthDefalt, backgroundColor:'white'}}>
            <Iconn 
                  name = {"lifebuoy"}
                  size ={30} 
                  color= {'black'}
                />      
             <Text style={{marginLeft:15}}>
                Giúp đỡ
             </Text>   
        </View> 


         <View style={{ paddingHorizontal:15,alignItems:'center',flexDirection: 'row',height:56, width:widthDefalt, backgroundColor:'white'}}>
            <Iconn 
                  name = {"settings-outline"}
                  size ={30} 
                  color= {'black'}
                />      
             <Text style={{marginLeft:15}}>
                Cài đặt
             </Text>   
        </View>

        <View style={{position:"absolute",bottom:5}}>
          <Text style={{marginLeft:15, color:'gray'}}>
                Americano V.0.1
             </Text>
        </View> 
      </View>
    )
    return (
      <View >
          {this.state.realm.map((e, i) => {
            return(
            <Text key={e.id}>
              {e.name}{e.id}
            </Text>

            )
          })}
        <Button
          title={'add'}
          onPress={() => {
            ApiClient2.AddProductOderedToLocal(xx)
          }}
        />

         <Button
          title={'Getall'}
          onPress={() => {
            let a = ApiClient2.GetAllProductOdered()
            console.log('Getall=====>',a)
            this.setState({
              realm : a
            })
          }}
        />

         <Button
          title={'Remove'}
          onPress={() => {
            ApiClient2.RemoveProductOderedToLocal(xx,'id')
          }}
        />
      </View>
    )
	}

}

