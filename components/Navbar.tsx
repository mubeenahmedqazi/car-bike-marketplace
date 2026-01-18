import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <Link href="/">Home</Link> |{" "}
      <Link href="/cars">Cars</Link> |{" "}
      <Link href="/bikes">Bikes</Link> |{" "}
      <Link href="/sell">Sell</Link> |{" "}
      <Link href="/auth/login">Login</Link>
    </nav>
  );
}
