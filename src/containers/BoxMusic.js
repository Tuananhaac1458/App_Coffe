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
  TouchableHighlight,
  Animated,
  Easing,
  Modal,
  Alert
} from 'react-native';
import { PropTypes } from 'prop-types';

//////////////////////////////

import  { COLOR_HIGTHPERLINK, BACK_GROUND_DEFAULT } from '../util/ValueString';

import Iconnn from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import Sound from 'react-native-sound';
import ImageGif from '../components/ImageGif';

import ContentLoader from 'react-native-easy-content-loader';

import ModalContainer from './ModalContainer';

Sound.setCategory('Playback');

const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 
 



class BoxMusic extends Component {
  constructor(props) {
    super(props);
    this.sound = null;
    this.amiationImage = null;
    this.state = { 
      spinAnim: new Animated.Value(0),
      onLoadMusic: 0,
      onMute: false,
      Play: true,
      visible : false,
    }

  }


  shouldComponentUpdate(nextProps, nextState){
    if(nextState !== this.state){
     return true 
    }
 
    if(nextProps.networkInfo.Isconnected === this.props.networkInfo.Isconnected){
     return false 
    }
 
    return true
  }
  componentDidMount() {
    this.animationImage();
    this.autoPlay();
  }

  animationImage = (oder) => {
    if(this.amiationImage !== null){
      this.amiationImage.stop()
    }
    this.amiationImage = Animated.loop(Animated.timing(
    this.state.spinAnim,
      {
        toValue: 1,
        duration: 7000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ));
    this.amiationImage.start();
  }
  // onLoadMusic = () => {
  //       if(this.state.onLoadMusic === 0){
  //         return
  //       }
  //       if(this.state.onLoadMusic === 2){
  //         Animated.timing(
  //           this.state.spinAnim
  //         ).stop();
  //       }
  //       if(this.state.onLoadMusic === 1){
  //         Animated.timing(
  //           this.state.spinAnim
  //         ).stop();
  //       }
  // }
  componentDidUpdate(prevProps, prevState) {
    // if(prevState.onLoadMusic != this.state.onLoadMusic){
    //   this.onLoadMusic()
    // }
    if(!prevProps.networkInfo.Isconnected){
      return
    }
    if(this.state.onLoadMusic === 1){
      return
    }
    this.autoPlay()
  }

  componentWillUnmount() {
    this.sound.stop();
    this.amiationImage.stop()
  }
  autoPlay = () => {
    if(this.state.onLoadMusic === 1 || this.state.onLoadMusic === 2  ){
      return
    }
    this.sound = new Sound('https://aredir.nixcdn.com/NhacCuaTui991/LoiNho-DenPhuongAnhDao-6129215.mp3?st=ZVuoBufnZdOgwn8_XdiAfQ&e=1580309547', null, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
      }
      // loaded successfully
      //console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());
      this.setState({
        onLoadMusic: 1,
      })  
      // Play the sound with an onEnd callback
      this.sound.play((success) => {
        if (success) {
          this.setState({
            onLoadMusic: 0,
          })
          console.log('successfully finished playing');
        } else {
          //console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }
  onPlay = () => {
    if(this.state.onLoadMusic === 0)
      { return }
    if(!this.state.Play){
      this.sound.stop(() => {
        // Note: If you want to play a sound after stopping and rewinding it,
        // it is important to call play() in a callback.
        this.sound.play();
      });

      this.setState({
        Play: true,
      })
      return
    }
    this.sound.pause();
    this.setState({
        Play: false,
      })
      return  
  }



  setVolum = () => {
    // if(this.state.onLoadMusic !== 1){
    //   return;
    // }
    if(!this.state.onMute){
      this.sound.setVolume(0);
      this.setState({
        onMute: true,
      })
      return
    }
    this.sound.setVolume(1);
    this.setState({
      onMute: false,
    })   
  }
  
  setVisiModal = () => {
    this.setState({visible: !this.state.visible})    
  }



  renderListMusic = (dataa) => {
    // data:{
    //   NameSong,
    //   author,
    //   urlImage,
    //   list:[
    //       {
    //         NameSong,
    //         author,
    //         urlImage,
    //       },
    //     ]
    // }
    const data = {
      NameSong:"Lối Nhỏ (Single)",
      author:"Đen, Phương Anh Đào",
      urlImage:"https://i.ytimg.com/vi/L0NZW6pgSLc/maxresdefault.jpg",
      list:[]
    }
    return(
      <View style={styleModal.container}>

        <View style={styleModal.boxMusicNow}>
          <Text 
            style={styleModal.textName}
            numberOfLines={1}
          > 
            {data.NameSong} 
          </Text>
          <Text 
            style={styleModal.textSing}
            numberOfLines={1}
          > 
            {data.author} 
          </Text>

          <Image 
            style={styleModal.image}
            source={{uri: data.urlImage}} />
        </View>
        
       
        <View style={styleModal.boxlistMusic}>
          <View
            style={{
              width:'90%',
              marginHorizontal:'5%',
            }}
          >
            <Text
              style={{
                fontSize: 18
              }}
            >
              Bài tiếp theo
            </Text>

            <View
              style={{
                width:"100%",
                height:2,
                backgroundColor:'#8A8A8A'
              }}
            />

            {/*////////////////////////////////////////////*/}

              <View
                style={{
                  marginVertical:10,
                  height:40,
                  width:"100%",
                  flexDirection:"row"
                }}
              >
                <Image
                  source={{uri:'https://www.bigstockphoto.com/images/homepage/module-6.jpg'}}
                  style={{height:40,width:40}}
                />
                <View
                  style={{
                    flexDirection:"column",
                    alignItems:'center',
                    marginLeft:10
                  }}
                >
                  <Text
                    numberOfLines={1}
                  >
                    Bài Này Chill Phết
                  </Text>
                  <Text
                    style={{color: COLOR_HIGTHPERLINK}}
                    numberOfLines={1}
                  >
                    Đen, MIN
                  </Text>

                </View>
              </View>

          </View>
          
        </View>
      </View>
    )
  }


  render(){
    // console.log('this.props. BoxMusic==>22',this.props)
    // console.log('boxMusicNow render')
    const {height, NameSong, author, urlImage } = this.props;
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return(
      <View style={[styles.container, {height: height}]}>
        <ContentLoader 
          active
           pRows={2}
           avatar 
           pWidth={["100%", 100, "25%", 50]}
           loading={this.state.onLoadMusic === 1 ? false : true}>
        <TouchableHighlight 
          style={[styles.TouchableHighlight, {height: height}]}
          onPress={() => this.setVisiModal()}
          underlayColor="rgba(255,255,0,0.5)"
        >
          <View>
            <ModalContainer
              setVisiModal = {this.setVisiModal}
              visible = {this.state.visible}
              dataRender={{dataHeader:{'title': 'Nhạc đang phát'}}}
              content= { this.renderListMusic }
            />
          </View>
        </TouchableHighlight>
        <View style={styles.containerImage}>
          <Animated.Image
          style={{height:100, width: 100,transform: [{rotate: spin}] }}
          source={{uri: urlImage}} />

        </View>

        <View style={[styles.containerText, {height: height, fontWeight: '400',}]}>
          <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[styles.text]} numberOfLines={1} >
            { NameSong }
            </Text>
            <View style={{flex:1, alignItems:'flex-end'}}>
              <TouchableHighlight
                onPress={() => this.setVolum()}
                underlayColor="#EBE6E2"
                style={{borderRadius: 24 / 2}}
              >
                <Icon 
                name = {this.state.onMute ? "volume-off" : "volume-2"}
                size ={24} 
                />
              </TouchableHighlight>
            </View>
          </View>

          <Text style={[styles.text, {color:COLOR_HIGTHPERLINK}]} numberOfLines={1}>
            { author }
          </Text>
          <View style={{flexDirection:'row', alignItems: 'center'}}>
            <Image
              style={{height: 30, width: 30}}
              source={require('../img/pip.gif')}
            />
            <Text style={[styles.text, {color:COLOR_HIGTHPERLINK}]}>
              Now Playing
            </Text>
            <View style={{flex:1, alignItems:'flex-end'}}>
              <TouchableHighlight
                onPress={() => this.onPlay()}
                underlayColor="gray"
                style={{borderRadius: 24 / 2}}
              >
                <Iconnn 
                name = {this.state.Play ? "pausecircleo" : "playcircleo"}
                size ={24} 
                />
              </TouchableHighlight>  
              
            </View>
          </View>
        </View>
        </ContentLoader>
      </View>
    )
  }

}

BoxMusic.defaultProps = {
  height: 130,
  NameSong: 'NameSong',
  author: 'author',
  urlImage:'https://i.ytimg.com/vi/L0NZW6pgSLc/maxresdefault.jpg',
}

BoxMusic.propTypes = {
  height: PropTypes.number,
  NameSong:PropTypes.string,
  author:PropTypes.string,
  urlImage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
  // dataSource: PropTypes.arrayOf(PropTypes.shape({
  //     title: PropTypes.string,
  //     caption: PropTypes.string,
  //     url: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  //   })).isRequired, 
  // indicatorSize: PropTypes.number,
  // indicatorColor: PropTypes.string,
  // indicatorSelectedColor: PropTypes.string,
  // height: PropTypes.number,
  // position: PropTypes.number,
  // scrollEnabled: PropTypes.bool,
  // containerStyle: PropTypes.object,
  // overlay: PropTypes.bool,
  // arrowSize: PropTypes.number,
  // arrowLeft: PropTypes.object,
  // arrowRight: PropTypes.object,
  // onPress: PropTypes.func,
  // onPositionChanged: PropTypes.func,
const styles = StyleSheet.create({
  container: {
    borderRadius:10,
    overflow: 'hidden',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: widthDefalt - 20,
    backgroundColor: 'white',
    padding:20,
    position:'relative',
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
  TouchableHighlight:{
    backgroundColor: 'rgba(255,255,255,0);',
    width:widthDefalt/1.5,
    position:'absolute',
    zIndex:1
  },
   containerImage: {
    backgroundColor: '#ecf0f1',
    borderRadius: 100 / 2,
    overflow: "hidden" 

  },
  containerText:{
    marginLeft: 20,
    flex:1,
    justifyContent: 'center',
    flexDirection: 'column',
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
    fontSize: 15,
    fontWeight: 'bold',

  }
});

const styleModal = StyleSheet.create({

  container:{
    flex:1,
    alignItems:'center',
    backgroundColor:BACK_GROUND_DEFAULT,
  },
  boxMusicNow:{
    height:'60%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'white',
  },
  textName:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textSing:{
    margin:10,
    fontSize: 15,
    color:COLOR_HIGTHPERLINK,
    textAlign: 'center',
  },
  image:{
    height:230,
    width:230,
    borderRadius: 230 / 2,
    overflow: "hidden" 
  },
  boxlistMusic:{
    width:'100%',
    justifyContent:'center',
    backgroundColor: '#F0E9E7',
    alignItems:'flex-start',

  },
})

export default BoxMusic;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
