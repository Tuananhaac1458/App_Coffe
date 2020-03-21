import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  BackHandler,
  TouchableOpacity
} from 'react-native';

import Modal, { SlideAnimation, ModalContent} from 'react-native-modals';
import { ListItem, Image, Icon,Divider } from 'react-native-elements';
import { Container, Header, Content, Accordion } from "native-base";
import { RNCamera } from 'react-native-camera';
// import YouTube from 'react-native-youtube';
import Carousel from 'react-native-snap-carousel'; // 3.6.0
const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 
let type = '';
const heightBar = 0;
const heightModal = heightDefalt-heightBar;
let listLanguage = [
  {
    id:1,
    name: 'VN',
    avatar_url: 'https://vectorified.com/images/battlefield-vietnam-icon-1.png',
    seletion: true
  },
  {
    id:2,
    name: 'EN',
    avatar_url: 'https://giftvoucher.bambooairways.com/img/icon-english.png',
    seletion: false
  }
]

const dataQuestion = [
  { title: "Forget password", content: "Step 1: Send email to americanoacademy.hotro@gmail.com. \n \nStep 2: Check email return and changce password." },
  { title: "Purchase steps", content: "Step 1: Choose products. \n \nStep 2: Click 'OderNow'. \n \nStep 3: Fill full the information.\n \nStep 4: Waiting for delivery."},
  { title: "Payment information", content: "Step 1: Open your personal information and click 'Payment'. \n \nStep 2: Fill full the information. \n \nStep 3: Wait a minute!"}
];

const datainfoa = [
  { title: "Profile", content: "(+84) 123456788" },
  { title: "Payment", content: "americanoacademy@gmail.com \n\namericanoacademy@mia.com" },
  { title: "History buy", content: "https://americanoacademy.vn/" },
];

const datainfo = [
  { title: "Hotline", content: "(+84) 123456788" },
  { title: "Email", content: "americanoacademy@gmail.com \n\namericanoacademy@mia.com" },
  { title: "Fanpage", content: "https://facebook.com/americanoacademy/" },
  { title: "Website", content: "americanoacademy.com" },
];
export default class ModalProfile extends Component {
  constructor(props) {
    super(props);
    type = this.props.navigation.getParam('type', '');
    this.state = {
      notification : this.props.notification || true,
      visible: false,
      listLanguage: listLanguage
    };
  }

  onChangeNotification = () => {
    // api notification
    this.setState({
      notification : !this.state.notification
    })
  }

  componentDidUpdate(){
    if(!this.state.visible){
        console.log("666===",this.state.visible)
        if(this.abc !== undefined){
          this.abc.remove()
        }
    }
    if(this.state.visible){
        console.log("555===",this.state.visible)
        this.handleBackPress()
    }
  }


 handleBackPress = () => {
    if(this.state.visible){
        this.abc = BackHandler.addEventListener('hardwareBackPressss02', () => {
           if(!this.state.visible){
            return false
          }
          this.setState({
            visible: false
          })
          return true
      })
    }
  }



  closeModal = () => {
    console.log("33333===",this.state.visible)
    if(!this.state.visible){
      return
    }
    this.setState({
      visible: false
    })
  }

   componentWillUnmount() {
     // this.backHandler.remove()
      console.log("unomuldaaaaaasd==================")
    }
  setLanguage = () => {
    this.setState({
      visible:true
    })
  }

  onPressLanguage = (id) => {
    let arr = this.state.listLanguage
    arr.forEach((element) => {
      element.seletion = false
    })

    arr.forEach((element) => {
      if(element.id !== id){
        return
      }
      element.seletion = true
    })

    this.setState({
      listLanguage: arr
    })
  }
  renderHead = (icon, title) => {
    return(
      <View>
        <View style={{height:60, backgroundColor:'white', justifyContent: 'center',alignItems: 'center', flexDirection: 'row'}}>
          {
            (icon !== '') && (
              <Icon
                name= {icon} 
                size={30}
                color={'black'}
              />
          )
          }
          <Text style={{paddingLeft:16,color:'black', fontSize:25, fontWeight: 'bold',}}>  
            {title}
          </Text>
        </View>
      </View>
    )
  }

  _renderItem = ( {item, index} ) => {
    console.log("rendering,", index, item)
    return (
          <View style={{backgroundColor:'red', height:heightDefalt-150, marginVertical:30}}>
              <Text >{ item.title }</Text>
          </View>
    );
  }

  renderElement = () => {
    console.log('type===>', type)
    if(type === ''){
      return
    }
    if (type === 'login') {
      
    }
    if (type === 'setting') {
      return(
        <View style={{marginTop:heightBar, flex:1}}>
            {this.renderHead('settings','Settings')}
              <Divider style={{ backgroundColor: '#eeeeee',height:10}}></Divider>
              <ListItem
                containerStyle={{height:65}}
                switch= {{ value:this.state.notification,thumbColor: 'blue', onChange:this.onChangeNotification,trackColor:{}}}
                title={'Notification'}
                leftIcon={{ name: 'alarm' }}
                bottomDivider
              />

               <ListItem
                containerStyle={{height:65}}
                title={'Language'}
                leftIcon={{ name: 'language' }}
                bottomDivider
                chevron
                onPress={() => this.setLanguage()}
              />
              <Modal
                rounded={false}
                overlayOpacity={0}
                style={{justifyContent:'flex-end',}}
                onHardwareBackPress={() => this.handleBackPress()}
                onTouchOutside={() => this.closeModal()}
                visible={this.state.visible}
                modalAnimation={new SlideAnimation({
                  initialValue: 0, // optional
                  slideFrom: 'right', // optional
                  useNativeDriver: true, // optional
                })}
              >
               
                <View style={{height: '100%', width: widthDefalt, backgroundColor:'white'}}>
                  <View style={{height: 60, width: widthDefalt, backgroundColor:'white',flexDirection: 'row',alignItems:'center',  position:'relative'}}>
                      <View style={{position:'absolute', left:20}}>
                        <Icon
                        name='long-arrow-left'
                        type='font-awesome'
                        size={28}
                        onPress={() => this.closeModal()}
                        />
                      </View>
                      <View style={{alignItems:'center', flex:1, }}>
                        <Text style={{color:'black', fontSize:25, fontWeight: 'bold',}}>  
                          Language
                        </Text>
                      </View>
                  </View>
                   <Divider style={{ backgroundColor: '#eeeeee',height:10}}></Divider>
                  <View>

                        {
                          this.state.listLanguage.map((element, i) => (
                            <ListItem
                              key={element.id}
                              leftAvatar={{ source: { uri: element.avatar_url } }}
                              title={element.name}
                              bottomDivider
                              checkmark={(element.seletion) ? true : false}
                              onPress={() => this.onPressLanguage(element.id)}
                            />
                          ))
                        }

                     
                  </View>
                  
 
                </View>
              
            </Modal>
        </View>
      )
    }
    if (type === 'aboutus'){
      return(
        <View style={{marginTop:heightBar, flex:1,}}>
        {this.renderHead('info','About us')}
        <ScrollView>
        <View>
            <Divider style={{ backgroundColor: '#eeeeee',height:10}}></Divider>
            <View style={{padding:15}}>
              <Text style={{fontSize:15}}>
                Nghệ thuật quốc tế hiện đại tô điểm không gian sống!

                Americano academy là công ty chuyên cung cấp các sản phẩm trang trí nội thất, đặc biệt các mặt hàng tranh ảnh trang trí. Thông qua hình thức kinh doanh dựa trên nền tảng thương mại điện tử, chúng tôi mong muốn mang đến trải nghiệm mua sắm thuận tiện và nhiều lựa chọn hơn tới người tiêu dùng.

                Đến với Americano academy, bạn sẽ dễ dàng tìm thấy các tác phẩm nghệ thuật theo nhiều phong cách từ cổ điển, ấn tượng, trừu tượng, đương đại cho tới hiện đại. Chúng tôi luôn tìm tòi và phát triển sản phẩm bắt kịp hơi thở thời đại, cập nhật những xu hướng mới về màu sắc, thiết kế để cho ra những sản phẩm độc đáo. Cho tới nay chúng tôi đã sở hữu hơn 1000 tác phẩm làm cảm hứng cho nhiều không gian và mang lại giá trị thẩm mỹ và năng lượng tích cực cho ngôi nhà.

                Bên cạnh những tác phẩm “original art” được ký bản quyền phân phối trực tiếp với tác giả, hầu hết các tác phẩm được sản xuất tại xưởng vẽ Mia do nhiều hoạ sĩ, nghệ sĩ chuyên nghiệp thực hiện, dựa trên các chất liệu phổ biến như sơn dầu, acrylic, in ấn và các chất liệu đặc biệt khác. Các tác phẩm in ấn như tranh đồ hoạ, ảnh nghệ thuật đều giới hạn số lượng sản xuất đính kèm giấy chứng nhận số lần tái bản và không mở rộng.   

                Chúng tôi mang nghệ thuật đến gần hơn với cuộc sống.
              </Text>
              {/*/

              <YouTube
                apiKey={'AIzaSyBlygKAjM_JKpUrEAgXmHJ5PlD8v5vp90s'}
                videoId="qAZ9Wjg3oVc" // The YouTube video ID
                play={false} // control playback of video with true/false
                 // control whether the video should play in fullscreen or inline
                //onError={e => this.setState({ error: e.error })}
                style={{  marginTop:20,height: 300 }}
                showFullscreenButton
              />


              /*/}
            </View>

        </View>
        </ScrollView>
        </View>

      )
    }
    if(type === 'help'){
      return(
          <View style={{marginTop:heightBar, flex:1, }}>
                {this.renderHead('help','Help!')}
                <Divider style={{ backgroundColor: '#eeeeee',height:10}}></Divider>
                <View style={{justifyContent:'center', paddingLeft: 5, height:35}}>
                   <Text style={{fontSize:18, fontWeight:'bold'}}>
                    Câu hỏi thường gặp 
                  </Text>
                </View>
                <View>
                  <Accordion 
                    dataArray={dataQuestion}
                    renderContent={this._renderContent}
                    icon="add"
                    expandedIcon="remove"
                    iconStyle={{ color: "green" }}
                    expandedIconStyle={{ color: "red" }}
                  />
                </View>
                <View style={{justifyContent:'center', paddingLeft: 5, height:35}}>
                   <Text style={{fontSize:18, fontWeight:'bold'}}>
                    Thông tin liên lạc 
                  </Text>
                </View>
                 <View>
                  <Accordion dataArray={datainfo} renderContent={this._renderContentInfo} icon="add"
                    expandedIcon="remove"
                    iconStyle={{ color: "green" }}
                    expandedIconStyle={{ color: "red" }}/>
                </View>
          </View>
      )
    }
    if(type === 'cart'){
      return(
        <Text>
          Cart
        </Text>
      )
    }
    if(type === 'ttcn'){
      return(
          <View style={{marginTop:heightBar, flex:1, backgroundColor:'blue'}}> 
            {this.renderHead('','Wellcome')}
            <Carousel
              ref={ (c) => { this._carousel = c; } }
              data={datainfoa}
              renderItem={this._renderItem.bind(this)}
              sliderWidth={360}
              itemWidth={256}
              layout={'default'}
              firstItem={0}
            />
          </View>
      )
    }
    return
    
  }


takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }
   _renderContent = (item) => {
    return (
      <Text
        style={{
          backgroundColor: "white",
          padding: 15,
          fontSize:15,
          fontStyle: "italic",
        }}
      >
        {item.content}
      </Text>
    );
  }

  _renderContentInfo = (item) => {
    return (
      <Text
        style={{
          backgroundColor: "white",
          padding: 15,
          fontSize:15,
          textDecorationLine: 'underline'
        }}
      >
        {item.content}
      </Text>
    );
  }
  render() {
    return (
      <View style={styles.container}>
          {this.renderElement()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});