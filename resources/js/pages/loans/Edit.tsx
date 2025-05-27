import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { LoanForm } from '@/pages/loans/components/LoanForm';
import { PageProps } from '@inertiajs/core';
import { Building } from 'lucide-react';

interface EditLoanProps extends PageProps {
    loan: {
        id: string;
        code: string;
        book_id: string;
        user_id: string;
        loan_date: string;
        return_date: string;
        status: string;
    };
    page?: string;
    perPage?: string;
    books: {
        id: string;
        title: string;
    } [];
    users: {
        id: string;
        email: string;
    }[];
}

export default function EditLoan({ loan, page, perPage, books, users }: EditLoanProps) {
    const { t } = useTranslations();
    console.log("books", books);
    return (
        <LoanLayout title={t('ui.loans.edit')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Building color="#2762c2" />
                                {t('ui.loans.cards.title_edit')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.loans.cards.description_edit')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <LoanForm
                            initialData={loan}
                            page={page}
                            perPage={perPage}
                            books={books}
                            users={users}
                        />
                    </CardContent>
                </Card>
            </div>
        </LoanLayout>
    );
}
