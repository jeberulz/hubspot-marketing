import { MarketingNav } from "@/components/layout/MarketingNav";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingNav />
      {children}
    </>
  );
}
