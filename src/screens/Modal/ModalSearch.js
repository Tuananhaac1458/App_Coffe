import React, {Component} from 'react';
import {
  Modal,
  Text, 
  TouchableHighlight, 
  View,
  Alert,
  SafeAreaView,
  StatusBar,
  Dimensions,
  BackHandler ,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { WebView } from 'react-native-webview';
import { PropTypes } from 'prop-types';

import { Divider } from 'react-native-elements';

import { 
    Header
  } from 'react-navigation'
///////////////////////////////////////
import SearchBarx from '../../components/SearchBar'
import CardViewProduct from '../../components/CardViewProduct'
import  { xoa_dau } from '../../util/initArray';

////////////////////////// Import Redux ////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OderDetailAction from '../../redux/actions/OderDetail';
/////////////////////////////////////////////////////////

import Invoice from '../../containers/Invoice'

const HeadHight = Header.HEIGHT;
const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 
let type = '';
const heightBar = StatusBar.currentHeight;
const heightModal = heightDefalt;


class ModalSearch extends Component {
  constructor(props) {
      super(props);
      this.state = {
        onLoadModal: true,
        onFocusNow : false,
        textSearch:''
      }
      
  }

  onFocusNow = () => {
    this.setState({
      onFocusNow: true
    })
  }

  _onEndEditing = () => {
    this.setState({
      onFocusNow: false
    })
  }

  // function to search array using for loop
  isSearch(text, arr) {
    console.log('text===>',text)
    let arrReturn = [];
    if(text === ''){
      return []
    }
    let testSearch = xoa_dau(text).toLowerCase()
    arr.forEach((element) => {
      let nameSearch = xoa_dau(element.name).toLowerCase()
      if(nameSearch.indexOf(testSearch) === -1){
          return  
      }
        arrReturn.push(element)
    })
      return arrReturn
  }  


  _valueSearch = (text) => {
    this.setState({
      textSearch:text
    })
  }


  render(){
    const data = this.props.navigation.getParam('dataProductStore', {});
    const dataSearch = this.isSearch(this.state.textSearch, data)
    console.log('data=====>',this.state.textSearch)
    const { navigation } = this.props;
    return (
        <View style={{ flex:1}}>
          <View style={[styles.container,{height: HeadHight,  }]}>
            <SearchBarx
              onFocusNow={this.onFocusNow}
              _onEndEditing={this._onEndEditing}
              _value={this._valueSearch}
              navigation={this.props.navigation}
              textSearch = {this.state.textSearch}
            />

            <View style={{paddingLeft:10}}>
            
            </View>
        </View>

            { 
              (this.state.onFocusNow && this.state.textSearch === '') && <View style={{backgroundColor:'#eeeeee',}}>
              <View style={{paddingBottom:5,paddingHorizontal:10,}}>
                <Text style={{fontSize:18, fontWeight: 'bold',marginTop:5 }}>
                  Hot keys
                </Text>

                <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop:5,}}>
                    <TouchableHighlight
                      onPress={() => {this.setState({textSearch: 'Cappucinno'})}}
                      underlayColor="transparent"
                    >
                    <View style={{backgroundColor:'white', padding:4,  borderWidth: 1 ,borderColor:'#BAB3B2',borderRadius:10, alignItems:'center', marginLeft:5, marginBottom:5}}>
                      <Text style={{fontSize:15}}>
                        Cappucinno
                      </Text>
                    </View>
                    </TouchableHighlight>

                    <TouchableHighlight
                      onPress={() => {this.setState({textSearch: 'Matcha'})}}
                      underlayColor="transparent"
                    >
                    <View style={{backgroundColor:'white', padding:4,  borderWidth: 1 ,borderColor:'#BAB3B2',borderRadius:10, alignItems:'center', marginLeft:5, marginBottom:5}}>
                      <Text style={{fontSize:15}}>
                        Matcha
                      </Text>
                    </View>
                    </TouchableHighlight>

                    <TouchableHighlight
                      onPress={() => {this.setState({textSearch: 'Cold Brew'})}}
                      underlayColor="transparent"
                    >
                    <View style={{backgroundColor:'white', padding:4,  borderWidth: 1 ,borderColor:'#BAB3B2',borderRadius:10, alignItems:'center', marginLeft:5, marginBottom:5}}>
                      <Text style={{fontSize:15}}>
                        Cold Brew
                      </Text>
                    </View>
                    </TouchableHighlight>

                </View>
              </View>

                <Divider style={{ backgroundColor: 'white', height:2}} />

               <View style={{paddingHorizontal:10,}}>
                <Text style={{fontSize:18, fontWeight: 'bold', marginTop:5 }}>
                  Old searchs
                </Text>

                <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop:5, }}>
                     <TouchableHighlight
                      onPress={() => {this.setState({textSearch: 'Coffe'})}}
                      underlayColor="transparent"
                      >
                    <View style={{backgroundColor:'white', padding:4,  borderWidth: 1 ,borderColor:'#BAB3B2',borderRadius:10, alignItems:'center', marginLeft:5, marginBottom:5 }}>
                      <Text style={{fontSize:15}}>
                        Coffe
                      </Text>
                    </View>
                    </TouchableHighlight>

                </View>
              </View>

            </View>

            }

            <ScrollView>
            <View style={{flexDirection: 'row', flexWrap: 'wrap',justifyContent:'space-between',paddingHorizontal:widthDefalt*3/100}}>
                   {
                       dataSearch.map((element, index) => {
                          return(
                            <CardViewProduct
                              key = {element.id}
                              dataProduct2 =  {element}
                              log = {this.log}
                              navigation = {this.props.navigation}
                              setOderDetail = {this.props.dispatch.setOderDetail}
                            />
                          )
                      })
                  }
                
            </View>
             </ScrollView>
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

ModalSearch.defaultProps = {
  dataRender: {
    type: 'none',
    dataHeader:{},
    dataCotent:{}
  }
}

ModalSearch.propTypes = {
  dataRender: PropTypes.shape({
    type: PropTypes.string,
    dataHeader:PropTypes.object,
    dataCotent:PropTypes.object,
  })
};



const styles = StyleSheet.create({
  container:{
    width: widthDefalt, 
    padding:10,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'center',
    // To round image corners
    overflow: 'hidden',
    borderColor: '#999',
    // https://github.com/facebook/react-native/issues/10049#issuecomment-366426897
    backgroundColor: '#FFF',
    // Android shadow
    elevation: 4
  },
   boxInvoice:{
    position:'absolute',
    bottom:10,
    alignItems: 'center',
    justifyContent:'center'
  },

});

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

export default connect(state => mapStateToProps, mapDispatchToProps)(ModalSearch);
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
