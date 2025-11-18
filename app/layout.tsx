// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Rexie - Dashboard",
  description: "Gerencie seu bot Discord de forma simples e profissional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-950 text-gray-200 antialiased">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}