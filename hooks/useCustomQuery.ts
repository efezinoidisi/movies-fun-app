import {
  QueryFunction,
  QueryKey,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

export default function useCustomQuery(
  queryKey: QueryKey,
  queryFn: QueryFunction
): UseQueryResult {
  const queryResults = useQuery({ queryKey, queryFn });
  return queryResults;
}
