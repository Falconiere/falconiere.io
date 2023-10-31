// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
import { Layout } from "@/ui/components/Layout/Layout";

type LayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: LayoutProps) => <Layout>{children}</Layout>;
export default PageLayout;
