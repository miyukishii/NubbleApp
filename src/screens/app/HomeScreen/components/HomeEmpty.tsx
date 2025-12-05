import { ActivityIndicator } from '../../../../components/UI/ActivityIndicator/ActivityIndicator';
import { Box } from '../../../../components/UI/Box/Box';
import { Button } from '../../../../components/UI/Button/Button';
import { Text } from '../../../../components/UI/Text/Text';

export function HomeEmpty({ loading, error, reloadData }: {loading: boolean, error: boolean | null, reloadData: () => void}) {
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
        <Text preset="paragraphMedium" bold>Não foi possível carregar o feed.</Text>
        <Button title="recarregar" onPress={() => reloadData()} preset="outline" />
      </Box>
    );
  }
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text preset="paragraphMedium" bold>Não há publicações no seu feed.</Text>
    </Box>
  );
}
