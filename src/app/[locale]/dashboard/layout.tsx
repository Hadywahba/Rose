import LayoutWrapper from './_components/layout-wrapper';

type LayoutProps = {
  children: React.ReactNode;
};
export default function DashboardLayout({ children }: LayoutProps) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
