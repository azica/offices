import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFetchEmployeesQuery } from "@/store/services/employee.query";

export const useEmployeeOptions = (officeId: number) => {
  const navigate = useNavigate();

  const [employeeOptions, setEmployeeOptions] = useState<Option[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Option>({} as Option);
  const fetchedEmployees = useFetchEmployeesQuery({ officeId, query: "" });

  useEffect(() => {
    if (fetchedEmployees.isSuccess && fetchedEmployees.data) {
      const options: Option[] = [];
      (fetchedEmployees.data as Response.EmployeeResponse)?.results.forEach((el) => {
        options.push({
          id: Number(el.id),
          name: String(el.fullName),
          value: Number(el.id),
        });
      });

      if (options.length > 0) {
        setEmployeeOptions(options);
        setSelectedEmployee(options[0]);
      }
    }
    fetchedEmployees.isError && navigate("/not-found");
  }, [fetchedEmployees]);

  return { employeeOptions, selectedEmployee };
};

export default useEmployeeOptions;
