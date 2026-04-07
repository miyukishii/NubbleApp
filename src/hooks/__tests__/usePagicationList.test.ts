import { renderHook, waitFor } from "test-utils";

import { PageParams } from "../../api/apiTypes";
import { usePaginationList } from "../../hooks/usePaginationList";
import { MetaDataPage, Page } from "../../types/pages";

const page1 = ['item1', 'item2', 'item3', 'item4'];
const page2 = ['item5', 'item6', 'item7', 'item8'];

function getList(pageParams: PageParams): Promise<Page<string>> {
  const data = pageParams.page === 1 ? page1 : page2;

  const meta: MetaDataPage = {
    total: 6,
    perPage: 3,
    currentPage: pageParams.page,
    lastPage: 2,
    firstPage: 1,
    hasNextPage: pageParams.page === 1,
    hasPreviousPage: pageParams.page === 2,
  }

  return Promise.resolve({ data, meta })
}

describe('usePaginationList', () => {
  it('returns all pages together and stops fetching if there are no more pages', async () => {
    const { result } = renderHook(() => usePaginationList(
      {
        queryKey: [''],
        getList
      }
    ));
    await waitFor(() => expect(result.current.dataList).toStrictEqual(page1))
    result.current.fetchNextPage();
    await waitFor(() => expect(result.current.dataList).toStrictEqual([...page1, ...page2]))
    result.current.fetchNextPage();
    await waitFor(() => expect(result.current.dataList).toStrictEqual([...page1, ...page2]))
  })
});
