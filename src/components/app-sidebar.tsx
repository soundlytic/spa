import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Building2, LucideBadgeCheck, LucideBell, LucideCreditCard, LucideLogOut, LucideSparkles, Music } from "lucide-react"
import { Link } from "react-router-dom"
import UploadForm from "./upload-form"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
export function AppSidebar() {
  const items = [
    {
      title: "Songs",
      url: "/songs",
      icon: Music,
    },
  ]
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          <span className="font-semibold text-lg">TIC</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="ml-0 mr-0 w-full" />
      <SidebarContent className="">
        <SidebarGroup />
          <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        className="!text-black !font-normal"
                        to={item.url}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
          </SidebarGroupContent>
        <SidebarGroup />


      </SidebarContent>
      <SidebarFooter>
        <UploadForm></UploadForm>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted w-full text-left">
              <img
                src="/shadcn.jpg" // your image path or remote URL
                alt="John Doe"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="flex flex-col overflow-hidden">
                <span className="font-medium truncate">John Doe</span>
                <span className="text-xs text-muted-foreground truncate">
                  john@example.com
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="right"
            align="end"
            className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out
                      data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
                      data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
                      data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
                      data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
                      z-50 max-h-[var(--radix-dropdown-menu-content-available-height)]
                      origin-[var(--radix-dropdown-menu-content-transform-origin)]
                      overflow-x-hidden overflow-y-auto border p-1 shadow-md
                      w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg"
            >
            <div className="text-sm p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                  <img className="h-full w-full object-cover" src="/shadcn.jpg" alt="shadcn" />
                </span>
                <div className="flex-1 grid text-left text-sm leading-tight">
                  <span className="truncate font-medium">shadcn</span>
                  <span className="truncate text-xs">m@example.com</span>
                </div>
              </div>
            </div>

            <DropdownMenuSeparator className="bg-border -mx-1 my-1 h-px" />

            {/* First group */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="dropdown-menu-item flex items-center gap-2 text-sm">
                <LucideSparkles className="size-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-border -mx-1 my-1 h-px" />

            {/* Second group */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="dropdown-menu-item flex items-center gap-2 text-sm">
                <LucideBadgeCheck className="size-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="dropdown-menu-item flex items-center gap-2 text-sm">
                <LucideCreditCard className="size-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="dropdown-menu-item flex items-center gap-2 text-sm">
                <LucideBell className="size-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-border -mx-1 my-1 h-px" />

            {/* Logout */}
            <DropdownMenuItem className="dropdown-menu-item flex items-center gap-2 text-sm">
              <LucideLogOut className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}