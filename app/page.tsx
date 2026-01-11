import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Car & Bike Marketplace</h1>
      <p>Buy and Sell Cars & Bikes</p>

      <Link href="/cars">View Cars</Link>
      <br />
      <Link href="/bikes">View Bikes</Link>
    </main>
  );
}
