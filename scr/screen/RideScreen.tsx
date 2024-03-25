import {StyleSheet, View} from 'react-native';
import {Container} from '../component/Container';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Text} from '../component/Text/Text';
import Button from '../component/button';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {PROVIDE_GOOGLE} from '../utils/provide';
import {useEffect, useState} from 'react';
import {IUser} from '../utils/model';
import {branding} from '../utils/branding';
import {setRideStatus} from '../store/rideSlice';
import Modal from '../component/modal/modal';

export const RideScreen = () => {
  // state
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [dataUser, setUser] = useState<IUser>();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {ride} = useSelector((state: RootState) => state.ride);
  const {driver} = useSelector((state: RootState) => state.driver);
  const {user} = useSelector((state: RootState) => state.users);

  const onCancel = () => {
    dispatch(setRideStatus('declined'));
    navigation.navigate('Driver' as never);
  };

  const onStart = () => {
    dispatch(setRideStatus('started'));
  };

  const onPickup = () => {
    dispatch(setRideStatus('picked-up'));
  };

  const onDropped = () => {
    dispatch(setRideStatus('dropped-off'));
    // const newUser = user.filter((item: IUser) => item.id !== ride.userId);
    // dispatch(setUser(newUser));
    // dispatch(setRide(null));
    setIsVisible(true);
    // navigation.navigate('Driver' as never);
  };

  const onDone = () => {
    setIsVisible(false);
    navigation.navigate('Driver' as never);
  };

  useEffect(() => {
    if (ride) {
      const userData = user.find((item: IUser) => item.id === ride.userId);
      setUser(userData);
    }
  }, [ride, user]);
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
          <Marker
            coordinate={
              ride.status === 'accepted' || ride.status === 'started'
                ? driver.location
                : ride.pickupLocation
            }
          />
          <Marker
            coordinate={
              ride.status === 'accepted' || ride.status === 'started'
                ? ride.pickupLocation
                : ride.destination
            }
          />
          <MapViewDirections
            origin={
              ride.status === 'accepted' || ride.status === 'started'
                ? driver.location
                : ride.pickupLocation
            }
            destination={
              ride.status === 'accepted' || ride.status === 'started'
                ? ride.pickupLocation
                : ride.destination
            }
            apikey={PROVIDE_GOOGLE}
            strokeWidth={5}
            strokeColor="hotpink"
          />
        </MapView>
      </View>

      <View style={mapyStyle.detailContainer}>
        <Text style={mapyStyle.textDetails}>{dataUser?.name}</Text>
        <View>
          <Text style={mapyStyle.textDetails}>
            Pick up location: {dataUser?.pickupLocation?.description}
          </Text>
          <Text style={mapyStyle.textDetails}>
            Destination: {dataUser?.destination?.description}
          </Text>
          <Text style={mapyStyle.textDetails}>Date: {ride?.pickupTime}</Text>
          <Text style={mapyStyle.textDetails}>Time: {ride?.timestamp}</Text>
        </View>
      </View>

      <View style={mapyStyle.btnContainer}>
        {console.log(ride)}
        {(ride.status === 'accepted' || ride.status === 'started') && (
          <Button style={mapyStyle.btnDecline} onPress={() => onCancel()}>
            Cancel
          </Button>
        )}
        {ride.status === 'accepted' && (
          <Button style={mapyStyle.btnStart} onPress={() => onStart()}>
            Start
          </Button>
        )}
        {ride.status === 'started' && (
          <Button style={mapyStyle.btnStart} onPress={() => onPickup()}>
            Picked Up
          </Button>
        )}
        {ride.status === 'picked-up' && (
          <Button style={mapyStyle.btnPicked} onPress={() => onDropped()}>
            Drop
          </Button>
        )}
      </View>

      <Modal visible={isVisible} onClose={() => setIsVisible(false)}>
        <View>
          <Text style={mapyStyle.thanksModal}>Hooray!!</Text>
          <Text style={mapyStyle.thanksText}>
            The passenger is now drop. Thank you for you service{' '}
          </Text>
        </View>
        <Button style={mapyStyle.btnPicked} onPress={() => onDone()}>
          Done
        </Button>
      </Modal>
    </Container>
  );
};

const mapyStyle = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
  },
  map: {
    height: 400,
    width: 400,
  },
  modal: {},
  detailContainer: {
    padding: 10,
  },
  textDetails: {
    fontSize: branding.font.md,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  btnStart: {
    backgroundColor: branding.color.green,
    color: '#fff',
    marginVertical: 5,
    padding: 15,
    width: '49%',
  },
  btnDecline: {
    backgroundColor: branding.color.red,
    color: '#fff',
    marginVertical: 5,
    padding: 15,
    width: '49%',
  },
  btnPicked: {
    backgroundColor: branding.color.green,
    color: '#fff',
    marginVertical: 5,
    padding: 15,
    width: '100%',
  },
  thanksModal: {
    fontSize: branding.font.xl,
    textAlign: 'center',
    marginBottom: 15,
  },
  thanksText: {
    fontSize: branding.font.lg,
    marginBottom: 10,
  },
});
