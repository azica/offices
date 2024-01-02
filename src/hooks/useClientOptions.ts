import { useEffect, useState } from "react";

import { useFetchClientsQuery } from "@/store/services/client.query";

export const useClientOptions = (officeId: number) => {
  const [clientOptions, setClientOptions] = useState<Option[]>([]);
  const [selectedClient, setSelectedClient] = useState<Option>({} as Option);

  const fetchedClients = useFetchClientsQuery({ officeId, query: "?position=individualPerson" });

  useEffect(() => {
    if (fetchedClients.isSuccess && fetchedClients.data) {
      const options = (fetchedClients.data as Response.ClientsResponse)?.results.map((el) => ({
        name: String(el.name),
        value: Number(el.id),
      }));

      if (options.length > 0) {
        setClientOptions(options);
        setSelectedClient(options[0]);
      }
    }
  }, [fetchedClients]);

  return { clientOptions, selectedClient };
};

export default useClientOptions;
