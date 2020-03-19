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



class PlaylisMusic extends Component {
  constructor(props) {

    super(props);
   
  }

  render(){
    const height = this.props.height;
    return(
      <View style={[styles.container, {height: 200}]}>
            
      </View>
    )
  }

}

PlaylisMusic.defaultProps = {
}

PlaylisMusic.propTypes = {
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
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


export default PlaylisMusic;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
