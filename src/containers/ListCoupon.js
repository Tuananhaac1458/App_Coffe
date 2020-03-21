import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { PropTypes } from 'prop-types';

//////////////////////////////
import {  Button, Overlay, ListItem } from 'react-native-elements';
import  { BACK_GROUND_DEFAULT, COLOR_HIGTHPERLINK } from '../util/ValueString';
const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 

const headbar = StatusBar.currentHeight;
const list = [
  {
    code: 'AmyFarha',
    title: 'AmyFarha take you',
    subtitle: 'discount 10k'
  },
  {
    code: 'ChrisJackson',
    title: 'ChrisJackson take you',
    subtitle: ' discount 50%'
  },
]

class ListCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value : '',
      loading: false
    }
  }

  
  render(){
    const { onChose, openCloseModal2 } = this.props;
    return(
      <View style={{height:heightDefalt, width:widthDefalt,backgroundColor:'white',alignItems: 'center',}}>
          <Overlay 
          overlayBackgroundColor={'rgba(255,255,255,0.5)'}
          fullScreen={true}
          isVisible={this.state.loading}>
          <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
            <ActivityIndicator 
              size="large" 
              color="#ffffff" 
            />
          </View>
        </Overlay>

        <View style={{height:56, width:widthDefalt ,backgroundColor:'white', justifyContent: 'center',alignItems: 'center',}}>
          <Text style={{paddingLeft:16,color:'black', fontSize:25, fontWeight: 'bold',}}>  
              List Coupon
          </Text>
        </View>
        <View style={{flex:1, backgroundColor:'gray', width:widthDefalt, alignItems:'center'}}>
        {
          list.map((l, i) => (
            <ListItem
              key={i}
              title={l.title}
              subtitle={l.subtitle}
              bottomDivider
              containerStyle={{marginVertical:10,backgroundColor:'#eeeeee',borderRadius:10,borderWidth:1,overflow:'hidden', width: widthDefalt-30, height: 100, }}
              onPress={() => {
                  this.setState({
                    loading:true
                  })
                 setTimeout(() => {
                  this.setState({
                    loading:false
                  })
                  onChose(l) 
                  openCloseModal2()
                }, 1000)
              }}
            />
          ))
        }
        </View>
      </View>
    )
  }

}

ListCoupon.defaultProps = {
  
}

ListCoupon.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

const styles = StyleSheet.create({
 
  
});


export default ListCoupon;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
