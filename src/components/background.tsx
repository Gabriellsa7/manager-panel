import { ReactNode } from "react";

type BackgroundProps = {
  children: ReactNode;
};

export default function Background({ children }: BackgroundProps) {
  return (
    <div className="min-h-screen w-full bg-[#050505] flex">{children}</div>
  );
}
