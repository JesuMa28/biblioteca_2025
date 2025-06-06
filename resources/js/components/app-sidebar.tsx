import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useTranslations } from '@/hooks/use-translations';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, Building, LandPlot, LibraryBig, Book, Handshake, Ticket, Clock, ChartPie } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems = (t: (key: string) => string): NavItem[] => [
    {
        title: t('ui.navigation.items.dashboard'),
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: t('ui.navigation.items.users'),
        url: '/users',
        icon: Users,
    },
    {
        title: t('ui.navigation.items.floors'),
        url: '/floors',
        icon: Building,
    },
    {
        title: t('ui.navigation.items.zones'),
        url: '/zones',
        icon: LandPlot,
    },
    {
        title: t('ui.navigation.items.shelves'),
        url: '/shelves',
        icon: LibraryBig,
    },
    {
        title: t('ui.navigation.items.books'),
        url: '/books',
        icon: Book,
    },
    {
        title: t('ui.navigation.items.loans'),
        url: '/loans',
        icon: Handshake,
    },
    {
        title: t('ui.navigation.items.reservations'),
        url: '/reservations',
        icon: Ticket,
    },
    {
        title: t('ui.navigation.items.charts'),
        url: '/charts',
        icon: ChartPie,
    },

];

const footerNavItems = (t: (key: string) => string): NavItem[] => [
    {
        title: t('ui.navigation.items.timelines'),
        url: '/timelines',
        icon: Clock,
    },
    {
        title: t('ui.navigation.items.repository'),
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: t('ui.navigation.items.documentation'),
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { t } = useTranslations();
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems(t)} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems(t)} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
