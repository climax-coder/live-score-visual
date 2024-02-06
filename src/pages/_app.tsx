import "@fortawesome/fontawesome-free/css/all.min.css";
import GlobalStyles from "@/styles/GlobalStyles";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}
