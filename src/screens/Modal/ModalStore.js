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
  TouchableHighlight,
  ToastAndroid,
  TextInput,
  PermissionsAndroid,
  FlatList,
  BackHandler,
  StatusBar
} from 'react-native';
const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 

import Iconnn from 'react-native-vector-icons/EvilIcons'
import Iconn from 'react-native-vector-icons/SimpleLineIcons'
import Icon from 'react-native-vector-icons/AntDesign'
import Loading from '../../components/Loading'
import ModalContainer from '../../containers/ModalContainer';

import ButtonBuy from '../../containers/ButtonBuy';

import Contacts from 'react-native-contacts';

import HeaderBar from '../../containers/HeaderBar';

import  { RenderViewMoney } from '../../util/init';
import RenderRowProduct from '../../components/renderRowProduct'
////////////////////////// Import Redux ////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OderDetailAction from '../../redux/actions/OderDetail';
/////////////////////////////////////////////////////////

import  { BACK_GROUND_DEFAULT, COLOR_HIGTHPERLINK } from '../../util/ValueString';

class ModalStore extends Component {
  constructor(props) {
    super(props);
      this.editablSearchContacts = false;
      this.state = {
        setVisiModalContactList: false,
        valueNumberPhone: '',
        valueUserGive:'',
        noteAddress:'',
        noteAttention:'',
        onLoadSuccres: true,
        payDelivery : 0, 
        textOnSearchContact: '',
        contacts:[],
      }
  }
 static navigationOptions = {
    // title: 'Homeesd',
    // tabBarVisible: false
      // tabBarVisible: false,
  };

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.oderDetail.length < 1){
      this.props.navigation.goBack()
      return false
    }
    return true
  }

  componentDidUpdate(prevProps, prevState) {
  }

    ///// view modal contacts ///////////
  setVisiModalContactList = (phoneNumber) => {
    if(phoneNumber !== undefined){
      this.setState({
        setVisiModalContactList: !this.state.setVisiModalContactList,
        valueNumberPhone: phoneNumber
      })  
      return
    }  
    this.setState({
      setVisiModalContactList: !this.state.setVisiModalContactList
    })    
  }

  //// render total money to arr ///////////////
  renderMoney = (oderDetail) => {
    let money = 0;
     if(oderDetail === undefined || !Array.isArray(oderDetail)){
      return money
    }
    if(oderDetail.length < 1){
      return 0 
    }
    oderDetail.forEach((element) => {
          let RealPrince = element.Price; 
          element.arrSize.forEach(elementchid => {
            if(elementchid.selection === false){
                return
            }
              RealPrince += elementchid.PlusPrice
          });
          element.arrTopping.forEach(elementchid => {
            if(elementchid.selection === false){
              return
            }
            RealPrince += elementchid.PlusPrice
          });
          money += RealPrince*element.amount;
    })
    return money
  }

  ////// request permistion contacts ////////////////
  requestContactsPermission  = async () =>  {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message:
            'Americano App cần có quyền truy cập danh bạ của bạn.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.editablSearchContacts = true
          this.loadContacts();
      } else {
        this.editablSearchContacts = false
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  
    /// get alll contact ///////
  loadContacts = () => {
    Contacts.getAll((err, contacts) => {
      if (err === "denied") {
        console.warn("Permission to access contacts was denied");
      } else {
        this.setState({ contacts:contacts, textOnSearchContact:"" });
      }
    });
  }

    ///// render list contact ///////////////
  renderListContact = () => {
    console.log('contacts====>',this.state.contacts)
    const DATA = this.state.contacts;
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
             <StatusBar 
                barStyle="dark-content" 
                backgroundColor= 'white'
                translucent={false}
              />
        <View style={{height: 60,justifyContent:'center',backgroundColor: '#E7E7E7', alignItems:'center'}}>
           <View style={{ backgroundColor: 'white', height: 40, width: "90%", borderRadius:30 ,borderColor: 'gray', borderWidth: 1,alignItems:'flex-end', justifyContent:'center', overflow: 'hidden', }}>
              <TextInput
                style={{backgroundColor: 'white',height: 40, width:'96%', }}
                placeholder="Tìm tên hoặc số điện thoại"
                onChangeText={text => this.onChangeTextForSearchContact(text)}
                value={this.state.textOnSearchContact}
                editable={(this.editablSearchContacts) ? true : false}
              />
           </View>
        </View>

        <View style={{ backgroundColor: 'white', paddingBottom: 60}}>
          <FlatList
            data={DATA}
            renderItem={({item}) =>  
              this.Item(item)
            }  
            keyExtractor={item => item.recordID}
          />
           
        </View>
      </View> 
    )
  }




  /// Item list contact//////////////
  Item = (obj) => {
    const numberarr = obj.phoneNumbers[0]
    return (obj !== undefined && numberarr !== undefined ) && (
      <TouchableHighlight
        underlayColor="rgba(236, 225, 225,0.5)"
        onPress={() => {
          this.setVisiModalContactList(numberarr.number)
        }}

      >
        <View style={{borderTopWidth:1, borderColor:'gray',padding:15, }}>
          <Text >{obj.displayName}</Text>
          <Text >{(numberarr !== undefined) && numberarr.number}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  //// sear on list contact /////////
  search = (text) => {
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === "" || text === null) {
      this.loadContacts();

    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
        this.setState({
          contacts:contacts,
          textOnSearchContact:text 
        });
      });
    }else {
      Contacts.getContactsMatchingString(text, (err, contacts) => {
        this.setState({ 
          contacts:contacts,
          textOnSearchContact:text });
      });
    }
  }

  ///// on text change in text search contact /////////////
  onChangeTextForSearchContact = (text) => {
    this.search(text)
  }


  renderInvoice = (oderDetail) => {
    let totalMoney = 0;
    if(oderDetail.length > 0){
      totalMoney = this.renderMoney(oderDetail);
    }
    return(
      <ScrollView >
      <View style={styles.containerModal}>
        <View style={styles.boxDriver}> 
          <Text style={styles.textModal}>
            Thông tin người nhận
          </Text>
        </View>
        <View style={styles.boxUserGive}> 
          <View style={{flexDirection:'row', justifyContent:"space-between", backgroundColor: 'white'}}> 
            <View style={{flexDirection:'row',flex:1, alignItems:'center'}}>
              <Iconnn 
                name = {"user"}
                size ={40} 
                color = {'gray'}
              /> 
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1,flex:1, }}
                placeholder="Your name"
                value={this.state.valueUserGive}
                onChangeText={(valueUserGive) => this.setState({valueUserGive})}
              />
            </View>
            <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
              <Iconn 
                name = {"phone"}
                size ={25} 
                color = {'gray'}
              />
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1,flex:1, }}
                placeholder="Phone number"
                keyboardType = 'numeric'
                value={this.state.valueNumberPhone}
                onChangeText={(valueNumberPhone) => this.setState({valueNumberPhone})}
              />
              <Icon 
                name = {"contacts"}
                size ={25} 
                color = {'gray'}
                onPress = {() => {
                  this.setVisiModalContactList();
                  this.requestContactsPermission()

                }}
              /> 
            </View>
          </View>

          <View style={{flexDirection:'row', alignItems:'center', marginVertical: 10}}>
            <View style={{height:80,width:80}}>
             <Loading
                onLoading = {this.state.onLoadSuccres}
              >
              <Image
                source={{uri:'https://images.careerbuilder.vn/content/news/20170720/google-maps_1500487328.png'}}
                style={{width:80,height:80}}
                onLoad={() => this.setState({onLoadSuccres: false})}
              />
              </Loading>
            </View>

            <View style={{marginLeft:10,flexDirection:'column',flex:1}}>
              <View style={{flex:1,flexDirection:'row',justifyContent:"space-between"}}>
                <Text>
                  Give people address
                </Text>
                <Text style={{  
                    fontSize: 20,
                    fontWeight: 'bold',
                    color:COLOR_HIGTHPERLINK,
                    marginLeft:10,}}
                  >
                  THAY ĐỔI
                </Text>
              </View>

              <View style={{flex:1,flexDirection:'row',}}>
                <Iconn 
                  name = {"note"}
                  size ={25} 
                  color = {'gray'}
                /> 
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1,flex:1, }}
                  placeholder="Thêm ghi chú cho tài xế"
                  value={this.state.noteAddress}
                  onChangeText={(noteAddress) => this.setState({noteAddress})}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.boxDriver}> 
          <Text style={styles.textModal}>
            Thông tin đơn hàng 
          </Text>
        </View>

        {
             <View style={styles.boxOderDetail}>
              { 
                (Array.isArray(oderDetail)) && (
                  oderDetail.map((product, index) => {
                  console.log('asd')
                  return(
                      <RenderRowProduct
                        key={index}
                        product = { product }
                        setOderDetail = {this.props.dispatch.setOderDetail}
                        setLoveProduct = {this.props.dispatch.setLoveProduct}
                      />
                    )    
                  })   
                )
              }
               <View style={{flexDirection:'row',}}>
                <Iconn 
                  name = {"note"}
                  size ={25} 
                  color = {'gray'}
                /> 
                <TextInput
                  style={{ height: 40, flex:1, }}
                  placeholder="Ghi chú đặc biệt"
                  value={this.state.noteAttention}
                  onChangeText={(noteAttention) => this.setState({noteAttention})}
                />
              </View>
            </View>
        }
       
        

        <View style={styles.boxPayment}>
          <View style={{ marginHorizontal:15,justifyContent:'center', }}>
            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginVertical:10,}}>
              <Text>
                Tạm tính 
              </Text>
              <Text>
                 {RenderViewMoney(totalMoney)} đ  
              </Text>
              
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', marginVertical:10}}>
              <Text>
                Phí vận chuyển 
              </Text>
              <Text>
                  Miễn Phí
              </Text>
            </View>
          </View>  

          <View style={{ borderTopWidth:1,borderColor:'gray'}}>
            <View style={{marginVertical:15,marginHorizontal:15,flexDirection:'row',justifyContent:'space-between',}}>
              <Text>
                Tổng
              </Text>
              <Text style={{fontWeight:'bold',fontSize:16}}>
                {RenderViewMoney(totalMoney + this.state.payDelivery)} đ
              </Text>
            </View>
            
          </View>

        </View>
     
          <ModalContainer
            setVisiModal = {this.setVisiModalContactList}
            visible = {this.state.setVisiModalContactList}
            dataRender={{dataHeader:{'title': 'Danh bạ',typeArrow:'close'},}}
            content= { this.renderListContact }
          />

      </View>
      </ScrollView>
    )
  }





  render(){
    const { oderDetail } = this.props;
    console.log('oderDetail=>>>>',oderDetail)
    let totalMoney = 0;
    if(oderDetail.length > 0){
      totalMoney = this.renderMoney(oderDetail);
    }
      return(
        <View style={ styles.container}>
          <HeaderBar 
              functionArrowleft={this.props.navigation.goBack}
              title={'Giỏ hàng của bạn'}  
              onLoading={false}
              typeArrow = {'close'}
          />
          {
              this.renderInvoice(oderDetail)
          }

          <ButtonBuy
            money={RenderViewMoney(totalMoney)}
          />
        </View>
      )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
    ////////////////////

  },
  containerModal:{
    flex:1,
    backgroundColor:'white'
  },
  boxView:{
    backgroundColor:COLOR_HIGTHPERLINK,
    flex:1,
    height:"100%",
    width:"96%",
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'space-between',
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1.5,
    marginLeft: 15,
    marginRight: 15,
    paddingHorizontal:"2%"
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
  },
  boxDriver:{
    height:25,
    backgroundColor:'#E7E7E7',
    justifyContent:'center',
    paddingLeft:15,
    paddingVertical:17
 },
 textModal:{
  fontWeight: 'bold',
 },
 boxUserGive:{
  padding: 15
 },
 boxOderDetail:{
  padding: 15,
  borderColor: 'gray', 
  borderBottomWidth: 1,

 },
 boxPayment:{

 },
});


const mapStateToProps = (state) => {
    return{
      oderDetail: state.oderDetail
    }
};

const ActionCreators = Object.assign(
  {},
  OderDetailAction,
)

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(ActionCreators, dispatch),
// });

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: bindActionCreators(ActionCreators, dispatch),  
  }
};

export default connect(state => mapStateToProps, mapDispatchToProps)(ModalStore);