import "./globals.css"
import Header from "../components/Header"
import Footer from "../components/Footer"

export const metadata = {
  title: "CAR-BIKE MARKETPLACE - Pakistan's #1 Auto Platform",
  description: "Buy and sell cars, bikes, SUVs, trucks in Pakistan. Trusted marketplace with verified sellers and secure transactions.",
  // Minimal favicon setup
  icons: {
    icon: "LOGO.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <Header />
        <main>{children}</main>
        
      </body>
    </html>
  )
}