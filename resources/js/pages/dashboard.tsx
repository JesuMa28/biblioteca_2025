import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Users, User, Building, LandPlot, LibraryBig, Book, Handshake, Ticket } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CardFlip from "@/components/ui/card-flip";
import { Icon } from '@/components/icon';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                <DashboardCard
                    title="Users"
                    description="Gestiona los usuarios del sistema"
                    href="/users"
                    icon={Users}
                />
                <DashboardCard
                    title="Floors"
                    description="Gestiona los usuarios del sistema"
                    href="/floors"
                    icon={Building}
                />
                <DashboardCard
                    title="Zones"
                    description="Gestiona los usuarios del sistema"
                    href="/zones"
                    icon={LandPlot}
                />
                <DashboardCard
                    title="Shelves"
                    description="Gestiona los usuarios del sistema"
                    href="/shelves"
                    icon={LibraryBig}
                />
                <DashboardCard
                    title="Books"
                    description="Gestiona los usuarios del sistema"
                    href="/books"
                    icon={Book}
                />
                <DashboardCard
                    title="Loans"
                    description="Gestiona los usuarios del sistema"
                    href="/loans"
                    icon={Handshake}
                />
                <DashboardCard
                    title="Reservations"
                    description="Gestiona los usuarios del sistema"
                    href="/reservations"
                    icon={Ticket}
                />

                {/* <CardFlip
                    contentFront={
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Icon iconNode={User} className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Usuario 1</h3>
                                <p className="text-sm text-muted-foreground">descripcion de usuario</p>
                            </div>
                        </div>
                    }
                    contentBack={
                        <div className="flex w-full h-full items-center gap-4">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Icon iconNode={User} className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">cliente 2</h3>
                                <p className="text-sm text-muted-foreground">descripcion de cliente</p>

                            </div>
                        </div>
                    }
                /> */}

            </div>
        </AppLayout>
    );
}
