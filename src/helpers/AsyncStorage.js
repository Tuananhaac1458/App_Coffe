import AsyncStorage from '@react-native-community/async-storage';


export const WriteFromLocalDB = async (key, value) => {
   return await AsyncStorage.setItem(key , value)
} 


export const ReadFromLocalDB = async (key) => {
   return await AsyncStorage.getItem(key)
}

