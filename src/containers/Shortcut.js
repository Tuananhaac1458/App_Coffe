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

//////////////////////////////

import  { BACK_GROUND_DEFAULT } from '../util/ValueString';

const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 



class Shortcut extends Component {
  constructor(props) {

    super(props);
   
  }

  render(){
    const height = this.props.height;
    return(
      <View style={[styles.container, {height: height}]}>
            <View>
              <TouchableHighlight>
                <View style={styles.boxTouchable}>
                  <Image
                  style={styles.image}
                  source={require('../img/qr-code.png')}
                  >
                  </Image>
                  <Text style={styles.text}>Tích Điểm</Text>
                </View>
              </TouchableHighlight>
            </View>

            <View>
              <TouchableHighlight
                onPress= {() => this.props.navigation.navigate('Store')}
                >
                <View style={styles.boxTouchable}>
                  <Image
                  style={styles.image}
                  source={require('../img/notebook.png')}
                  >
                  </Image>
                  <Text style={styles.text}>Oder now</Text>
                </View>
              </TouchableHighlight>
            </View>

            <View>
              <TouchableHighlight>
                <View style={styles.boxTouchable}>
                  <Image
                  style={styles.image}
                  source={require('../img/coupon.png')}
                  >
                  </Image>
                  <Text style={styles.text}>Coupon</Text>
                </View>
              </TouchableHighlight>
            </View>
      </View>
    )
  }

}

Shortcut.defaultProps = {
  height: 130,
}

Shortcut.propTypes = {
  height: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: widthDefalt,
    marginTop:10,
    marginBottom:10,
    paddingRight:20,
    paddingLeft:20,

  },
  boxTouchable:{
    alignItems: 'center',
    justifyContent: 'center',

  },
  image:{
    width:70,
    height:70
  },
  text: {
    marginTop: 10,
    textAlign: 'center'
  }
});


export default Shortcut;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
