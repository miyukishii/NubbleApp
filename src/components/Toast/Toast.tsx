import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { useToast } from '../../services/toast/useToast';

import { ToastUI } from './components/ToastUI';

const DEFAULT_DURATION = 4000;

export function Toast(): React.JSX.Element | null {
  const { toast, hideToast } = useToast();

  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const onStartAnimation = (): void => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const onEndAnimation = (callback: Animated.EndCallback): void => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start(callback);
  };

  useEffect(() => {
    if (toast) {
      onStartAnimation();

      setTimeout(() => {
        onEndAnimation(hideToast);
      }, toast.duration || DEFAULT_DURATION);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, hideToast]);

  if (!toast) {
    return null;
  }
  return (
    <Animated.View {...$boxStyled} style={{ opacity: fadeAnimation }}>
      <ToastUI toast={toast} />
    </Animated.View>
  );
}

const $boxStyled = {
  position: 'absolute',
  alignSelf: 'center',
  top: 60,
  maxWidth: '90%',
};
