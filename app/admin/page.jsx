import { isAuthed, hasAdminPassword, blobToken } from "@/lib/auth";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const authed = isAuthed();

  return (
    <main className="relative min-h-screen bg-cream">
      <div className="pattern-grid pointer-events-none fixed inset-0 opacity-50" aria-hidden="true" />
      <div className="relative">
        {authed ? (
          <AdminDashboard blobConfigured={Boolean(blobToken())} />
        ) : (
          <AdminLogin passwordConfigured={hasAdminPassword()} />
        )}
      </div>
    </main>
  );
}
