import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Layout from "@/layout/Layout/Layout";

import "@/assets/css/main.scss";
import { ErrorFallback } from "./components/blocks";
import { getTokensFromStorage } from "./shared/helpers";
import { useActions } from "./store/hooks";
import { useLazyGetUserQuery } from "./store/services/auth.query";

function App() {
  const { setUser } = useActions();
  const [trigger, triggerUserData] = useLazyGetUserQuery();
  const token = getTokensFromStorage();

  useEffect(() => {
    if (token) {
      trigger();
    }
  }, []);

  useEffect(() => {
    triggerUserData.isSuccess && setUser(triggerUserData.data as Model.User);
  }, [triggerUserData, setUser]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layout />
    </ErrorBoundary>
  );
}

export default App;
