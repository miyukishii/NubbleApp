import React from "react";
import { Linking, Platform } from "react-native";

import { PermissionType } from "../../services/permission/permissionType";
import { usePermission } from "../../services/permission/usePermission";
import { Screen } from "../Screen/Screen";
import { ActivityIndicator } from "../UI/ActivityIndicator/ActivityIndicator";
import { Box } from "../UI/Box/Box";
import { Button } from "../UI/Button/Button";
import { Text, TextProps } from "../UI/Text/Text";

interface PermissionManagerProps {
  permissionType: PermissionType;
  description: string;
  children: React.ReactElement;
}

export function PermissionManager(
  {
    permissionType,
    description,
    children,
  }: PermissionManagerProps
): React.JSX.Element {
  const { loading, permissionStatus } = usePermission(permissionType)

  if (permissionStatus === 'granted') {
    return children;
  }

  return (
    <Screen
      canGoBack
      flex={1}
    >
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <Text
          preset="headingSmall"
          textAlign="center"
        >
          {description}
        </Text>
        {loading && <ActivityIndicator color="primary" />}
        {permissionStatus === 'unavailable' && (
          <Text {...$StyleText}>
          Esse recurso não está disponível para este disponsitivo
          </Text>
        )}
        {permissionStatus === 'never_ask_again' && (
          <Box>
            {Platform.OS === 'android' && (
              <Text {...$StyleText}>
              É necessário abrir e fechar o App novamente após alterar as configurações
              </Text>
            )}
            <Button
              title="Abrir Configurações"
              onPress={Linking.openSettings}
              mt="s16"
            />
          </Box>
        )}
      </Box>
    </Screen>
  )
}

const $StyleText: TextProps = {
  preset: "paragraphMedium",
  color: "error",
  bold: true,
  marginVertical: "s16",
  textAlign: "center",
};
