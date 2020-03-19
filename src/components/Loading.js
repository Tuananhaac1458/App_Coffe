import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator,Animated,Text,Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import {COLOR_HIGTHPERLINK} from '../util/ValueString';


const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 
/**
 * TouchableHighlight follows RN's implementation
 */
export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.intervel = null
    this.state = {
      extraChildStyle: null,
      extraUnderlayStyle: null,
      animation: new Animated.Value(0),
      animation2: new Animated.Value(-200),
      progress: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.typeStyle && nextProps.typeStyle.name === 'CardView'){
      return true
    }
    if(nextProps.onLoading === false && this.props.onLoading === false){
      return false
    }
    return true
  }

  componentDidMount() {
    if(this.props.type === 'col'){
      this.animationTranform(this.state.animation2,1000)
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(!this.props.onLoading && this.props.type === 'col' && this.intervel !== null){
        clearInterval(this.intervel);
    }
  }

  componentWillUnmount() {
      if(this.intervel !== null){
        clearInterval(this.intervel);
      }
  }

  renderChildren() {
    if (!this.props.children) {
      return <View />;
    }

    const child = React.Children.only(this.props.children);
    return React.cloneElement(child, {
      style: StyleSheet.compose(
        child.props.style,
        this.state.extraChildStyle
      ),
    });
  }

  renderTypeLoading = (type,typeStyle) => {
    if(type === 'classic'){
      return(
        <ActivityIndicator size="large" color="white" />
      )
    }
    if(type === 'heightlight'){
      const spin = this.state.animation.interpolate({
        // inputRange: [0, 1],
        // outputRange: ['0deg', '360deg']
        inputRange: [0, 1],
        outputRange: [
            // primaryColor.includes('rgb') ? primaryColor : hex_to_rgba_1.default(primaryColor),
            // secondaryColor.includes('rgba') ? secondaryColor : hex_to_rgba_1.default(secondaryColor)
            this.props.primaryColor,this.props.secondaryColor
        ]
      });
      this.animationHeightLight(this.state.animation, 500);
        if(typeStyle.name === 'CardView'){
            return(
              <View style={{height:'100%', width: '100%',flex:1,justifyContent:'flex-start'}}>
                {this.renderLoadingCardView(spin)}
              </View>
            )    
        }
        return(
          <Animated.View
              style={{height:'100%', width: '100%', backgroundColor: spin}}
            />
        )
      
    }
    if(type === 'col'){
      return(
          <View>
              <Animated.View
                style={[
                  styles.square,
                  {
                    transform: [
                      {
                        translateX: this.state.animation2,
                      },
                    ],
                  },
                ]}
              />
          </View>
      )
    }
  }
 //////// render heightlight cardview ////////
  renderLoadingCardView = (spin) => {
    return(
           <View style={{flex:1}}>
              <Animated.View
              style={{height:'40%', width: '100%', backgroundColor: spin,borderRadius: 10,}}
            />
            
            <View
              style={{height:2, width: '100%', backgroundColor: 'white'}}
            />

            <View
              style={{flex:1,width: '100%', backgroundColor: 'white', alignItems:'center',justifyContent:'space-between',padding:10}}>
                <Animated.View
                  style={{height:'10%', width: '90%', backgroundColor: spin, borderRadius: 10,}}
                />
                
                <Animated.View
                  style={{height:'10%', width: '90%', backgroundColor: spin, borderRadius: 10,}}
                />
                
                 <Animated.View
                  style={{height:'10%', width: '90%', backgroundColor: spin, borderRadius: 10,}}
                />
                
                 <Animated.View
                  style={{height:'10%', width: '90%', backgroundColor: spin, borderRadius: 10,}}
                />
                
                 <Animated.View
                  style={{height:'10%', width: '90%', backgroundColor: spin, borderRadius: 10,}}
                />
                
            </View>
           </View>
    )
  }
////////////////////////////////////////////////



  animationHeightLight = (animation, duration) =>{
    Animated.loop(Animated.sequence([
        Animated.timing(animation, 
        {
            toValue: 1,
            duration
        }),
        Animated.timing(animation, {
            toValue: 0,
            duration,
        })
    ])).start();
  }



  animationTranform = (animation, duration) => {
    Animated.loop(Animated.timing(animation, {
      toValue: widthDefalt,
      duration: duration,
      useNativeDriver: true,
    })).start();
  }
///////////////////////////////////////////

  render() {
    console.log('Loading render',this.props)
    const { style = {}, onLoading, type, typeStyle } = this.props;
    const { extraUnderlayStyle } = this.state;
    return (
      <View
        style={[style, extraUnderlayStyle, {position:'relative', overflow: 'hidden',}]}
        >
        {
          onLoading ? 
          (
            <View
              style={styles.container}
            >
              {this.renderTypeLoading(type, typeStyle)}
            </View>
          ) : null
        }


        {this.renderChildren()}
      </View>
    );
  }
}

Loading.defaultProps = {
  onLoading: false,
  type: 'classic',
  styleType: {},
  primaryColor: 'rgba(204, 204, 204, 1)',
  secondaryColor: 'rgba(200, 200, 200, 1)',

}

Loading.propTypes = {
  onLoading: PropTypes.bool,
  type: PropTypes.string,
  typeStyle: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
  })
};


const styles = StyleSheet.create({
  container: {
    flex:1,
    height:'100%',
    position:'absolute',
    right:0,
    start:0,
    zIndex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(204, 204, 204, 1)',
    overflow: 'hidden',
  },
  text: {
    color: 'white'
  },
  square:{
    height: 2,
    width: 200,
    backgroundColor: COLOR_HIGTHPERLINK,
  }
});