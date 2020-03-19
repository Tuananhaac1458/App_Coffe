import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { PropTypes } from 'prop-types';

//////////////////////////////

import  { BACK_GROUND_DEFAULT } from '../util/ValueString';

class ImageGif extends Component {
  constructor(props) {
    super(props);
    
    this.reload = null;
    this.state = {
      reload: true,
    }
  }
  onLoad = () => {
    // this.reload = setInterval(function(argument) {
    //   this.setState({
    //     reload: !this.state.reload
    //   })
    // }, 2000);
  }

  componentWillUnmount(){
    if(this.reload){
      clearInterval(reload);
    }
  }

  render(){
    const { height , width } = this.props;
    return(
        <Image
          style={{height: height, width: width}}
          source={require('../img/pip.gif')}
          onLoad= {() => this.onLoad()}
        >
        </Image>
    )
  }

}

ImageGif.defaultProps = {
  height: 30,
  width: 30
}

ImageGif.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

const styles = StyleSheet.create({
 
  
});


export default ImageGif;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
