import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8 * 1,
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 8 * 2,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    borderRadius: 3,
  },
  closeButton: {
    padding: 0,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 25,
    lineHeight: 25,
  },
  content: {
    width: '100%',
  },
});
