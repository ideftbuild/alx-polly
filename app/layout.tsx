import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
import type { Metadata } from "next";
import Link from "next/link";
import { AuthProvider } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Vote, User, BarChart3, Plus } from "lucide-react";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "Alx Polly - Create and Vote on Polls",
  description: "Create engaging polls and gather opinions from your community",
};

function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Vote className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Alx Polly</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/polls"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                All Polls
              </Link>
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/create-poll">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Poll
              </Button>
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>

            {/* User menu placeholder - will be replaced with actual user menu when auth is implemented */}
            <Button variant="outline" size="icon" className="hidden">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Vote className="h-5 w-5 text-primary" />
              <span className="font-bold">Alx Polly</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Create engaging polls and gather opinions from your community.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Platform</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/polls"
                className="block text-muted-foreground hover:text-foreground"
              >
                Browse Polls
              </Link>
              <Link
                href="/create-poll"
                className="block text-muted-foreground hover:text-foreground"
              >
                Create Poll
              </Link>
              <Link
                href="/dashboard"
                className="block text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Account</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/login"
                className="block text-muted-foreground hover:text-foreground"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="block text-muted-foreground hover:text-foreground"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <div className="space-y-2 text-sm">
              <a
                href="#"
                className="block text-muted-foreground hover:text-foreground"
              >
                Help Center
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-foreground"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Alx Polly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
