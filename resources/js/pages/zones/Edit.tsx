import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { ZoneLayout } from '@/layouts/zones/ZoneLayout';
import { ZoneForm } from '@/pages/zones/components/ZoneForm';
import { PageProps } from '@inertiajs/core';
import { Building } from 'lucide-react';

interface EditZoneProps extends PageProps {
    zone: {
        id: string;
        name: string;
        capacity: number;
        floor_id: string;
        category_id: string;
    };
    page?: string;
    perPage?: string;
    floors: {
        id: string;
        number: number;
    } [];
    categories: {
        id: string;
        name: string;
    }[];
}

export default function EditZone({ zone, page, perPage, floors, categories }: EditZoneProps) {
    const { t } = useTranslations();
    console.log("floors", floors);
    return (
        <ZoneLayout title={t('ui.zones.edit')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Building color="#2762c2" />
                                {t('ui.zones.cards.title_edit')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.zones.cards.description_edit')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <ZoneForm
                            initialData={zone}
                            page={page}
                            perPage={perPage}
                            floors={floors}
                            categories={categories}
                        />
                    </CardContent>
                </Card>
            </div>
        </ZoneLayout>
    );
}
