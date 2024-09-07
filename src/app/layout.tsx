'use client'

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "./_combonent/navbar/page";
import theme from "@/theme";
import { ReactNode } from "react";
import Container from '@mui/material/Container'
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  
  if (typeof window !== "undefined") {
    // Your code that uses localStorage
    localStorage.setItem("key", "value");
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Navbar />
              <Container maxWidth="sm" sx={{ pt: 9 }}>
                {children}
                <Toaster />
              </Container>

              <footer></footer>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}




