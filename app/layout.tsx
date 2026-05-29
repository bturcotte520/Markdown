import './globals.css';

export const metadata = {
  title: 'Markdown Editor',
  description: 'A real-time markdown editor built with Next.js 15',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
