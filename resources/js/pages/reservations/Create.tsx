import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { ReservationLayout } from '@/layouts/reservations/ReservationLayout';
import { ReservationForm } from '@/pages/reservations/components/ReservationForm';
import { Handshake, LandPlot } from 'lucide-react';
import { number } from 'zod';

interface ReservationFormProps {
    initialData?: {
        id: string;
        code: string;
        book_id: string;
        user_id: string;
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
export default function CreateReservation({books, users}:ReservationFormProps) {
    const { t } = useTranslations();

    return (
        <ReservationLayout title={t('ui.reservations.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1 mt-4">
                                <Handshake color="#2762c2" />
                                {t('ui.reservations.cards.title_create')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.reservations.cards.description_create')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>

                        <ReservationForm books={books} users={users}></ReservationForm>

                    </CardContent>
                </Card>
            </div>
        </ReservationLayout>
    );
}
