import SidebarAdmin from "@/components/SidebarAdmin";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SidebarAdmin />
      {children}
    </div>
  );
}
