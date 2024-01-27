import {
  UseQueryResult,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export default function useCustomQuery(
  endpoint: string,
  options: UseQueryOptions
): UseQueryResult {
  const queryResults = useQuery({
    ...options,
    queryFn: () => fetch(endpoint).then((res) => res.json()),
  });
  return queryResults;
}
