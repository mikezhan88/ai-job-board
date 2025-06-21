import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarUserButton } from "@/features/users/components/SidebarUserButton";
import { SignedOut } from "@/services/clerk/components/SignInStatus";
import Link from "next/link";
import { LogInIcon } from "lucide-react";


export default function EmployerLayout({children}: {children: React.ReactNode}) {
    return <AppSidebar content={ <SidebarGroup>
        <SidebarMenu>
          <SignedOut>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/sign-in">
                <LogInIcon />
                <span>Sign in</span>
              </Link>
              </SidebarMenuButton>
          </SidebarMenuItem>
          </SignedOut>
        </SidebarMenu>
        </SidebarGroup>} footerButton={<SidebarUserButton />}>
  {children}
  </AppSidebar>
}