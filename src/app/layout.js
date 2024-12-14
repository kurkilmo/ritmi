import localFont from "next/font/local";
import "./globals.css";
import Link from 'next/link'

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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


// <Link href="/admin">
// Admin
// </Link>

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

// className={`${geistSans.variable} ${geistMono.variable} antialiased`}