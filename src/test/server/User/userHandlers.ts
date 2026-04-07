import { cloneDeep } from "lodash";
import { http, HttpResponse } from "msw";

import { BASE_URL } from "../../..//api/apiConfig"
import { PageAPI } from "../../../../src/api/apiTypes";
import { USERS_PATH } from "../../../domain/Users/userApi"
import { UserAPI } from "../../../domain/Users/userTypes";

import { mockedData } from "./mocks";

const FULL_URL = `${BASE_URL}${USERS_PATH}`

const inMemoryResponse = cloneDeep(mockedData.mockedUserResponse)
export const userHandlers = [
  http.get(FULL_URL, async () => {
    const response: PageAPI<UserAPI> = inMemoryResponse;

    return HttpResponse.json(response, { status: 200 })
  }),
  http.get<{userId: string}>(`${FULL_URL}/:userId`, async ({ params }) => {
    const userId = params.userId
    const userAPI = mockedData.userList.find((user) => user.id.toString() === userId);

    return HttpResponse.json(userAPI, { status: 200 })
  }),
]
