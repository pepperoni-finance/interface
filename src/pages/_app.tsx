import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Web3Provider } from "../components/Web3Provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <div className="mx-4">
        <Component {...pageProps} />
      </div>
    </Web3Provider>
  );
}

export default MyApp;
