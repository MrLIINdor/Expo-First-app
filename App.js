import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Image } from 'react-native';



export default function App() {

  const[dataCiti, setDataCiti] = useState(null)
  const [nameCity, setNameCity] = useState("");
  const image = { uri: "https://wargm.ru/img/db/1f/e2/1fe26f69ce3590f980ea47451a944759.jpg" };

  

  function ranWeater(nameCity){
    const KEY = "ffab31f93b27f5216d5b88a6e908a6e7",
      URL_BASE = "https://api.openweathermap.org/data/2.5/"

    fetch(`${URL_BASE}weather?q=${nameCity}&units=metric&APPID=${KEY}`)
          .then(res => res.json())
          .then(result => {
            setDataCiti(result);
          })
    
  }

  function Deg(deg){
    if(deg > 1 && deg <= 45){
        return "Направление ветра: CВ"
    }else if(deg > 45 && deg <= 90){
        return "Направление ветра: В"
    } else if(deg > 90 && deg <= 135){
        return "Направление ветра: ЮВ"
    } else if(deg > 135 && deg <= 180){
        return "Направление ветра: Ю"
    } else if(deg > 180 && deg <= 225){
        return "Направление ветра: ЮЗ"
    } else if(deg > 225 && deg <= 270){
        return "Направление ветра: З"
    } else if(deg > 270 && deg <= 315){
        return "Направление ветра: СЗ"
    } else if(deg > 315 && deg <= 360){
        return "Направление ветра: С"
    }
  }



  function Sms(mainWether){
    switch(mainWether) {
      case 'Snow':
        return 'На улице снежок'
        break;

      case 'Rain':
        return 'На улице дождь'
        break;

      case 'Dust':
        return 'На улиуе пыльно'
       break;

      case 'Thunderstorm':
        return 'Сидите дома'
        break;

      case 'Drizzle':
        return 'Возмите зонтик'
        break;

      case 'Smoke':
        return 'На улице задымлённо'
        break;
      
      case 'Mist':
        return 'Ни черта не видно сэр'
        break;

      case 'Haze':
        return 'На улице Легкий туман'
        break;

      case 'Clear':
        return 'На улице четко, пора на улицу'
        break;

      case 'Clouds':
        return 'Облочно, вспоминается мультик)'
        break;
    }
  }



  function Change(text){
    setNameCity(text)
  }

  

  function Search(){
    ranWeater(nameCity)
    console.log(nameCity)
    console.log(dataCiti)
  }




  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.bgImag} resizeMode="cover">
        <TextInput style={styles.input} onChangeText={(value) => Change(value)} onSubmitEditing={Search}  placeholder='Search to city...' />
        {/* <StatusBar style="auto" /> */}

        <View style={styles.info}>
          <Image style={styles.image} source={ {uri: `https://openweathermap.org/img/wn/${dataCiti?.weather?.[0].icon}@2x.png`} }/>
          <Text style={styles.page}> {dataCiti?.name}  <Text style={styles.sup}> {dataCiti?.sys?.country} </Text>  </Text>
          <Text style={styles.page}> {dataCiti?.main?.temp} °C</Text>

          <Text style={styles.page}> {dataCiti?.weather?.[0].description} </Text>
          <Text style={styles.page}> {(dataCiti?.main?.humidity !== undefined) ? `Влажность: ${dataCiti?.main?.humidity}%` : ""} </Text>
          <Text style={styles.page}> {(dataCiti?.wind?.speed !== undefined) ? `Скорость ветра: ${dataCiti?.wind?.speed} метр/сек` : ""} </Text>
          <Text style={styles.page}> {Deg(dataCiti?.wind?.deg)} </Text>
        </View>

        <View style={styles.sms}> 
          <Text style={styles.page}> {Sms(dataCiti?.weather?.[0].main)} </Text>
        </View>

      </ImageBackground>
    </View>
    
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  input:{
    borderWidth: 1,
    padding: 10,
    borderColor: '#fff',
    borderRadius: 5,
    fontSize: 20,
    margin: 15,
    color: '#fff',
    textDecorationLine: 'none',
  },

  bgImag:{
    flex: 1,
    justifyContent: 'center',
  }, 

  page: {
    justifyContent: 'center',
    color: '#000',
    padding: 15,
    fontSize: 22,
    borderRadius: 20,
    fontWeight: '600',
  },

  image: {
    width: 100,
    height: 100,
  },

  info:{
    width: 300,
    height: 500,
    backgroundColor: '#fbfbfb',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

  sup:{
    padding: 20,
    borderRadius: 20,
    color: '#fff',
    backgroundColor: '#509465',
    justifyContent: 'center',
  },

  sms: {
    width: 300,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fbfbfb',
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  }
});
