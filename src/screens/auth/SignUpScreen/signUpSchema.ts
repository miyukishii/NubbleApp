import { z } from 'zod';

import { stringUtils } from '../../../utils/stringUtils';

const userNameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

export const signUpSchema = z.object({
  username: z.string().min(5, 'Username muito curto').regex(userNameRegex, 'Username inválido'),
  firstName: z.string().min(5, 'Nome muito curto').max(50, 'Nome muito longo').transform(value => stringUtils.capitalizeFirstLetter(value)),
  lastName: z.string().min(5, 'Nome muito curto').max(50, 'Nome muito longo').transform(value => stringUtils.capitalizeFirstLetter(value)),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
