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
  TextInput,
  PermissionsAndroid,
  FlatList,
  BackHandler
} from 'react-native';
import { PropTypes } from 'prop-types';
import ModalContainer from './ModalContainer';
import  { RenderViewMoney } from '../util/init';
//////////////////////////////

////////////////////////// Import Redux ////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OderDetailAction from '../redux/actions/OderDetail';
/////////////////////////////////////////////////////////
import Iconnn from 'react-native-vector-icons/EvilIcons'
//////////////////////////////////////////////////////

import  { BACK_GROUND_DEFAULT, COLOR_HIGTHPERLINK } from '../util/ValueString';

const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 



class Invoice extends Component {
  constructor(props) {
    super(props);
      this.editablSearchContacts = false;
     
  }
  
  //// Render so amount tu arr ////////////
  renderAmount = (oderDetail) => {
    console.log("oderDetail===>",oderDetail)
    if(oderDetail === undefined || !Array.isArray(oderDetail) ){
      return 0
    }
    if(oderDetail.length < 1){
      return 0 
    }
    let amount = 0;
    oderDetail.forEach((element) => {
      amount += element.amount
    })
    return amount;
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
            if(elementchid.selected === false){
                return
            }
              RealPrince += elementchid.PlusPrice
          });
          element.arrTopping.forEach(elementchid => {
            if(elementchid.selected === false){
              return
            }
            RealPrince += elementchid.PlusPrice
          });
          money += RealPrince*element.amount;
    })
    return money
  }

  ///// view modal invoice ///////////
  setVisiModal = () => {
    // this.setState({visible: !this.state.visible}) 
    this.props.navigation.navigate('ModalStore')   
  }

  render(){
    console.log("this.props odered==>", this.props)
    const { oderDetail } = this.props;
    return(oderDetail.length > 0) && (
      <View style={styles.container}>
        <TouchableHighlight
          onPress = {() => this.setVisiModal()}
          underlayColor="rgba(236, 225, 225,0.5)"
        >
           <View
            style={styles.boxView}
           >
            <View style={{
                position:'relative',
                paddingTop:5,
                flex:1, 
              }}>
              <Iconnn 
                name = {"cart"}
                size ={40} 
                color = {'white'}
              />
              <View style={{
                position:'absolute',
                backgroundColor:'white',
                height:20,
                width:20,
                borderRadius:15,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <Text style={{fontSize: 9,color:COLOR_HIGTHPERLINK}}>
                  {  this.renderAmount(oderDetail)  }
                </Text>
              </View>
             </View>


              <View style={{flex:1, alignItems:'center',}}>
                <Text
                style={{fontSize: 15,color:'white',fontWeight: 'bold',}}
               >
                Xem giỏ hàng
               </Text>
              </View>

               <View style={{flex:1, alignItems:'center', maxWidth:"30%"}}>
                <Text
                style={{fontSize: 15,color:'white',}}
               >
                {this.renderMoney(oderDetail)} đ  
               </Text>
              </View>
          
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}




Invoice.defaultProps = {


}

Invoice.propTypes = {
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width:widthDefalt,
    backgroundColor: 'rgba(255,255,0,0)',
    height:65,
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


// export default Invoice;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
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

export default connect(state => mapStateToProps, mapDispatchToProps)(Invoice);