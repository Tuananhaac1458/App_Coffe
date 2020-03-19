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
  RefreshControl,
  StatusBar,
} from 'react-native';

////////////////////////// Import Redux ////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pageActions from '../redux/actions/pagelist';
////////////////////////////////////////////////////////////////////

////////////////////////////// Import Style //////////////// 
import { BACK_GROUND_DEFAULT } from '../util/ValueString';
////////////////////////////////////////////////////////////////////

/////////////////// Import Components ////////////////////////
import NotificationNetwork from '../components/NotificationNetwork';
import Shortcut from '../containers/Shortcut';
import Slide from '../containers/Slide';
import BoxMusic from '../containers/BoxMusic';
import CardView from '../components/CardView'


////////////////////////////////////////////////////////////////////

import data from "../dataDemo/dataNew"; 

import AppIntroSlider from 'react-native-app-intro-slider';


const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../img/coupon.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../img/coupon.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../img/coupon.png'),
    backgroundColor: '#22bcb5',
  }
];
const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 

const dataTintuc = data.dataTintuc;

const dataWhatnew = data.dataWhatnew;

// const dataVocher = data.dataVocher;
const dataTintucAmericano = data.dataTintucAmericano;

// const dataTintuc = [
//   {
//     id:1,
//     image:'https://file.hstatic.net/1000075078/article/hibiscus_banner_blog_464ece674ae8482f910aa3bc301a3b95_a4e4212b9763403a9a0af4d5e101cad7_1024x1024.jpg',
//     title:'Sẻ chia vị tết cùng bộ 3 món mới từ the coffee house',
//     content:'Từ ngày 06/01, mời bạn đến Nhà Sẻ chia vị Tết với những cuộc hẹn chân thành cùng bộ 3 món mới nhé!'
//   },
//   {
//   id: 2,
//   image:'https://file.hstatic.net/1000075078/article/csr_banner_blog_c47ae16a63134e1c94a24164f1974f77_0195831415ba44ada4369f27f6276646_grande.jpg',
//   title:'Hành trình "Cảm ơn những người hùng thầm lặng"',
//   content:'Và Tết này The Coffee House bắt đầu dự án “Cảm ơn những người hùng thầm lặng", dành tặng những tấm lòng luôn tận tâm vì người khác, họ là những Hiệp sỹ đường phố, các anh chị nhân viên Vệ sinh đang giữ gìn mỹ quan đô thị, hay những Nữ Tu Sỹ tại các mái ấm tình thương, họ đang làm công việc ý nghĩa cho xã hội mà đôi khi chằng cần phải nhận lại hay đền đáp.'
//   },
//   {
//   id:3,
//   image:'https://file.hstatic.net/1000075078/article/qua_tet_banner_blog_96b781e3519e41518fab0c86507c7434_2f8f2148a7b9457583c04f65f6cd8036_grande.jpg',
//   title:'Cùng Nhà mang "Tết" về nhà',
//   content:'Tết này hãy để Nhà khơi lại những câu chuyện chân thành cùng bạn, qua những món quà đặc biệt của Nhà nhé. '
//   },
//   {
//   id:4,
//   image:'https://file.hstatic.net/1000075078/article/travel_mug_banner_blog_6adcfb769ff74b7793b3bdb45d27ccc6_grande.jpg',
//   title:'Bộ ly sứ Travel Mug từ The Coffee House - Mang theo cả thành phố bạn từng yêu',
//   content:'Lại thêm 1 món quà The Coffee House mang đến cho bạn nhân dịp năm mới 2020 - bộ sưu tập “Travel Mug” với phiên bản giới hạn, cho những...'
//   },
//   {
//   id:5,
//   image:'https://file.hstatic.net/1000075078/article/tch_x_noelbui_1200x450_0e2cd1a6b5eb4b1a8123203299287c50_b2e852a5208a4b70a655fb5ce89c0a7d_master.jpg',
//   title:'Gửi chân thành, trao yêu thương cùng the coffee house',
//   content:'Noel là mùa của ấm áp và yêu thương. Là dịp trao nhau những món quà nhỏ, hẹn hò dạo phố, hay đơn giản là bữa cơm gia đình trong không khí se lạnh đêm Giáng Sinh. Nhưng không phải ai cũng được hưởng trọn hơi ấm ấy trong đêm Noel này, đúng không?'
//   },

// ]
// const dataWhatnew = [
//   {
//     id:1,
//     image:'https://file.hstatic.net/1000075078/article/blog_130c5cbf52e442b6ba6dcf45e38f2680_grande.jpg',
//     title:'Chiến dịch giảm ống hút tại The Coffee House - ',
//     content:'Từ tháng 10/2019, The Coffee House sẽ bắt đầu hành động giảm thiểu ống hút nhựa sử dụng 1 lần tại toàn bộ hệ thống. Cụ thể là The Coffee...'
//   },
//   {
//   id: 2,
//   image:'https://file.hstatic.net/1000075078/article/cover_fb_800x300_c97ded2d90324c2486b5954c37b6bdc5_grande.jpg',
//   title:'Lễ hội macchiato - thêm cảm hứng, thêm vui!',
//   content:'Đến hẹn lại lên, Mùa Lễ Hội Macchiato đã quay trở lại! Hãy sẵn sàng xóa tan cơn nắng mưa thất thường, để hòa mình vào Lễ Hội Macchiato đầy...'
//   },
//   {
//   id:3,
//   image:'https://file.hstatic.net/1000075078/article/tch_video_design_02_be33c39f38294d0380014fbdcdc135e7_grande.jpg',
//   title:'Giải đáp thắc mắc của bạn với chương trình khách hàng thân thiết mới',
//   content:'Từ ngày 23/09, The Coffee House sẽ ra mắt Chương trình khách hàng thân thiết - The Coffee House Rewards mới thông qua ứng dụng The Coffee House, với những... '
//   },
//   {
//   id:4,
//   image:'https://file.hstatic.net/1000075078/article/_2ff56aa17382400c990f52191f208ec8_8347e74c6266406b8fc9c4706f01149b_964e0cbe297b4a78892e271fa0893373_grande.png',
//   title:'Chương trình khách hàng thân thiết mới và những điều có thể bạn chưa biết',
//   content:'Từ ngày 23/09, The Coffee House sẽ ra mắt Chương trình khách hàng thân thiết - The Coffee House Rewards mới thông qua ứng dụng The Coffee House, với những..'
//   },
//   {
//   id:5,
//   image:'https://file.hstatic.net/1000075078/article/0914-tch-p5-800x300_c0e092305fd042399a734b725eb6ad5b_grande.jpg',
//   title:'The coffee house - 5 năm hoạt động vì cộng đồng',
//   content:'Ngay từ những ngày đầu, The Coffee House luôn lấy con người làm trọng tâm cho mọi quyết định và sản phẩm. Chúng tôi tin rằng, một không gian cà...'
//   },

// ]

const dataVocher = [
  {
  id:1,
  imagelocal:require('../img/af1188bd8c332a874e4525bb489764ac.jpg'),
  title:'JUICE',
  content:''
  },
  {
  id: 2,
  imagelocal:require('../img/cc4b6a4707dae5b7c35df5f72f026d81.jpg'),
  title:'COFFEE',
  content:''
  },
  {
  id:3,
  imagelocal:require('../img/cdc3245f88ddf92ccb307b5b8a50af73.jpg'),
  title:'MOGITO AND SODA',
  content:''
  },
]
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList:[],
      listRefreshing: false,
      showRealApp: false
    }
  }

  _renderItem = (item) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={style.text}>{item.text}</Text>
      </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }

  componentWillUnmount() {
     // this.backHandler.remove()
  }

	// incrementCount() {
	//    let { dispatch } = this.props;
 //     console.log('dispatch',dispatch)
 //      const xx = dispatch.getPageList()
 //      .then((a) => {
 //        this.setState({
 //          pageList: a
 //        })
 //      });

 //  	}

    _refreshList = () => {
      this.setState({
          listRefreshing: true
        })
      setTimeout(() => {
        this.setState({
          listRefreshing: false
        })
      }, 1000);
    }
	render(){
    // console.log('this.props==>22',this.props)
		return (
			<SafeAreaView >
       <StatusBar 
          barStyle="dark-content" 
          backgroundColor= 'white'
          translucent={false}
        />
        <NotificationNetwork
          networkInfo = {this.props.gateProps.networkInfo}
        />
        <ScrollView 
           refreshControl={
              <RefreshControl 
                onRefresh={() => this._refreshList()}
                refreshing={this.state.listRefreshing}
              />
            }
        > 
        <View style={styles.container}>
          <Shortcut
              navigation = {this.props.navigation}
           />
          <View style={styles.boxContent}>
             <Slide />
             <Text style={   styles.textboxContent }>
              Coffee Time Music
             </Text>
             <BoxMusic
              NameSong={"Lối Nhỏ (Single)"}
              author={"Đen, Phương Anh Đào"}
              networkInfo = {this.props.gateProps.networkInfo}
              navigation = {this.props.navigation}
             />
             



             

{/*////////////////////////////////////////////*/}


          

        {/*////////////////////////

          <Button
                title="Get Employee"
                onPress={() => this.incrementCount()}
              />
              {
                this.state.pageList.map((employee) => (
                  <Text key={employee.id} style={styles.textCenter}>{employee.employee_name}</Text>
                ))
              }


        ////////////////////*/}

             
              
          </View>

          <View style={styles.boxContent2}>
            <Text style={[styles.textboxContent, {paddingLeft:10}]}>
              What's new #
            </Text>
             <ScrollView
              horizontal={true} 
              >
                  {
                    dataTintucAmericano.map((data) => 
                      <CardView
                      key={data.id}
                      data={data}
                      />
                    )
                  }
                  <View
                    style={{width:10}}
                  />
             </ScrollView>

            {/*////

              <Text style={[styles.textboxContent, {paddingLeft:20}]}>
              Tin Tức
            </Text>
             <ScrollView
              horizontal={true} 
              >
                  {
                    dataTintuc.map((data) => 
                      <CardView
                       key={data.id}
                       data={data}
                      />
                    )
                  }
                  <View
                    style={{width:10}}
                  />
             </ScrollView>

          //*/} 

             <Text style={[styles.textboxContent, {paddingLeft:10}]}>
              Our Menu
            </Text>
             <ScrollView
              horizontal={true} 
              >
                  
                  {
                    dataVocher.map((data) => 
                      <CardView
                       key={data.id}
                       data={data}
                      />
                    )
                  }
                  <View
                    style={{width:10}}
                  />
             </ScrollView>

          </View>
  			</View>
        </ScrollView>
     </SafeAreaView> 
		)
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: BACK_GROUND_DEFAULT
  },
  boxContent:{
    flex: 1,
    marginHorizontal:10,
  },
  boxContent2:{
    flex: 1,
  },
  textboxContent:{
    marginVertical:10,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  textCenter: {
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({
  gateProps: state.gateProps

});

const ActionCreators = Object.assign(
  {},
  pageActions,
)

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(ActionCreators, dispatch),

// });

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: bindActionCreators(ActionCreators, dispatch),  
  }
};

export default connect(state => mapStateToProps, mapDispatchToProps)(HomeScreen);
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
