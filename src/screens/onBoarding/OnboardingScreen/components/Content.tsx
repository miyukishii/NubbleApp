import { Text } from '../../../../components/UI/Text/Text';
import { Box } from '../../../../components/UI/Box/Box';
import { PageItem } from './onboardingData';

type ContentProps = Omit<PageItem, 'imageHeader'>;

export function Content({ content }: ContentProps) {
  return (
    <Box>
      <Text preset='headingLarge'>
        {content.title}
      </Text>
      <Text preset='paragraphLarge'>{content.subtitle}</Text>
    </Box>
  );
}
