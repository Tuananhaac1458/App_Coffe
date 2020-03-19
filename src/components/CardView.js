
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  StyleSheet

} from 'react-native';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

import Loading from './Loading'

import ModalContainer from '../containers/ModalContainer';

import { COLOR_HIGTHPERLINK } from '../util/ValueString';

const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 

export default class CardView extends Component {
  constructor(props) {
      super(props);
      this.state = {
        onLoading: true,
        visible: false,
      }
    }

  // getHeight = (url) =>  {
  //     Image.getSize(url, (width, height) => {
  //         if (this.props.width && !this.props.height) {
  //             this.setState({
  //                 width: this.props.width,
  //                 height: height * (this.props.width / width)
  //             });
  //         } else if (!this.props.width && this.props.height) {
  //             this.setState({
  //                 width: width * (this.props.height / height),
  //                 height: this.props.height
  //             });
  //         } else {
  //             this.setState({ width: width, height: height });
  //         }
  //     });
  // }

  // onClick = () => {
  //   if(!this.props.nav){
  //     return
  //   }
  //   this.props.navigation.navigate(this.props.nav)
  // }


  setVisiModal = () => {
    this.setState({
      visible: !this.state.visible,
    })    
  }

  render() {
     const { data,  width, height } = this.props;  
    // console.log('CardView render')

    return (
      <View
        style={{paddingLeft:10}}
      >
        <Loading
          style={{backgroundColor: 'rgba(255, 255, 255, 0)'}}
          onLoading={this.state.onLoading}
          type={'heightlight'}
          typeStyle={{name:'CardView'}}
        >
          <TouchableHighlight
            onPress = {() => this.setVisiModal()}
            underlayColor="rgba(226,167,37,0.1)"
            >
            <View style={[styles.container, {height: height, width: width}]}>
              <View>
                {
                  (data.image) ? (<Image
                  source={{uri:data.image}}
                  style={[styles.image, {height: height/2.5, width: width}]}
                  onLoad={() => this.setState({onLoading: false})}
                  />) : (<Image
                  source={data.imagelocal}
                  style={[styles.image, {height: height/2.5, width: width}]}
                  onLoad={() => this.setState({onLoading: false})}
                />)
                }
                <View style={styles.viewText}>
                  <Text 
                    style={styles.title}
                    numberOfLines={2}
                    >
                    {data.title}
                  </Text>
                  <Text 
                    style={styles.content}
                    numberOfLines={3}

                    >
                    {data.content}
                  </Text>
                </View>
              </View>
        
        
              <View 
                style={{
                  flex:1 ,
                  width:'100%',
                  justifyContent:'flex-end',
                  paddingLeft: 10,
                  paddingBottom: 15,
                }}>
                  <TouchableHighlight
                    onPress={() => this.setVisiModal()}
                    underlayColor={'rgba(255,255,255,0)'}
                  >
                    <View style={styles.button}>
                      <Text style={{color: COLOR_HIGTHPERLINK}}>
                        Chi tiết
                      </Text>
                    </View>
                  </TouchableHighlight>


                   <View>
                      <ModalContainer
                        setVisiModal = {this.setVisiModal}
                        visible = {this.state.visible}
                        dataRender = {{type:'news',dataCotent:{'url': data.url},dataHeader:{'title': data.title, 'onload':true}}}
                      />
                    </View>
              </View>
            </View>
            </TouchableHighlight>
        </Loading>
      </View>
    );
  }
}

CardView.defaultProps = {
  height: 280,
  width: 200,
  data: {
    image:'https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687',
    title: 'Title',
    content: 'Content',
    url:'https://stackoverflow.com/questions/47005587/react-native-webview-doesnt-appear?rq=1',
  }
}

CardView.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  data: PropTypes.shape({
    id:PropTypes.number,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    content: PropTypes.string,
    url:PropTypes.string
  })
};


const styles = StyleSheet.create({
 container:{
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: 10,
  overflow: 'hidden',
  backgroundColor:'white',
  ////
 },
 image:{
    
 },
 viewText:{
  // alignItems: 'center',
  justifyContent: 'center',
  padding:10
 },
 title:{
  fontSize: 15,
  fontWeight: 'bold',
 },
 content:{

 },
 button:{
  height: 35,
  width: 100,
  justifyContent:'center',
  alignItems:'center',
  borderRadius: 20,
  borderWidth: 2,
  borderColor:COLOR_HIGTHPERLINK,
 }  
  
});
