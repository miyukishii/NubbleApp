import { setupServer } from 'msw/node';

import { postCommentHandlers } from './PostComment/postCommentHandler';
import { userHandlers } from './User/userHandlers';

export const server = setupServer(...postCommentHandlers, ...userHandlers)
