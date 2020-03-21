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
  RefreshControl,
  StyleSheet,
  StatusBar,
  Alert
} from 'react-native';

import NotificationNetwork from '../components/NotificationNetwork';
import MapView, {
  ProviderPropType,
  Marker,
  AnimatedRegion,
  Geojson
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

////////////////////////// Import Redux ////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pageActions from '../redux/actions/pagelist';
////////////////////////////////////////////////////////////////////

////////////////////////////// Import Style //////////////// 
import { BACK_GROUND_DEFAULT, COLOR_DRIVER } from '../util/ValueString';
import { FuilterLoop, MakeArrayProductToTpye } from '../util/initArray'
import flagPinkImg from '../img/flag-blue.png';
////////////////////////////////////////////////////////////////////


const widthDefalt = Dimensions.get('window').width;
const heightDefalt = Dimensions.get('window').height; 
const myPlace = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [10.7679232, 106.6653034],
      },
    },
  ],
};


const ASPECT_RATIO = widthDefalt / heightDefalt;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;


function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

          initialPosition: null,
          lastPosition: null,
          longitude:106.6653034,
          latitude:10.7679232,
           region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          markers: [],
    }
  }
watchID: ?number = null;


  
  componentDidMount() {
    this._getPosition()
  }

  _getPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.parse(JSON.stringify(position));
        this.setState({
          initialPosition:initialPosition,
          longitude: initialPosition.longitude,
          latitude: initialPosition.latitude,
        });
      },
      error => {
        const a = JSON.parse(JSON.stringify(error));
        Alert.alert('Error', a.message)
     },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }
  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }
  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        },
      ],
    });
  }
  render(){

    console.log('initialPosition===>', this.state.initialPosition)
    console.log('lastPosition==>',this.state.lastPosition)

    return(
      <View style={styles.container}>
           <MapView
            style={styles.map}
            onPress={e => this.onMapPress(e)}
            initialRegion={{
              longitude: this.state.longitude,
              latitude: this.state.latitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
             {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
          </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  driver:{
    backgroundColor:COLOR_DRIVER,
    height: 1,
    width: widthDefalt
  },
  map:{
    width:widthDefalt,
    height:heightDefalt
  }
});



export default MapScreen;