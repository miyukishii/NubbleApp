import { Box } from '../../../../components/UI/Box/Box';

type ProgressIndicatorProps = {
  total: number;
  currentIndex: number;
}

export function ProgressIndicator({
  total,
  currentIndex,
}:ProgressIndicatorProps) {
  return (
    <Box
      flexDirection='row'
      alignItems='center'
      gap='s12'
      marginTop='s48'
    >
      {Array.from({ length: total }).map((_, index) => (
        <Box
          key={index}
          width={index === currentIndex ? 14 : 8}
          height={index === currentIndex ? 14 : 8}
          borderRadius='r16'
          backgroundColor={index === currentIndex ? 'primary' : 'gray2'}
        />
      ))}
    </Box>
  );
}
