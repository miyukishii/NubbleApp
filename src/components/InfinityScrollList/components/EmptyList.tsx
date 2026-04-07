import { ActivityIndicator } from '../../UI/ActivityIndicator/ActivityIndicator';
import { Box } from '../../UI/Box/Box';
import { Button } from '../../UI/Button/Button';
import { Text } from '../../UI/Text/Text';

export interface EmptyListProps {
  loading: boolean,
  error: boolean | null,
  reloadData: () => void,
  onLoadErrorText: string,
  onEmptyText: string
}

export function EmptyList({
  loading,
  error,
  reloadData,
  onLoadErrorText,
  onEmptyText
}: EmptyListProps) {
  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator color="primary" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" gap="s16">
        <Text preset="paragraphMedium" bold>{onLoadErrorText}</Text>
        <Button title="recarregar" onPress={() => reloadData()} preset="outline" />
      </Box>
    );
  }
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text preset="paragraphMedium" bold>{onEmptyText}</Text>
    </Box>
  );
}
