import type { Metadata } from "next";
import { Noto_Sans_SC, Quantico } from "next/font/google";
import type React from "react";
import Link from "next/link";
import "./globals.css";
import Footer from "@/components/Footer";
import { auth, signOut } from "@/auth";

// Google fonts
const quantico = Quantico({
    weight: ["400", "700"],
    variable: "--font-quantico",
    subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
    variable: "--font-noto-sans-sc",
    preload: false,
});

// Metadata
export const metadata: Metadata = {
    title: "URL Shortener | Pinn32",
    description: "Next.js App: URL Shortener, developed by Pinn Xu.",
};

// RootLayout
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <>
            <html lang="en" className={`${quantico.variable} ${notoSansSC.variable}`}>
                <body>
                    <header className="account-bar">
                        <nav className="profile-links" aria-label="External profiles">
                            <a
                                className="profile-link"
                                href="https://github.com/Pinn32"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="profile-link-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.71c-2.78.62-3.37-1.22-3.37-1.22-.46-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.59 2.36 1.13 2.94.86.09-.67.35-1.13.63-1.39-2.22-.26-4.56-1.15-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.15 9.15 0 0 1 12 7.16c.85 0 1.7.12 2.5.37 1.9-1.33 2.74-1.05 2.74-1.05.56 1.41.21 2.45.1 2.71.65.72 1.04 1.63 1.04 2.75 0 3.92-2.35 4.8-4.58 5.05.36.32.68.94.68 1.9v2.62c0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
                                </svg>
                                <span className="profile-link-label">GitHub</span>
                            </a>
                            <a
                                className="profile-link"
                                href="https://pinn32.github.io"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="profile-link-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
                                    <path fill="none" stroke="currentColor" strokeWidth="1.8" d="M3.5 12h17M12 3c2.1 2.4 3.2 5.4 3.2 9S14.1 18.6 12 21c-2.1-2.4-3.2-5.4-3.2-9S9.9 5.4 12 3Z" />
                                </svg>
                                <span className="profile-link-label">Personal Website</span>
                            </a>
                        </nav>
                        {session?.user ? (
                            <div className="account-controls">
                                <span>{session.user.name ?? session.user.email}</span>
                                <form action={async () => {
                                    "use server";
                                    await signOut({ redirectTo: "/" });
                                }}>
                                    <button className="secondary-button" type="submit">Log out</button>
                                </form>
                            </div>
                        ) : <Link className="login-link" href="/login">Log in</Link>}
                    </header>
                    <main>
                        {children}
                    </main>
                    <Footer/>
                </body>
            </html>
        </>
    );
}
