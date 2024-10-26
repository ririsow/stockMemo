import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}