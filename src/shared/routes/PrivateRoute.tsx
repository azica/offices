import { getTokensFromStorage } from "@/helpers/localStorage";

import Redirect from "./Redirect";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = getTokensFromStorage();

  return <>{token ? children : <Redirect link="/auth" />}</>;
};

export default PrivateRoute;
