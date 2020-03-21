import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Switch,
  ActivityIndicator
} from 'react-native';
import { PropTypes } from 'prop-types';
import { ListItem, Divider, Input, Image, Button, Overlay } from 'react-native-elements';
////////////////////////// Import Redux ////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OderDetailAction from '../redux/actions/OderDetail';
//////////////////////////////
const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 
//////////////////////////////
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

import  { BACK_GROUND_DEFAULT } from '../util/ValueString';


const list = [
  {
    number: 'XXXXXXXX6789',
    expiry: '03/23'
  },
  {
    number: 'XXXXXXXX1234',
    expiry: '09/26'
  },
]


class AddPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useLiteCreditCardInput: false,
      loading:false 
    }
  }
  
  _onChange = (formData) => {
    const data = JSON.stringify(formData, null, " ");
    console.log('aaaaaaaa=>',JSON.stringify(formData, null, " "))
    if(data.valid){
      /// add card to listVisa
      console.log('123456')
    }
  };
  _onFocus = (field) => console.log("focusing", field);
  _setUseLiteCreditCardInput = (useLiteCreditCardInput) => this.setState({ useLiteCreditCardInput });

  componentWillUnmount(){
   
  }

  _onPressFinis = (e) => {
    const { callback } = this.props;
    console.log('aaaaaaaaaaa=>',e)
    callback()
  }

  render(){
    return(
      <View style={s.container}>
          <Overlay 
            overlayBackgroundColor={'rgba(255,255,255,0.5)'}
            fullScreen={true}
            isVisible={this.state.loading}>
            <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
              <ActivityIndicator 
                size="large" 
                color="#0000ff" 
              />
            </View>
          </Overlay>
         {
          (list) && (
              <View>
                <Text style={{paddingLeft:16,color:'black', fontSize:25, fontWeight: 'bold',}}>
                  List Card
                </Text>
                <Divider style={{ backgroundColor: 'white',height:10}}></Divider>
              {
                list.map((l, i) => (
                  <View key={i} style={{marginVertical:5}}>
                    <ListItem
                      leftAvatar={<Image
                          source={require('../img/visa.png')}
                          style={{ width: 50, height: 50 }}
                        />}
                      title={l.number}
                      titleStyle={{fontWeight: 'bold'}}
                      subtitleStyle={{fontWeight: 'bold'}}
                      subtitle={l.expiry}
                      bottomDivider
                      onPress={(e) => {
                        this.setState({
                          loading:true
                        })
                        setTimeout(() => {
                          this._onPressFinis(l)
                          this.setState({
                            loading:false
                          })
                        }, 2000)
                      }}
                    />
                  </View>

                ))
              }
              </View>
          )
         }
        <Text style={{paddingLeft:16,color:'black', fontSize:25, fontWeight: 'bold',}}>
            Add Card
        </Text>
        <Divider style={{ backgroundColor: 'white',height:10}}></Divider>


        <CreditCardInput
          autoFocus
          requiresName
          requiresCVC
          requiresPostalCode
          labelStyle={s.label}
          inputStyle={s.input}
          validColor={"black"}
          invalidColor={"red"}
          placeholderColor={"darkgray"}
          onFocus={this._onFocus}
          onChange={this._onChange} />
        
      </View>
          
      
    )
  }

}

AddPayment.defaultProps = {
 
}

AddPayment.propTypes = {
  
};

const s = StyleSheet.create({
 switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#F5F5F5",
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
  
});

const mapStateToProps = (state) => {
    return{
      oderDetail: state.oderDetail
    }
};

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

export default connect(state => mapStateToProps, mapDispatchToProps)(AddPayment);

// export default AddPayment;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
