// pages/_app.js
import { AppProps } from 'next/app';
import MainLayout from './layouts/MainLayout';

import './globals.css'; 

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MainLayout>
      <Component {...pageProps} /> {/* 各ページコンポーネントがここに挿入される */}
    </MainLayout>
  );
};

export default MyApp;
