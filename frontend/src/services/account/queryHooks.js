import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchTransactionByExpense } from 'services/account/requests/get';

const usePaginatedTransactions = (bucketId, pageSize = 10) => {
    const query = useInfiniteQuery({
        queryKey: ['transactions', bucketId],
        queryFn: ({ pageParam = 1 }) => fetchTransactionByExpense(bucketId, pageParam, pageSize),
        enabled: !!bucketId,
        getNextPageParam: (lastPage, allPages) => {
            // Assuming lastPage.next contains the URL or page info for next page.
            // Return the next page number if available; otherwise undefined.
            return lastPage.next ? allPages.length + 1 : undefined;
        },
    });

    const loadMore = () => {
        if (query.hasNextPage) {
            query.fetchNextPage();
        }
    };

    // Flatten all page results
    const transactions = query.data
        ? query.data.pages.flatMap(page => page.results)
        : [];

    return {
        ...query,
        transactions,
        pagination: {
            loadMore,
            hasMore: query.hasNextPage,
            isLoadingMore: query.isFetchingNextPage,
        }
    };
};

export { usePaginatedTransactions };