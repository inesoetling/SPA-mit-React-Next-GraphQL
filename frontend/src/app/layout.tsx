'use client';
import { apolloClient } from '@/lib/apollo-client';
import { ApolloProvider } from '@apollo/client/react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
