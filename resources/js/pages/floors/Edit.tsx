import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { FloorForm } from '@/pages/floors/components/FloorForm';
import { PageProps } from '@inertiajs/core';
import { Building } from 'lucide-react';

interface EditFloorProps extends PageProps {
    floor: {
        id: string;
        number: number;
        capacity: number;
    };
    page?: string;
    perPage?: string;
    roles?: string[];
    rolesConPermisos: Record<string, string[]>;
    permisos?: string[];
    permisosAgrupados: Record<string, string[]>;
    permisosDelUsuario?: string[];
}

export default function EditFloor({ floor, page, perPage }: EditFloorProps) {
    const { t } = useTranslations();

    return (
        <FloorLayout title={t('ui.floors.edit')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Building color="#2762c2" />
                                {t('ui.floors.cards.title_edit')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.floors.cards.description_edit')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <FloorForm
                            initialData={floor}
                            page={page}
                            perPage={perPage}
                        />
                    </CardContent>
                </Card>
            </div>
        </FloorLayout>
    );
}
