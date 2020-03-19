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
  TouchableHighlight
} from 'react-native';
import { PropTypes } from 'prop-types';
import { 
    Header
  } from 'react-navigation'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//////////////////////////////

import  { BACK_GROUND_DEFAULT, COLOR_HIGTHPERLINK } from '../util/ValueString';

const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 



class AddressCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : props.dataProduct
    }
  }

  render(){
    const HeaderHight = Header.HEIGHT;
    return(
      <View style={[styles.container, {height: HeaderHight}]}>
            <Icon name ="motorbike" color={COLOR_HIGTHPERLINK} size ={24} style={{marginHorizontal:10}}/>
            <View style={styles.textBox}>
                <Text
                  style={{marginTop:5}}

                  >
                  Giao hàng đến
                </Text>
                <View
                  style={styles.changceAddbox}
                >
                  <View
                    style={{
                      flex:1,
                    }}
                  >
                    <Text 
                      style={styles.addressText}
                      numberOfLines={1}>
                      Thêm địa chỉ giao hàng
                    </Text>
                  </View>
                    <View>
                      <TouchableHighlight>
                        <Text
                          style={styles.ChangceText}
                          onPress={() => {
                            this.setState({
                                data : {
                                id:'555',
                                image:'Matcha Machiato',
                                name:'Matcha Machiato',
                                "Price": 29000,
                                loved: true,
                                arrSize:[{id:123, nameSize: 'Loai L', PlusPrice: 5000, selected:true},{id:345, nameSize: 'Loai XL', PlusPrice: 15000,selected:false}],
                                arrTopping:[{id:123, nameTopping: 'Extra foanm', PlusPrice: 5000, selected:false},{id:345, nameTopping: 'Trân châu trắng', PlusPrice: 5000,selected:false}],
                                description:'Uong deo no bung dc dau'
                              }
                            })
                            this.props.cons()
                          }}
                        >
                          THAY ĐỔI
                        </Text>
                      </TouchableHighlight>
                    </View>
                </View>
            </View>
      </View>
    )
  }

}

AddressCustomer.defaultProps = {
}

AddressCustomer.propTypes = {
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: widthDefalt,
  },
  textBox:{
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex:1,
  },
  addressText:{
    fontSize: 15,
    fontWeight: 'bold',
  },
  changceAddbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex:1,
    marginRight:10,
  },
  ChangceText:{
    fontSize: 20,
    fontWeight: 'bold',
    color:COLOR_HIGTHPERLINK,
    marginLeft:10,

  }
});


export default AddressCustomer;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
