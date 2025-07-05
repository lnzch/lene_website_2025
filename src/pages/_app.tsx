import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {ProjectStoreProvider} from "@/store/storeProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ProjectStoreProvider>
        <Component {...pageProps} />
      </ProjectStoreProvider>
  )
}
