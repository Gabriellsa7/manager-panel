"use client";

import Background from "@/src/components/background";
import Sidebar from "@/src/components/side-bar";

export default function BarbershopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Background>
      <Sidebar />
      <main className="flex-1">{children}</main>
    </Background>
  );
}
