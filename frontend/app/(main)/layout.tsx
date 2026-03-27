"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b border-orange-100/60 bg-white px-5">
            <SidebarTrigger className="text-neutral-400 hover:text-orange-500 transition-colors" />
            <div className="h-4 w-px bg-orange-100" />
            <span className="text-sm font-semibold text-neutral-600">Mood Score Workspace</span>
          </header>
          <div className="flex-1 overflow-auto bg-orange-50/20">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}