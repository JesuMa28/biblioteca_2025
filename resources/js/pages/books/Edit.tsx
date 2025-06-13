import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { BookForm } from '@/pages/books/components/BookForm';
import { PageProps } from '@inertiajs/core';
import { Building } from 'lucide-react';

interface EditBookProps extends PageProps {
    book: {
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
    shelves: {
        id: string;
        code: string;
    } [];
    languages: {
        name: string;
    }[];
}

export default function EditBook({ book, page, perPage, shelves, languages }: EditBookProps) {
    const { t } = useTranslations();
    console.log("books", book);
    return (
        <BookLayout title={t('ui.books.edit')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Building color="#2762c2" />
                                {t('ui.books.cards.title_edit')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.books.cards.description_edit')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <BookForm
                            initialData={book}
                            page={page}
                            perPage={perPage}
                            shelves={shelves}
                            languages={languages}
                        />
                    </CardContent>
                </Card>
            </div>
        </BookLayout>
    );
}
