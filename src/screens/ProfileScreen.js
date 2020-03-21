import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ImageBackground,
  Animated,
  TouchableHighlight,
  Alert,
  BackHandler,
  PermissionsAndroid,
  Platform,
  ActivityIndicator
} from 'react-native';
import {  Image,Avatar, ListItem } from 'react-native-elements';

import Loading from '../components/Loading';

import Modal, { SlideAnimation } from 'react-native-modals';
import Iconnn from 'react-native-vector-icons/AntDesign'
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons'
 
const BG_IMAGE = require('../img/bg_screen4.jpg');


const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 
const Realm = require('realm');

const window = Dimensions.get('window');

const list = [
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
]

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

  onPressProject = (type) => {
    const { navigation } = this.props; 
    if(type === undefined){
      return
    }
    if(type === 'login'){
       navigation.navigate('LoginScreen')
    }
    if (type === 'setting') {
       navigation.navigate('ModalProfile',{type: 'setting'})
    }
    if(type === 'aboutus'){
       navigation.navigate('ModalProfile',{type: 'aboutus'})
    }
    if(type === 'help'){
       navigation.navigate('ModalProfile',{type: 'help'})
    }
    if(type === 'cart'){
       navigation.navigate('ModalProfile',{type: 'cart'})
    }
    if(type === 'ttcn'){
       navigation.navigate('ModalProfile',{type: 'ttcn'})
    }
    return
  }
  render(){
    return(
      <ScrollView>
      <View style={{position:"relative",flex:1,}}>

        {
          (this.state.isLogin) ? 
          (
            <View style={{width:widthDefalt, height:300,  justifyContent: 'center', alignItems:'center', backgroundColor:'gray' }}>
              <View style={{width:200, height:100,  justifyContent: 'center'}}>
                <Image
                  source={{ uri: 'https://miahome.vn/media/logo/default/miahome-log.png' }}
                  style={{ width: 200, height: 100 }}
                  resizeMode="stretch"
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
              <Text style={{marginTop:10,fontSize: 16,color:'white' }}>
                    Chuyên cung cấp tranh chất lượng cao
               </Text>  
            </View>
          ) : 
          (
            <ImageBackground style={{width:widthDefalt, height:300,  justifyContent: 'center', alignItems:'center'}} source={BG_IMAGE}>
              <View style={{width:200, height:100,  justifyContent: 'center',alignItems:'center', }}>
               <Avatar
                size="xlarge"
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                }}
                rounded
                onEditPress={() => console.log("Work2s!")}
                title="CR"
                activeOpacity={0.7}
                showEditButton
              />
              </View>
            </ImageBackground>
          )

        }        
        <TouchableHighlight
          onPress={() => this.onPressProject('ttcn')}
          underlayColor={'transparent'}
        >
         <View style={{ paddingHorizontal:15,alignItems:'center',flexDirection: 'row',height:56, width:widthDefalt, backgroundColor:'white'}}>
            <Iconn 
              name = {"account-outline"}
              size ={30} 
              color= {'black'}
            />      
             <Text style={{marginLeft:15}}>
                Thông tin tài khoản
             </Text>   
        </View> 
        </TouchableHighlight>
              {/*/

        <TouchableHighlight
          underlayColor={'transparent'}
        >
          <View style={{ paddingHorizontal:15,alignItems:'center',flexDirection: 'row',height:56, width:widthDefalt, backgroundColor:'white'}}>
              <View style={{ position:'absolute', flex:1, width:widthDefalt, marginLeft:15}}>
                
                <Cart/>
              
              </View>      
             <Text style={{marginLeft:45}}>
                Cart
             </Text>   
        </View> 
        </TouchableHighlight>
             /*/ }  

         <TouchableHighlight
          onPress={() => this.onPressProject('help')}
          underlayColor={'transparent'}
         >
          <View style={{ paddingHorizontal:15,alignItems:'center',flexDirection: 'row',height:56, width:widthDefalt, backgroundColor:'white'}}>
            <Iconn 
                  name = {"lifebuoy"}
                  size ={30} 
                  color= {'black'}
                />      
             <Text style={{marginLeft:15}}>
                Help!
             </Text>   
        </View> 
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => this.onPressProject('setting')}
          underlayColor={'transparent'}
        >
         <View style={{ paddingHorizontal:15,alignItems:'center',flexDirection: 'row',height:56, width:widthDefalt, backgroundColor:'white'}}>
            <Iconn 
                  name = {"settings-outline"}
                  size ={30} 
                  color= {'black'}
                />      
             <Text style={{marginLeft:15}}>
                Setting
             </Text>   
        </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => this.onPressProject('aboutus')}
          underlayColor={'transparent'}
        >
         <View style={{ paddingHorizontal:15,alignItems:'center',flexDirection: 'row',height:56, width:widthDefalt, backgroundColor:'white'}}>
            <Iconn 
                  name = {"information-outline"}
                  size ={30} 
                  color= {'black'}
                />      
             <Text style={{marginLeft:15}}>
                About us
             </Text>   
        </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => this.onPressProject('login')}
          underlayColor={'transparent'}
        >
         <View style={{ paddingHorizontal:15,alignItems:'center',flexDirection: 'row',height:56, width:widthDefalt, backgroundColor:'white'}}>
            <Iconn 
                  name = {(this.state.isLogin) ? "login" : "logout"}
                  size ={30} 
                  color= {'black'}
                />      
             <Text style={{marginLeft:15}}>
                {(this.state.isLogin) ? 'Login' : 'Logout'}
             </Text>   
        </View>
        </TouchableHighlight>



        <View style={{position:"absolute",bottom:0, width:widthDefalt, alignItems:'flex-end', paddingRight:10}}>
          <Text style={{marginLeft:15, color:'gray'}}>
                Americano V.0.1
             </Text>
        </View> 
      </View>
      </ScrollView>
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

