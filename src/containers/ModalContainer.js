import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert,SafeAreaView } from 'react-native';
import HeaderBar from './HeaderBar';
import { WebView } from 'react-native-webview';
import { PropTypes } from 'prop-types';
import Loading from '../components/Loading'

///////////////////////////////////////


export default class ModalContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        onLoadModal: true,
      }
      
  }




  onLoadWeb = () => {
    console.log('onLoadWeb')
    this.setState({onLoadModal: false})    
  }
  onErrorWeb = () => {
    console.log('onLoadWeberrr')
  }
  rederContent = (dataRender) => {
    const { dataCotent, type } = dataRender;
    if( type === 'news'){
      return(
        <View style={{flex: 1}}>
             <Loading
              onLoading={this.state.onLoadModal}
              style={{flex: 1}}
             >
              <WebView
                source={{ uri: dataCotent.url }}
                onLoad={() => this.onLoadWeb()}
                onError={() => this.onErrorWeb()}
                style={{
                  flex: 1,
                  width:'100%'
                }}
              />
             </Loading>
        </View>        
      )
    }
   
  }



  componentDidUpdate(prevProps, prevState) {
    if(prevProps.visible && !this.props.visible && !this.state.onLoadModal){
      this.setState({onLoadModal:true})
    }
  }
  render(){
    // console.log('Modal render')
    const { visible, setVisiModal, content, dataRender } = this.props;
    return (visible) ? (
      <SafeAreaView>
      <View
        style={{
          flex:1,
          backgroundColor:'red',
        }}
        >
        <Modal
          animationType="fade"
          presentationStyle="fullScreen"
          transparent={false}
          visible={visible}
          onRequestClose={() => {
            setVisiModal();
            
          }}>
          <View>
          <HeaderBar 
              functionArrowleft={setVisiModal}
              title={(dataRender.dataHeader.title) ? (dataRender.dataHeader.title) : ''}  
              onLoading={(dataRender.dataHeader.onload) ? (this.state.onLoadModal) : false}
              typeArrow = {(dataRender.dataHeader.typeArrow) ? (dataRender.dataHeader.typeArrow) : 'arrow'}
            />
          </View>

          <View
            style={{flex:1}}   
          >  
            { (content) ? (content()) : (this.rederContent(dataRender)) }
          </View>
        </Modal>
      </View>
      </SafeAreaView>
    ) : null
  }
}

ModalContainer.defaultProps = {
  dataRender: {
    type: 'none',
    dataHeader:{},
    dataCotent:{}
  }
}

ModalContainer.propTypes = {
  dataRender: PropTypes.shape({
    type: PropTypes.string,
    dataHeader:PropTypes.object,
    dataCotent:PropTypes.object,
  })
};