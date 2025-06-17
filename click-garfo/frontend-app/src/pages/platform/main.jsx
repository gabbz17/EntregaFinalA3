import { Sidebar } from "../../components/sidebar";

export function MainLayout({children}) {
    return (
        <main className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6">
            {children}
        </div>
        </main>
    )
}