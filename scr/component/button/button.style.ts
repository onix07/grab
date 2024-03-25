import {StyleSheet} from 'react-native';
import {branding} from '../../utils/branding';

export const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtn: {
    backgroundColor: branding.color.orange,
  },
  primaryOutline: {
    borderWidth: 1,
    borderColor: branding.color.orange,
  },
  primaryOutlineText: {
    textAlign: 'center',
    color: branding.color.orange,
  },
  textBtn: {
    backgroundColor: 'transparent',
  },
  text: {
    textAlign: 'center',
    color: branding.color.white,
  },
  activityIndicator: {
    marginLeft: -25,
    marginRight: 5,
  },
});
