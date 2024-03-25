import React, {ReactNode} from 'react';
import {SafeAreaView, View, ViewStyle} from 'react-native';

interface Props {
  children: ReactNode;
  contentStyle?: ViewStyle;
  action?: ReactNode;
}

export const Container = ({children}: Props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>{children}</View>
    </SafeAreaView>
  );
};
