'use client';

import './globals.css';
import { apolloClient } from '@/lib/apollo-client';
import { ApolloProvider } from '@apollo/client/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
