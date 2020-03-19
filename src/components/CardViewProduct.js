
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

////////////////////////// Import Redux ////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OderDetailAction from '../redux/actions/OderDetail';
/////////////////////////////////////////////////////////

import Oderdetail from '../containers/Oderdetail'
import  { RenderViewMoney } from '../util/init';

const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 

 class CardViewProduct extends Component {
  constructor(props) {
      super(props);
      this.state = {
        visible: false,
        handleBackPress: false,
        dataProduct: props.dataProduct2
      }
      this.dataProduct = props.dataProduct2;
    }

   componentDidUpdate(){
    if(!this.state.visible){
        console.log("666===",this.state.visible)
        if(this.abc !== undefined){
          this.abc.remove()
        }
    }
    if(this.state.visible){
        console.log("555===",this.state.visible)
        this.handleBackPress()
    }
  }

  componentWillUnmount() {
    
  }

   handleBackPress = () => {
    if(this.state.visible){
        this.abc = BackHandler.addEventListener('hardwareBackPressss02', () => {
           if(!this.state.visible){
            return false
          }
          this.setState({
            visible: false
          })
          return true
      })
    }
  }

  closeModal = () => {
    console.log("33333===",this.state.visible)
    if(!this.state.visible){
      return
    }
    this.setState({
      visible: false
    })
  }
    
    
    componentWillUnmount() {
     // this.backHandler.remove()
      console.log("unomuldaaaaa==================")
    }


  renderModal = (dataProduct) => {
    
    return(
       <Modal
            visible={this.state.visible}
            onTouchOutside={() => this.closeModal()}
            modalAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
          >
              <Oderdetail
                dataProduct = {dataProduct}
                closeModal = {this.closeModal}
                setOderInvoice = {this.props.setOderDetail} 
                setLoveProduct = {this.props.dispatch.setLoveProduct}
                log = {this.props.log}
              />
          </Modal>
    )
  }
  render() {
      const { dataProduct } = this.state;
      console.log("dataProductCardview", dataProduct)

      // {this.props.dataProduct2.loved = }

      //     "id":"2",
      //     "image":"https://product.hstatic.net/1000075078/product/matcha_macchiato.jpg",
      //     "name":"SINH TỐ VIỆT QUẤT",
      //     "Price": 59000,
      //     "loved": false,
      //     "arrSize":[{"id":11, "nameSize": "Loai L", "PlusPrice": 0, "selected":true},{"id":12, "nameSize": "Loai XL", "PlusPrice": 15000,"selected":false},{"id":13, "nameSize": "Loai XXL", "PlusPrice": 20000, "selected":false}],
      //     "arrTopping":[{"id":21, "nameTopping": "Trân châu trắng'", "PlusPrice": 5000,"selected":false},{"id":22, "nameTopping": "Trân châu trắng'", "PlusPrice": 5000,"selected":false},{"id":23, "nameTopping": "Trân châu trắng'", "PlusPrice": 5000,"selected":false},{"id":24, "nameTopping": "Thêm VIỆT QUẤT ", "PlusPrice": 5000, "selected":false},{"id":1232, "nameTopping": "Thêm đá", "PlusPrice": 5000, "selected":false},],
      //     "description":"Uong deo no bung dc dau"
      // }
    
    return (
      <TouchableHighlight
        onPress={() => {
          this.setState({ visible: true });
        }}
        underlayColor="rgba(255,255,0,0)"
      >
        <View style={styles.container}>
          <View style={styles.boxCard}>
          <View style={styles.boxImage}>
            <Image
              style={{width:"99%",height:"100%",}}
              source={{uri: dataProduct.image}}
            />
            <View style={{position: 'absolute', right:12, top:15}}>
              {(dataProduct.love) &&  <Iconnn 
                color = {COLOR_HIGTHPERLINK }
                name = {"heart"}
                size ={20} 
              />}
            </View>
          </View>


          <View style={styles.boxName}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}
              numberOfLines={1}
            >
              {dataProduct.name} 
            </Text>

          </View>
          

          <View style={styles.boxDiriver}>
          </View>
          
          <View style={styles.boxOred}>
            <Text style={{color: 'black',fontSize: 15,fontWeight: 'bold',}}>
              {RenderViewMoney(dataProduct.Price)} đ
            </Text>
            <Iconnn 
                color = {COLOR_HIGTHPERLINK}
                name = {"pluscircleo"}
                size ={24} 
            />
          </View>
          </View>

        { this.renderModal(dataProduct)}

      </View>
      </TouchableHighlight>
    );
  }
}

CardViewProduct.defaultProps = {
  
}

CardViewProduct.propTypes = {
  
};


const styles = StyleSheet.create({
 container:{
  marginTop:10,
  alignItems: 'center',
  justifyContent: 'flex-start',
  ////
  paddingBottom:2
 },
 boxCard:{
  width:widthDefalt*45/100,
  height:270,
  borderRadius:10,
  overflow: 'hidden',

  //////////////
  borderColor: '#ddd',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.7,
  shadowRadius: 5,
  elevation: 2,
 },
 boxImage:{
  width:'100%',
  height:'60%',
  overflow:"hidden",
  alignItems: 'center',
  position: 'relative',
 },
 boxName:{
  width:'100%',
  height:'23.8%',
  paddingHorizontal:10,
  paddingTop:10,
 },
 boxDiriver:{
  width:'100%',
  height:'0.2%',
  backgroundColor:'#ddd',
 },
 boxOred:{
  paddingHorizontal:10,
  width:'100%',
  height:'16%',
  alignItems:'center',
  flexDirection: 'row',
  justifyContent:'space-between' 
 }
  
});
// export default CardViewProduct;

const mapStateToProps = state => ({
});

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

export default connect(state => mapStateToProps, mapDispatchToProps)(CardViewProduct);
// export default connect(null, mapDispatchToProps)(CardViewProduct)