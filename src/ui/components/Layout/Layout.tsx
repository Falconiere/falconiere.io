import { ReactNode } from "react";
import { LayoutContent } from "./LayoutContent";
import { LayoutHeader } from "./LayoutHeader";
import { LayoutFooter } from "./LayoutFooter";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className="bg-gray-800 to-slate-800 w-full h-full relative">
    <LayoutHeader />
    <main className="main">
      <LayoutContent>{children}</LayoutContent>
    </main>
    <LayoutFooter />
  </div>
);

export { Layout };
