import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Just Video",
    description: "Just a video player",
    manifest: "/manifest.json",
    icons: "/icons/SVG/Just-Video.svg"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
