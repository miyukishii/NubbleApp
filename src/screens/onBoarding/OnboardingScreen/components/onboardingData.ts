import { ImageProps } from "react-native";
import { images } from "../../../../assets";

export type PageItem = {
  imageHeader: {
    light: ImageProps['source'];
    dark: ImageProps['source'];
  }
  content: {
    title: Array<{ text: string, highlight: boolean}>;
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
      title: [
        { text: 'Uma rede social de ', highlight: false },
        { text: 'conexões reais', highlight: true },
      ],
      subtitle: 'Fique por dentro do que acontece com as pessoas que você mais gosta',
    },
  },
  {
    imageHeader: {
      light: images.onBoardingLight2,
      dark: images.onBoardingDark2,
    },
    content: {
      title: [
        { text: 'Compartilhe suas ', highlight: false },
        { text: 'histórias ', highlight: true },
        { text: 'com seus amigos próximos', highlight: false },
      ],
      subtitle: 'Tenha sua linha do tempo personalizada',
    },
  },
  {
    imageHeader: {
      light: images.onBoardingLight3,
      dark: images.onBoardingDark3,
    },
    content: {
      title: [
        { text: 'Interaja ', highlight: true },
        { text: 'em tempo real com as pessoas', highlight: false },
      ],
      subtitle: 'Curta, comente e favorite os conteúdos que você mais gostar',
    },
  },
]
