import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { ZoneLayout } from '@/layouts/zones/ZoneLayout';
import { ZoneForm } from '@/pages/zones/components/ZoneForm';
import { Building } from 'lucide-react';

interface ZoneFormProps {
    initialData?: {
        id: string;
        name: string;
        capacity: number;
        floor_id: string;
    };
    page?: string;
    perPage?: string;

}
export default function CreateZone() {
    const { t } = useTranslations();

    return (
        <ZoneLayout title={t('ui.zones.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1 mt-4">
                                <Building color="#2762c2" />
                                {t('ui.zones.cards.title_create')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.zones.cards.description_create')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>

                        <ZoneForm ></ZoneForm>

                    </CardContent>
                </Card>
            </div>
        </ZoneLayout>
    );
}
