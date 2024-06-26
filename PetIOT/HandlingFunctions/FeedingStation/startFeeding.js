import axios from'axios';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

const FEED_AMOUNT= 200;

const EXPO_PUBLIC_API_URL="https://pet-iot-be.onrender.com";

export default async function startFeeding({stationName,station_id}){
    //GET USER TOKEN
    const accessToken = SecureStore.getItem('accessToken');
    
    const data = {
        "station_id": `${station_id}`,
        "feed_amount": FEED_AMOUNT
    }

    let config ={
        headers:{
            Authorization:`Bearer ${accessToken}`
        },
    }

    //SEND START FEEDING REQUEST
    await axios.post(`${EXPO_PUBLIC_API_URL}/v1/schedule/start`,data,config)
    .then(function(response){
        const data = response.data;
        if(data){
            Alert.alert(`Task complete on station ${stationName}`);
        }   else{
            Alert.alert(`Error happens on station ${stationName}`);
            return;
        }
    })
    .catch(function(error){
        const errorMessage = error.response?.data?.message || error.response?.statusText;
        console.error("Error:", errorMessage);
        Alert.alert(`Error on "${stationName}" `+errorMessage);
        return;
    })



}