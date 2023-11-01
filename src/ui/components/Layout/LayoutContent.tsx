import { ReactNode } from "react";

type LayoutContentProps = {
  children: ReactNode;
};
const LayoutContent = ({ children }: LayoutContentProps) => (
  <div className="p-8 pt-4 mx-auto max-w-4xl">{children}</div>
);

export { LayoutContent };
