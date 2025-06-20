import { Sidebar, SidebarHeader, SidebarProvider, SidebarTrigger, SidebarContent, 
  SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarGroup,
  SidebarMenuButton, } from "@/components/ui/sidebar";
import { AppSidebarClient } from "./_AppSidebarClient";
import Link from "next/link";
import { LogInIcon } from "lucide-react";
import { SignedOut, SignedIn } from "@/services/clerk/components/SIgnInStatus";
import { SidebarUserButton } from "@/features/users/components/SidebarUserButton";

export default function Home() {
  return <SidebarProvider className='overflow-y-hidden'>
    <AppSidebarClient>
    <Sidebar collapsible='icon' className='overflow-hidden'>
      <SidebarHeader className='flex-row'>
        <SidebarTrigger/>
          <span className='text-2xl text-nowwrap'>MZ Jobs</span>
    
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
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
        </SidebarGroup>
      </SidebarContent>
      <SignedIn>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarUserButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      </SignedIn>
    </Sidebar>
    <main className='flex-1'>dslkjdsflk</main>
    </AppSidebarClient>
  </SidebarProvider>
}