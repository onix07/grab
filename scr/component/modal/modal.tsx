import React from 'react';
import { Modal as RNModal, View, TouchableOpacity, Text } from 'react-native';

import { Props } from './modal.types';
import { styles } from './modal.styles';

const Modal: React.FC<Props> = ({ visible, onClose, children, closeVisible = true, itemID }) => {
  return (
    <View>
      <RNModal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {closeVisible ? (
              <View style={{ width: '100%' }}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>x</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <View style={styles.content}>{children}</View>
          </View>
        </View>
      </RNModal>
    </View>
  );
};

export default Modal;
