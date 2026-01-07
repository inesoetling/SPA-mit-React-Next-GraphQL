'use client';

import { Footer, Header } from '@/components/Layout';
import { apolloClient } from '@/lib/apollo-client';
import { ApolloProvider } from '@apollo/client/react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <ApolloProvider client={apolloClient}>
          <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">{children}</main>
            <Footer />
          </div>
        </ApolloProvider>
      </body>
    </html>
  );
}
