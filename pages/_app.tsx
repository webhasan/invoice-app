import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvoiceApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {

  return (
    <SessionProvider session={session}>
      <Layout>
        <Head>
          <title>Invoice App</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <ToastContainer position="top-center" autoClose={2000}/>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default InvoiceApp;
