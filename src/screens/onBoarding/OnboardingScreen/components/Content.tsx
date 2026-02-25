import { Text } from '../../../../components/UI/Text/Text';
import { Box } from '../../../../components/UI/Box/Box';
import { PageItem } from './onboardingData';

type ContentProps = Omit<PageItem, 'imageHeader'>;

export function Content({ content }: ContentProps) {
  return (
    <Box>
      {
        content.title.map(({ text, highlight }) => (
          <Text
            preset='headingLarge'
            key={text}
            color={highlight ? 'carrotSecondary' : 'backgroundConstrast'}
          >
            {text}
          </Text>
        ))
      }
      <Text preset='paragraphLarge' mt='s16'>
        {content.subtitle}
      </Text>
    </Box>
  );
}
