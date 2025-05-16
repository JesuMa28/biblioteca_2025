import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { ShelfLayout } from '@/layouts/shelves/ShelfLayout';
import { ShelfForm } from '@/pages/shelves/components/ShelfForm';
import { PageProps } from '@inertiajs/core';
import { Building, LibraryBig } from 'lucide-react';

interface EditShelfProps extends PageProps {
    shelf: {
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
    }[];
    categories: {
        id: string;
        name: string;
    }[];
}

export default function EditShelf({ shelf, page, perPage, zones, categories }: EditShelfProps) {
    const { t } = useTranslations();
    console.log("zones", zones);
    return (
        <ShelfLayout title={t('ui.shelves.edit')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <LibraryBig color="#2762c2" />
                                {t('ui.shelves.cards.title_edit')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.shelves.cards.description_edit')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <ShelfForm
                            initialData={shelf}
                            page={page}
                            perPage={perPage}
                            zones={zones}
                            categories={categories}
                        />
                    </CardContent>
                </Card>
            </div>
        </ShelfLayout>
    );
}
