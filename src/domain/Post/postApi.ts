import { api } from '../../api/apiConfig';
import { PageAPI, PageParams } from '../../api/apiTypes';

import { PostAPI } from './postTypes';


async function getList(params: PageParams): Promise<PageAPI<PostAPI>> {
  // const response = await fetch('http://localhost:3333/user/post', {
  //   method: 'GET',
  //   headers: {
  //     Authorization:
  //       'Bearer MTg.11kgOR0044OppW7mwRNfuH7FtgRC9NSaMK1uXdtN_J_llIsyB-f31SCQOCT0',
  //   },
  // });

  // const data: PageAPI<PostAPI> = await response.json();
  // console.log('FETCH DATA:', JSON.stringify(data, undefined,2));

  const response = await api.get<PageAPI<PostAPI>>(
    'user/post',
    { params }
  );
  return response.data;
}

export const postApi = {
  getList,
};
