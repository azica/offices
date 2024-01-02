import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "tw-elements-react/dist/css/tw-elements-react.min.css";

import Alert from "@/ui/Alert/Alert";

import App from "./App";
import { store } from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
declare module "notistack" {
  interface VariantOverrides {
    success: {
      description?: string;
      point?: boolean;
    };
    error: {
      description?: string;
      point?: boolean;
    };
    contora: {
      description?: string;
      point?: boolean;
    };
  }
}

root.render(
  <Provider store={store}>
    <SnackbarProvider
      Components={{
        success: Alert,
        error: Alert,
        contora: Alert,
        warning: Alert,
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      maxSnack={4}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SnackbarProvider>
  </Provider>,
);
