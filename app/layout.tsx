import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-950 text-gray-200">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}


// #### 2. **.env.local**:
// NEXT_PUBLIC_DISCORD_CLIENT_ID=seu_client_id
// DISCORD_CLIENT_SECRET=seu_client_secret
// NEXT_PUBLIC_DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/discord/callback
// NEXT_PUBLIC_URL=http://localhost:3000