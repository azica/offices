import { useSearchParams } from "react-router-dom";

export function useUpdateQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = new URLSearchParams(searchParams);
  const updateQuery = (query: string, newParams: string) => {
    queryParams.set(query, newParams);
    setSearchParams(queryParams.toString());
  };
  return updateQuery;
}
