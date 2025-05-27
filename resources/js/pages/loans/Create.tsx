import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { LoanForm } from '@/pages/loans/components/LoanForm';
import { Handshake, LandPlot } from 'lucide-react';
import { number } from 'zod';

interface LoanFormProps {
    initialData?: {
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
export default function CreateLoan({books, users}:LoanFormProps) {
    const { t } = useTranslations();

    return (
        <LoanLayout title={t('ui.loans.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1 mt-4">
                                <Handshake color="#2762c2" />
                                {t('ui.loans.cards.title_create')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.loans.cards.description_create')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>

                        <LoanForm books={books} users={users}></LoanForm>

                    </CardContent>
                </Card>
            </div>
        </LoanLayout>
    );
}
