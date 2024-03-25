import {Alert, Dimensions, StyleSheet, View} from 'react-native';

import {Text} from '../component/Text/Text';
import {Container} from '../component/Container';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {driverData, userData} from '../utils/data';
import {setDriver} from '../store/driverSlice';
import {RootState} from '../store/store';
import {setUser} from '../store/userSlice';
import {IRide, IUser} from '../utils/model';
import Modal from '../component/modal/modal';
import Button from '../component/button';
import {setRide} from '../store/rideSlice';
import {branding} from '../utils/branding';
import {format} from 'date-fns';

export const DriverScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {driver} = useSelector((state: RootState) => state.driver);
  const {user} = useSelector((state: RootState) => state.users);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [markerData, setMarkerData] = useState<IUser>();

  const onViewMarker = (data: IUser) => {
    setIsVisible(true);
    setMarkerData(data);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const onAccept = (data: IUser) => {
    const objectData: IRide = {
      id: Math.random(),
      userId: data.id,
      driverId: driverData.id,
      pickupLocation: {
        latitude: data.pickupLocation.latitude,
        longitude: data.pickupLocation.longitude,
      },
      destination: {
        latitude: data.destination.latitude,
        longitude: data.destination.longitude,
      },
      status: 'accepted',
      pickupTime: format(new Date(), 'dd-MM-yyyy'),
      timestamp: format(new Date(), 'h:mm a'),
    };

    dispatch(setRide(objectData));
    navigation.navigate('Ride' as never);
    setIsVisible(false);
  };

  const getNearbyPassenger = () => {
    if (userData.length > 0) {
      dispatch(setUser(userData));
    } else {
      Alert.alert('Passenger Request', 'No passanger nearby');
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      data => {
        const objData = {
          id: driverData.id,
          name: driverData.name,
          location: {
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          },
        };

        dispatch(setDriver(objData));
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  useEffect(() => {
    getNearbyPassenger();
  }, []);

  return (
    <Container>
      <View style={mapyStyle.container}>
        <MapView
          initialRegion={driver.location}
          style={mapyStyle.map}
          zoomControlEnabled={true}
          mapType={'standard'}
          showsUserLocation
          showsMyLocationButton
          provider={PROVIDER_GOOGLE}>
          {user.map((data: IUser, index: number) => (
            <Marker
              key={index}
              coordinate={data.pickupLocation}
              title={data.name}
              onPress={() => onViewMarker(data)}
            />
          ))}
        </MapView>
      </View>
      <Modal visible={isVisible} onClose={() => onClose()}>
        <View style={mapyStyle.modal}>
          <Text style={mapyStyle.textDetails}>{markerData?.name}</Text>
          <View>
            <Text style={mapyStyle.textDetails}>
              Pick up location: {markerData?.pickupLocation.description}
            </Text>
            <Text style={mapyStyle.textDetails}>
              Destination: {markerData?.destination.description}
            </Text>
          </View>
          <View style={mapyStyle.btnContainer}>
            <Button
              style={mapyStyle.btnDecline}
              onPress={() => setIsVisible(false)}>
              Cancel
            </Button>
            <Button
              style={mapyStyle.btnAccept}
              onPress={() => onAccept(markerData)}>
              Accept
            </Button>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

const mapyStyle = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  name: {
    fontSize: branding.font.md,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
  btnDecline: {
    backgroundColor: branding.color.red,
    color: '#fff',
    marginVertical: 5,
    padding: 15,
    width: '49%',
  },
  btnAccept: {
    backgroundColor: branding.color.green,
    padding: 15,
    width: '49%',
  },
  textDetails: {
    fontSize: branding.font.md,
    marginBottom: 5,
  },
});
