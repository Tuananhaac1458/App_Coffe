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
  Animated
} from 'react-native';
import { PropTypes } from 'prop-types';
import { 
    Header
  } from 'react-navigation'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CardViewProduct from '../components/CardViewProduct'
import Invoice from './Invoice'

//////////////////////////////

import  { BACK_GROUND_DEFAULT, COLOR_HIGTHPERLINK } from '../util/ValueString';
////////////////////////// 
import data from "../dataDemo/dataNew"; 

// const dataProductStore = data.dataProductStore;



////////////////////////// Import Redux ////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OderDetailAction from '../redux/actions/OderDetail';
/////////////////////////////////////////////////////////


const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 


class ScrollViewOder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload : true,
    }
  }


  log = () => {
    console.log("data default ===>", this.dataProduct[0])
    // this.setState({
    //   reload: !this.state.reload
    // })
  }
  render(){
    console.log("123")
    const HeaderHight = Header.HEIGHT;
    const { dataProductStore, navigation } = this.props;
    return(
        <View style={{flex:1,position:'relative'}}>
          {(dataProductStore.length > 0) ? 
            (
              <ScrollableTabView
                tabBarInactiveTextColor={'#AEAEAE'}
                tabBarActiveTextColor={'black'}
                tabBarUnderlineStyle={{backgroundColor:COLOR_HIGTHPERLINK, borderRadius: 10 ,height: 3}}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar 
                    style={{backgroundColor:'white'}}
                    tabStyle={{width:widthDefalt/3}}
                  />}
                >
                  {
                    dataProductStore.map((element, index) => {
                      return(
                          <View key={element.id} tabLabel={element.tabLabel} style={{ flex:1,backgroundColor:'white'}}>
                            <ScrollView>
                              <View style={{flexDirection: 'row', flexWrap: 'wrap',justifyContent:'space-between',paddingHorizontal:widthDefalt*3/100}}>
                                {
                                  element.dataProduct.map((element, index) => {
                                      return(
                                        <CardViewProduct
                                          key = {element.id}
                                          dataProduct2 =  {element}
                                          log = {this.log}
                                          setOderDetail = {this.props.dispatch.setOderDetail}
                                        />
                                      )
                                  })
                                }   
    
                              </View>
                            </ScrollView>
                          </View>
                      )    
                    })
    
                  }
                </ScrollableTabView>
              ) : (
                 <Image
                  style={{height: "100%", width: "100%"}}
                  source={require('../img/notfound.gif')}
                />
              )
          }

          
            <View
              style={styles.boxInvoice}
            >
              <Invoice
                navigation={navigation}
              />
          </View>

        </View>
    )
  }

}

ScrollViewOder.defaultProps = {
}

ScrollViewOder.propTypes = {
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: widthDefalt,
  },
  boxInvoice:{
    position:'absolute',
    bottom:10,
    alignItems: 'center',
    justifyContent:'center'
  },
});


// export default ScrollViewOder;

const mapStateToProps = state => ({
    oderDetail: state.oderDetail
});

const ActionCreators = Object.assign(
  {},
  OderDetailAction,
)

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(ActionCreators, dispatch),
// });

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: bindActionCreators(ActionCreators, dispatch),  
  }
};

export default connect(state => mapStateToProps, mapDispatchToProps)(ScrollViewOder);
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
