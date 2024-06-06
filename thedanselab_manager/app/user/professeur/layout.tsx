import SidebarProfesseur from "@/components/SidebarProfesseur";

export default function ProfesseurLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SidebarProfesseur />
      {children}
    </div>
  );
}
