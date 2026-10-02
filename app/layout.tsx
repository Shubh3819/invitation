import './styles.css';

export const metadata = {
  title: 'Colvin Court Sarbojanin Durga Puja 2026 | Railway Officers’ Club, Howrah',
  description: 'You are cordially invited to the Colvin Court Sarbojanin Durga Puja 2026 celebration at Railway Officers’ Club, Howrah.',
  keywords: ['Durga Puja 2026', 'Colvin Court', 'Railway Officers Club Howrah', 'Invitation', 'Sindur Khela'],
  authors: [{ name: 'Railway Officers’ Club, Howrah' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@400;500;700&family=Noto+Serif+Devanagari:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

