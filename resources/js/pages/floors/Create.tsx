import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { UserLayout } from '@/layouts/users/UserLayout';
import { UserForm } from '@/pages/users/components/UserForm';
import { User } from 'lucide-react';

interface FloorFormProps {
    initialData?: {
        id: string;
        number: number;
        capacity: number;
    };
    page?: string;
    perPage?: string;
}

export default function CreateFloor() {
    const { t } = useTranslations();

    return (
        <FloorLayout title={t('ui.floors.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <User color="#2762c2" />
                                {t('ui.floors.cards.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.floors.cards.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>

                    </CardContent>
                </Card>
            </div>
        </FloorLayout>
    );
}
