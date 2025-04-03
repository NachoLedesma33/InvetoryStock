import "@/styles/globals.css";

export const metadata = {
  title: "Inventario Stock",
  description: "Sistema de gestión de inventario",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}