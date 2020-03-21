import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
 } from 'react-native';
import { PropTypes } from 'prop-types';
import { 
    Header
  } from 'react-navigation'
import Iconn from 'react-native-vector-icons/Feather'
import Iconnn from 'react-native-vector-icons/AntDesign'
import Loading from '../components/Loading'

////////////////////////////////
import { COLOR_HIGTHPERLINK, COLOR_HEAD_BAR } from '../util/ValueString';

/////////////////////////
const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 
export default class Filter extends Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     progress: 0,
  //     indeterminate: true,
  //   };
  // }

  // // componentDidMount() {
  // //   this.animate();
  // // }




  // //   animate() {
  // //   let progress = 0;
  // //   this.setState({ progress });
  // //     setInterval(() => {
  // //       progress += Math.random() / 5;
  // //       if (progress > 1) {
  // //         progress = 1;
  // //       }
  // //       this.setState({ progress });
  // //     }, 100);
    
  // // }






	render(){
    const HeaderHight = Header.HEIGHT;
  	const { setDataToFuitler, navigation, dataProduct } = this.props
    return(
			<View 
        style={[styles.container, {height: HeaderHight}]}
      >
        <View style={styles.contenButtom}>  
           <TouchableHighlight
            style={{borderRadius:200}}
            underlayColor="rgba(255,255,0,0.2)"
            onPress = {() => {
              setDataToFuitler('all')
            }}
           >
           <View style={styles.buttonView}>
            <Text>
              All
            </Text>
            </View>
          </TouchableHighlight>  


          <TouchableHighlight
            style={{borderRadius:200}}
            underlayColor="rgba(255,255,0,0.2)"
            onPress = {() => {
              setDataToFuitler('loved')
            }}
          >
             <View style={styles.buttonView}>

              <Text>
                Loved
              </Text>
            </View>
          </TouchableHighlight>


          <TouchableHighlight
            style={{borderRadius:200}}
            underlayColor="rgba(255,255,0,0.2)"
            onPress = {() => {
              setDataToFuitler('odered')
            }}
          >
             <View style={styles.buttonView}>
              <Text>
                Odered
              </Text>
            </View>
          </TouchableHighlight>

      </View>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('ModalSearch',{
              dataProductStore: dataProduct
            })
          }}
        >
          <View 
            style={{
              height:"100%",
              alignItems:'center',
              justifyContent:'center'
            }}

          >
            <Iconnn
             name ="search1" size ={20} style={{marginLeft:10,}} 
            />
          </View>
        </TouchableHighlight>
      </View>
		)
	}
}
const styles = StyleSheet.create({
  container:{
    flexDirection: 'row', 
    alignItems:'center', 
    justifyContent: 'space-between',
    backgroundColor: COLOR_HEAD_BAR, 
    paddingHorizontal:20
    
  },
  contenButtom:{
    flex:1,
    height:'60%',
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  buttonView:{
    width:widthDefalt/5,
    borderRadius:200,
    alignItems:'center', 
    justifyContent:'center',
    borderWidth:1,
    height:'100%',
    borderColor:'black',
  }

})
Filter.defaultProps = {
}

Filter.propTypes = {
};