import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export enum ButtonTypes {
  Primary = 'Primary',
  Text = 'Text',
  PrimaryOutline = 'PrimaryOutline',
  OrangeOutline = 'OrangeOutline'
}

export interface Props {
  children?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  type?: ButtonTypes;
  disabled?: boolean;
  loading?: boolean;
  color?: any;
}
