import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import axios from '../assets/util/http';
import baseUrl from '../assets/baseUrl';
import {Icon} from 'react-native-elements';

export default function CountriesSelector(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        axios
          .get(`${baseUrl.url1}/VehicleOwner/GetCountryCode`)
          .then((res) => {
            // res
            const {
              data: {data},
            } = res;
            props.navigation.navigate('countries', {
              list: data,
              setCountryNumber: props.setCountryNumber,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRightWidth: 1,
          borderColor: '#ccc',
          paddingRight: 4,
          paddingVertical: 3,
        }}>
        <Icon name="mobile-alt" type="font-awesome-5" />
        <Text style={{marginLeft: 10, marginRight: 4, fontSize: 16}}>
          +{props.countryNumber}
        </Text>
        <Icon name="caret-down-outline" type="ionicon" size={16} />
      </View>
    </TouchableOpacity>
  );
}
