import { Geist } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import ClientLayout from "./layout/ClientLayout";
import { ToastContainer } from "react-toastify";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { mainTheme } from "@/theme/ant-theme";

const geist = Geist({
  subsets: ["latin"],
});
const geistSans = {
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
};
const geistMono = {
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
};

// src/app/layout.jsx

export const metadata = {
  metadataBase: new URL('https://cathysjewelry.net'), 
  title: {
    default: "Cathy’s Jewelry | Jewelry Store in Chicago",
    template: "%s | Cathy’s Jewelry"
  },
  description: "Cathy's Jewelry is a trusted Chicago jewelry store specializing in custom design, professional repair, and fine jewelry.",
  openGraph: {
    title: "Cathy’s Jewelry | Chicago's Trusted Jeweler",
    description: "Custom Jewelry, Repairs, and Gold Buying in Chicago.",
    url: 'https://cathysjewelry.net',
    siteName: "Cathy’s Jewelry",
    images: [
      {
        url: '/og-image.jpg', // public picture size 1200*630
        width: 1200,
        height: 630,
        alt: "Cathy’s Jewelry Storefront",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cathy’s Jewelry",
    description: "Expert Jewelry Repairs and Custom Designs in Chicago.",
    images: ['/og-image.jpg'],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.className}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
        monica-id="ofpnmcalabcbjgholdjcjblkibolbppb"
        monica-version="7.9.5"
        data-new-gr-c-s-check-loaded="14.1239.0"
        data-gr-ext-installed=""
      >
        <ConfigProvider theme={mainTheme}>
          <ReduxProvider>
            <AntdRegistry>
              <div className="">
                <ToastContainer />
                <ClientLayout>{children}</ClientLayout>
              </div>
            </AntdRegistry>
          </ReduxProvider>
        </ConfigProvider>
      </body>
    </html >
  );
}
