import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { useAppSafeArea } from '../../hooks/useAppSafeArea';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Box, BoxProps } from '../UI/Box/Box';

import { ScreenHeader } from './components/ScreenHeader';
import { ScrollViewContainer, ViewContainer } from './components/ScrennContainer';
export interface ScreenProps extends BoxProps {
  children: React.ReactNode;
  canGoBack?: boolean;
  showGoBack?: boolean;
  scrollable?: boolean;
  title?: string;
  HeaderComponent?: React.ReactNode
}

export function Screen ({
  children,
  canGoBack = false,
  showGoBack = true,
  scrollable = false,
  title,
  style,
  HeaderComponent,
  ...boxProps
}: ScreenProps) {
  const {top, bottom} = useAppSafeArea();
  const {colors} = useAppTheme();
  const Container = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
      <Container backgroundColor={colors.background}>
        <Box paddingHorizontal="s24" style={[{paddingTop: top, paddingBottom: bottom}, style]} {...boxProps}>
          {canGoBack && (
            <ScreenHeader
              showGoBack={showGoBack}
              HeaderComponent={HeaderComponent}
              title={title}
            />
          )}
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}
