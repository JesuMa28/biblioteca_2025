import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { LibraryBig } from 'lucide-react';
import { number } from 'zod';
import { ShelfForm } from './components/ShelfForm';
import { ShelfLayout } from '@/layouts/shelves/ShelfLayout';

interface ShelfFormProps {
    initialData?: {
        id: string;
        code: string;
        capacity: number;
        zone_id: string;
        category_id: string;
    };
    page?: string;
    perPage?: string;
    zones: {
        id: string;
        name: string;
    } [];
    categories: {
        id: string;
        name: string;
    }[];

}
export default function CreateZone({zones, categories}:ShelfFormProps) {
    const { t } = useTranslations();

    return (
        <ShelfLayout title={t('ui.shelves.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1 mt-4">
                                <LibraryBig color="#2762c2" />
                                {t('ui.shelves.cards.title_create')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.shelves.cards.description_create')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>

                        <ShelfForm zones={zones} categories={categories}></ShelfForm>

                    </CardContent>
                </Card>
            </div>
        </ShelfLayout>
    );
}
