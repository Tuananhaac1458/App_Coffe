import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { PropTypes } from 'prop-types';

//////////////////////////////

import  { BACK_GROUND_DEFAULT, COLOR_HIGTHPERLINK } from '../util/ValueString';
import  { RenderViewMoney } from '../util/init';

import Iconnn from 'react-native-vector-icons/AntDesign'
import Selection from '../components/Selection'
import ButtonOder from './ButtonOder';

const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 


class Oderdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onLoved : this.props.dataProduct.love,
      dataProduct: props.dataProduct,
    }
  }
  onLoved = () => {
    this.props.dataProduct.love = !this.state.onLove
    this.props.setLoveProduct(this.state.dataProduct, !this.state.onLoved)
    this.setState({
        onLoved: !this.state.onLoved
      })
  }

  oderOption = (obj) => {
    this.setState({
      dataProduct: obj
    })

  }

  log = () => {
    console.log('lallllllll==>', this.state.dataProduct)
  }

  render(){
    console.log("dataProductOderdetail", this.props)
    const {setOderInvoice} = this.props;
    // const { dataProduct } = this.state;
    const {dataProduct} = this.state;
    return(
        <View style={styles.container}>
          <View style={styles.boxHeader}>
            <Image
            style={{width:70,height:70,borderRadius:10,overflow: 'hidden'}}
            source={{uri:dataProduct.image}}
            />
            <View
            style={styles.infoOutside}
            >
              <Text
              style={styles.styleText}
              >
              {dataProduct.name}
              </Text>
              <Text
              style={styles.styleText}
              >
              {RenderViewMoney(dataProduct.Price)}
              </Text>

              <View
              style={styles.boxLove}
              >
                <TouchableHighlight
                  onPress = {() => this.onLoved()}
                  underlayColor="rgba(255,255,0,0)"
                >
                  <View
                    style={{flexDirection: 'row'}}
                  >
                  <Iconnn 
                    color = {this.state.onLoved ? COLOR_HIGTHPERLINK : "#E4E4E4"}
                    name = {"heart"}
                    size ={20} 
                  />
                    <Text
                    style={{
                      marginLeft:5
                    }}
                    >
                    Yêu Thích
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>

          <View style={styles.boxContent}>
              <View>
                <Selection
                  // arrSize={this.state.oderOption.size}
                  // arrTopping={this.state.oderOption.topping}
                  // description = {dataProduct.description}
                  dataProduct = {dataProduct}  
                  oderOption = {this.oderOption}
                  log={this.log}
                />
              </View>
             <ButtonOder
                dataProduct = {dataProduct}
                closeModal = {this.props.closeModal}
                setOderInvoice = {setOderInvoice}
                log = {this.props.log}
                invoice = {this.props.invoice}
             />
         
          
          </View>
        </View>
    )
  }

}

Oderdetail.defaultProps = {
  dataProduct : {
    id:'',
    image:'',
    name:'',
    Price: 0,
    loved: false,
    arrSize:[],
    arrTopping:[],
    description:''
  }
}

Oderdetail.propTypes = {
    dataProduct: PropTypes.shape({
    id:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    Price: PropTypes.number,
    loved: PropTypes.bool,
    arrSize:PropTypes.array,
    arrTopping:PropTypes.array,
    description:PropTypes.string,
  })
};

const styles = StyleSheet.create({
 container:{
  backgroundColor:'white',
  width:widthDefalt*90/100,
  maxHeight:heightDefalt/1.2
 },
 styleText:{
  color: 'black',
  fontSize: 15,
  fontWeight: 'bold'
 },
 boxHeader:{
  alignItems: 'center',
  height:70,
  flexDirection: 'row',
  margin:15
 },
 infoOutside:{
  flex:1,
  marginLeft:15,
  height:70,
  justifyContent:'center'
 },
 boxLove:{
  paddingTop:5,
  flexDirection: 'row',
  alignItems: 'center',
 },
 boxContent:{
 }

});



export default Oderdetail;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
