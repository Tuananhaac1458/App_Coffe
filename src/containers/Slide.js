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
import Slideshow from '../components/Slideshow';


const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 




class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      interval: null,
      dataSource: [
          {
            url: 'https://secureservercdn.net/198.71.233.68/sk5.a50.myftpupload.com/wp-content/uploads/2020/01/food-truck-golf-3.jpg',
          },
          {
            url: 'https://secureservercdn.net/198.71.233.68/sk5.a50.myftpupload.com/wp-content/uploads/2020/01/container-2.jpg?time=1580262729',
          },
          {
            url:'https://secureservercdn.net/198.71.233.68/sk5.a50.myftpupload.com/wp-content/uploads/2020/01/ghep-bai-co.jpg'
          }
      ]
    };
  }
  
  componentDidMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length - 1 ? 0 : this.state.position + 1
        });
      }, 5000)
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  render(){
    const height = this.props.height;
    return(
      <View style={[styles.container, {height: height}]}>
          <Slideshow 
            scrollEnabled={false}
            height= {height}
            indicatorSize={10}
            arrowSize={0} 
            dataSource={this.state.dataSource}
            position={this.state.position}
            onPositionChanged={position => this.setState({ position })} />

      </View>
    )
  }

}

Slide.defaultProps = {
  height: 150,
}

Slide.propTypes = {
  height: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    borderRadius:10,
    overflow: 'hidden',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: widthDefalt - 20,
    //////
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    shadowColor: "#000",
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
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


export default Slide;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
