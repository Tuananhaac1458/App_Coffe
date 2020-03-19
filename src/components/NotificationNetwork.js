import React, {Component} from 'react';
import {  StyleSheet, Text, View} from 'react-native';


export default class NotificationNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onChangce:false,
      onHide: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.networkInfo.Isconnected !== this.props.networkInfo.Isconnected){
      this.setState({
        onChangce: true,
        onHide: false
      })
      return
    }
    if(this.state.onChangce === false && this.state.onHide === true){
      return
    }
    if(prevState.onChangce === true && prevState.onHide === false && this.props.networkInfo.Isconnected){
      setTimeout(() => {
          this.setState({
              onChangce: false,
              onHide: true
          })
        }, 3000);
      return
    }
  }
  render() {
    if(this.state.onHide && this.props.networkInfo.Isconnected){
      return null
    }
    return (this.props.networkInfo.Isconnected  &&  this.state.onChangce === true )
    ? 
    (
      <View style={[styles.container, {backgroundColor: 'green' }]}>
         <Text style={styles.text}>
          Đã trở lại trực tuyến
         </Text>
      </View>
    ) 
    : 
    (
      <View style={[styles.container, {backgroundColor: 'black' }]}>
         <Text style={styles.text}>
            Bạn đang hoạt động ngoại tuyến
         </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  },
});