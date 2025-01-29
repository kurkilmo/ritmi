import "./globals.css";
import Link from 'next/link'

export const metadata = {
  title: "Ritmi"
};

const Links = () => {
  return (
    <nav>
      <Link href="/">
        Koti
      </Link>
      <br/>
    </nav>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Links />
        {children}
      </body>
    </html>
  );
}
