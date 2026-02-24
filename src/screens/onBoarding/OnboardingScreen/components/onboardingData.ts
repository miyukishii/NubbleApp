import { ImageProps } from "react-native";
import { images } from "../../../../assets";

export type PageItem = {
  imageHeader: {
    light: ImageProps['source'];
    dark: ImageProps['source'];
  }
  content: {
    title: string;
    subtitle: string;
  }
}

export const onBoardingPages: PageItem[] = [
  {
    imageHeader: {
      light: images.onBoardingLight1,
      dark: images.onBoardingDark1,
    },
    content: {
      title: 'Uma rede social de conexões reais',
      subtitle: 'Fique por dentro do que acontece com as pessoas que você mais gosta',
    },
  },
  {
    imageHeader: {
      light: images.onBoardingLight2,
      dark: images.onBoardingDark3,
    },
    content: {
      title: 'Compartilhe suas histórias com seus amigos próximos',
      subtitle: 'Tenha sua linha do tempo personalizada',
    },
  },
  {
    imageHeader: {
      light: images.onBoardingLight3,
      dark: images.onBoardingDark3,
    },
    content: {
      title: 'Interaja em tempo real com as pessoas',
      subtitle: 'Curta, comente e favorite os conteúdos que você mais gostar',
    },
  },
]
