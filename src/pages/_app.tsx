import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "@/assets/styles/globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import SignIn from "./sign-in";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <div className="user-button absolute top-5 right-5 z-50">
        <UserButton />
      </div>
      <Provider store={store}>
        <NextNProgress color="#b8b8b8" />
        <Component {...pageProps} />
      </Provider>
      {/* <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <div className="user-button absolute top-5 right-5 z-50">
          <UserButton />
        </div>
        <Provider store={store}>
          <NextNProgress color="#b8b8b8" />
          <Component {...pageProps} />
        </Provider>
      </SignedIn> */}
    </ClerkProvider>
  );
}
