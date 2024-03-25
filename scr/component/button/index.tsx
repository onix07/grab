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
  type = ButtonTypes.Primary,
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
    [ButtonTypes.PrimaryOutline]: branding.color.darkGrey,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle[type], style]}
      disabled={disabled || loading}>
      {loading && (
        <ActivityIndicator
          color={indicatorColor[type]}
          size="small"
          style={styles.activityIndicator}
        />
      )}
      <Text style={textStyle[type]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
