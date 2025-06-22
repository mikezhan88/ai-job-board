import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarGroup, SidebarGroupAction, SidebarGroupLabel} from "@/components/ui/sidebar";
import { SidebarOrganizationButton } from "@/features/organizations/components/SidebarOrganizationButton";
import Link from "next/link";
import { PlusIcon, ClipboardListIcon } from "lucide-react";
import { SidebarNavMenuGroup } from "@/components/sidebar/SidebarNavMenuGroup";
import { Suspense, ReactNode } from "react";
import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth";
import { redirect } from "next/navigation";


export default function EmployerLayout({ children }: { children: ReactNode }) {
    return (
      <Suspense>
        <LayoutSuspense>{children}</LayoutSuspense>
      </Suspense>
    )
  }

async function LayoutSuspense({children}: {children: ReactNode}) {
    const { orgId } = await getCurrentOrganization()
    if (orgId == null) return redirect("/organizations/select")
  
    return <AppSidebar content={     
        <>
        <SidebarGroup>
            <SidebarGroupLabel>Job Listings</SidebarGroupLabel>
            <SidebarGroupAction name="Add Job Listing" asChild>
                <Link href="/employer/job-listings/new">
                    <PlusIcon /> <span className="sr-only">Add Job Listing</span>
                </Link>
            </SidebarGroupAction>
        </SidebarGroup>
    <SidebarNavMenuGroup className="mt-auto" items={[
             { href: "/", icon: <ClipboardListIcon />, label: "Job Board" },
      ]} >
        
    </SidebarNavMenuGroup>
    </>
    } footerButton={<SidebarOrganizationButton />}>
  {children}
  </AppSidebar>
}