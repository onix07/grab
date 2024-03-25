import React, {FC} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {Text} from 'react-native';

import {ButtonTypes, Props} from './button.types';
import {styles} from './button.style';
import {branding} from '../../utils/branding';

const Button: FC<Props> = ({
  children,
  onPress,
  style,
  disabled,
  loading,
  type,
  color,
}) => {
  const containerStyle = {
    [ButtonTypes.Primary]: styles.primaryBtn,
    [ButtonTypes.Text]: styles.textBtn,
    [ButtonTypes.PrimaryOutline]: styles.primaryOutline,
  };

  const textStyle = {
    [ButtonTypes.Primary]: styles.text,
    [ButtonTypes.Text]: styles.text,
    [ButtonTypes.PrimaryOutline]: styles.primaryOutlineText,
  };

  const indicatorColor = {
    [ButtonTypes.Primary]: branding.color.white,
    [ButtonTypes.Text]: branding.color.white,
    [ButtonTypes.PrimaryOutline]: branding.color.green,
    [ButtonTypes.OrangeOutline]: branding.color.orange,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      disabled={disabled || loading}>
      {loading && (
        <ActivityIndicator size="small" style={styles.activityIndicator} />
      )}
      {typeof children === 'string' ? (
        <Text style={{color: `${color}`}}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;
