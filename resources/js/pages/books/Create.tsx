import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { BookForm } from '@/pages/books/components/BookForm';
import { Building, LandPlot } from 'lucide-react';
import { number } from 'zod';

interface BookFormProps {
    initialData?: {
        id: string;
        title: string;
        author: string;
        editorial: string;
        language: string;
        published_year: number;
        isbn: string;
        pages: number;
        shelf_id: string;
    };
    page?: string;
    perPage?: string;
    languages: {
        name: string;
    }[];
    shelves: {
        id: string;
        code: string;
    } [];

}
export default function CreateBook({shelves, languages}:BookFormProps) {
    const { t } = useTranslations();

    return (
        <BookLayout title={t('ui.books.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1 mt-4">
                                <LandPlot color="#2762c2" />
                                {t('ui.books.cards.title_create')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.books.cards.description_create')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>

                        <BookForm
                            shelves={shelves}
                            languages={[
                                { name: 'English' },
                                { name: 'Spanish' },
                                { name: 'French' },
                                { name: 'German' },
                                { name: 'Italian' }]}>

                        </BookForm>

                    </CardContent>
                </Card>
            </div>
        </BookLayout>
    );
}
