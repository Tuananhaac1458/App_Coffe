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
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { Input, Button, Icon, Tooltip, SocialIcon, Image } from 'react-native-elements';
import { WriteFromLocalDB } from '../helpers/AsyncStorage';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../img/bg_screen4.jpg');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired,
};

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
    };

    this.selectCategory = this.selectCategory.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  validateEmail(email) {
    // var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
               var re = /(09[1|2|4|6|7|8|0|3|9]|08[1|2|3|4|5|8|6|9]|07[0|7|8|9|6]|03[2|3|4|5|6|7|8|9]|05[6|8|9])+([0-9]{7})\b/g;
    return re.test(email);
  }

  login() {
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
      });
    }, 1500);
  }

  signUp() {
    const { email, password, passwordConfirmation } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
        isConfirmationValid:
          password === passwordConfirmation || this.confirmationInput.shake(),
      });
    }, 1500);
  }

  textUnderline = (text) => {
    return(
        <Text style={{textDecorationLine: 'underline'}}>{text}</Text>
    )
  }
  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      password,
      passwordConfirmation,
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;

    return (
      <View style={styles.container}>
        <StatusBar 
            barStyle="light-content" 
            backgroundColor= 'transparent'
            translucent={true}
        />
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <ScrollView style={{}}>
          <View style={styles.loginContainer}>
            
              <View style={{paddingHorizontal:15}}>
              <View style={{ alignItems:'flex-end', marginTop:10}}>
                  <Button
                    titleStyle={{color:'white',textDecorationLine: 'underline'}}
                    containerStyle={{width:120,alignItems:'flex-end'}}
                    title="Skip"
                    type="clear"
                    onPress={() => {
                      WriteFromLocalDB('skiplogin','true').then(() => {
                        this.props.navigation.navigate('Dashboard')
                      })
                    }}
                  />
              </View>

              <View style={styles.titleContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.titleText}>AMERICANO</Text>
                </View>
                <View style={{ marginTop: -10, marginLeft: 10 }}>
                  <Text style={styles.titleText}>ACADEMY</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  disabled={isLoading}
                  type="clear"
                  activeOpacity={0.7}
                  onPress={() => this.selectCategory(0)}
                  containerStyle={{ flex: 1 }}
                  titleStyle={[
                    styles.categoryText,
                    isLoginPage && styles.selectedCategoryText,
                  ]}
                  title={'Login'}
                />
                <Button
                  disabled={isLoading}
                  type="clear"
                  activeOpacity={0.7}
                  onPress={() => this.selectCategory(1)}
                  containerStyle={{ flex: 1 }}
                  titleStyle={[
                    styles.categoryText,
                    isSignUpPage && styles.selectedCategoryText,
                  ]}
                  title={'Sign up'}
                />
              </View>
              <View style={styles.rowSelector}>
                <TabSelector selected={isLoginPage} />
                <TabSelector selected={isSignUpPage} />
              </View>
              <View style={styles.formContainer}>
                <Input
                  leftIcon={
                    <View style={{width:25, height:25, alignItems:'center', justifyContent:'center'}}>
                      <Image
                        source={require('../img/flagVN.jpg')}
                        style={{ width: 25, height: 18 }}
                      />
                    </View>
                  }
                  value={email}
                  keyboardAppearance="light"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={'(+84) Phone number'}
                  containerStyle={{
                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                  }}
                  ref={input => (this.emailInput = input)}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={email => this.setState({ email })}
                  errorMessage={
                    isEmailValid ? null : 'Please enter a valid phone number'
                  }
                />
                <Input
                  leftIcon={
                    <Icon
                      name="lock"
                      type="simple-line-icon"
                      color="rgba(0, 0, 0, 0.38)"
                      size={25}
                      style={{ backgroundColor: 'transparent' }}
                    />
                  }
                  value={password}
                  keyboardAppearance="light"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  returnKeyType={isSignUpPage ? 'next' : 'done'}
                  blurOnSubmit={true}
                  containerStyle={{
                    marginTop: 16,
                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                  }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={'Password'}
                  ref={input => (this.passwordInput = input)}
                  onSubmitEditing={() =>
                    isSignUpPage ? this.confirmationInput.focus() : this.login()
                  }
                  onChangeText={password => this.setState({ password })}
                  errorMessage={
                    isPasswordValid
                      ? null
                      : 'Please enter at least 8 characters'
                  }
                />
                {isSignUpPage && (
                  <Input
                    icon={
                      <Icon
                        name="lock"
                        type="simple-line-icon"
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    value={passwordConfirmation}
                    secureTextEntry={true}
                    keyboardAppearance="light"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType={'done'}
                    blurOnSubmit={true}
                    containerStyle={{
                      marginTop: 16,
                      borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                    }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={'Confirm password'}
                    ref={input => (this.confirmationInput = input)}
                    onSubmitEditing={this.signUp}
                    onChangeText={passwordConfirmation =>
                      this.setState({ passwordConfirmation })
                    }
                    errorMessage={
                      isConfirmationValid
                        ? null
                        : 'Please enter the same password'
                    }
                  />
                )}
                <Button
                  buttonStyle={styles.loginButton}
                  containerStyle={{ marginTop: 32, flex: 0 }}
                  activeOpacity={0.8}
                  title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                  onPress={isLoginPage ? this.login : this.signUp}
                  titleStyle={styles.loginTextButton}
                  loading={isLoading}
                  disabled={isLoading}
                />

              </View>
           <SocialIcon
              title='Sign In With Facebook'
              button
              type='facebook'
            />
             <SocialIcon
               title='Sign In With Google'
              button
                    type="google-plus-official"
                    
                  />
              <View style={styles.helpContainer}>
              <Tooltip
                width={SCREEN_WIDTH*3/4}
                height={100}
                withOverlay={false}
                backgroundColor={'rgba(232, 147, 142, 1)'}
                popover={<View>
                    {
                      (isSignUpPage) ?
                        (
                          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            <Text style={{color:'white', fontSize:15}}>
                              Present we support signUp with google account and facebook account. Everything please contact 
                            </Text>
                            {this.textUnderline('americanoacademy.hotro@gmail.com')}
                          </View>
                        ) : 
                        (
                          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            <Text style={{color:'white', fontSize:15}}>
                              {`Send email to `}  
                            </Text>
                            {this.textUnderline('americanoacademy.hotro@gmail.com')}
                            <Text style={{color:'white', fontSize:15}}>
                              by email registered if you forget password.
                          </Text>
                          </View>
                          
                        )
                                
                    }
                  </View>
              }>
                <Text
                  underlayColor="transparent"
                  buttonStyle={{ backgroundColor: 'transparent' }}
                  style={{color: 'white', fontSize:15, fontWeight:'bold'}}
                >Need help ?</Text>
              </Tooltip>
            </View>
            </View>      
          
          </View>
        </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  titleContainer: {
    height: 120,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems:'center'
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH -30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'light',
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
  helpContainer: {
    height: 64,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});