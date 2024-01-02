import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFetchLegalFormsQuery } from "@/store/services/client.query";

export const useLegalFormOptions = () => {
  const navigate = useNavigate();

  const [legalFormOptions, setLegalFormOptions] = useState<Option[]>([]);

  const fetchLegalForms = useFetchLegalFormsQuery();

  useEffect(() => {
    if (fetchLegalForms.isSuccess && fetchLegalForms.data) {
      const options = (fetchLegalForms.data as Response.LegalFormsResponse)?.results.map((el) => ({
        name: el.name,
        value: el.id,
      }));
      if (options.length > 0) {
        setLegalFormOptions(options);
      }
    }

    fetchLegalForms.isError && navigate("/not-found");
  }, [fetchLegalForms]);

  return { legalFormOptions };
};

export default useLegalFormOptions;
