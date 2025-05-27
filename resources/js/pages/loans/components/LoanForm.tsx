import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { LandPlot, Save, X, LibraryBig, Drama, Handshake, Book, Mail } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Value } from "@radix-ui/react-select";



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

// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
            {field.state.meta.isValidating ? <p className="text-muted-foreground mt-1 text-sm">Validating...</p> : null}
        </>
    );
}

export function LoanForm({ initialData, page, perPage, books, users }: LoanFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const uniqueUser = users.filter(
        (cat, index, self) => index === self.findIndex((c) => c.email === cat.email)
    );

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            code: initialData?.code ?? '',
            book_id: initialData?.book_id ?? '',
            user_id: initialData?.user_id ?? '',
            loan_date: initialData?.loan_date ?? '',
            return_date: initialData?.return_date ?? '',
            status: initialData?.status ?? '',

        },
        onSubmit: async ({ value }) => {
            const loanData = {
                ...value,
            };

            const options = {

                onSuccess: () => {
                    console.log('Prestamo creada con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['loans'] });

                    // Construct URL with page parameters
                    let url = '/loans';
                    if (page) {
                        url += `?page=${page}`;
                        if (perPage) {
                            url += `&per_page=${perPage}`;
                        }
                    }

                    router.visit(url);
                },
                onError: (errors: Record<string, string>) => {
                    if (Object.keys(errors).length === 0) {
                        toast.error(initialData ? t('messages.loans.error.update') : t('messages.loans.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/loans/${initialData.id}`, loanData, options);
            } else {
                router.post('/loans', loanData, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="" noValidate>
            <div>
                <Tabs defaultValue="loanForm">

                    <TabsContent value="loanForm" className="w-full flex justify-center gap-20">
                        <div className="h-full">
                            {/* Name field */}
                            <div className="mb-8">
                                <form.Field
                                    name="code"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));

                                            return !value
                                                ? t('ui.validation.required', { attribute: t('ui.loans.fields.code')})
                                                : value.length < 3
                                                ? t('ui.validation.min.string', { attribute: t('ui.loans.fields.name').toLowerCase(), min: '3' })
                                                : undefined;
                                        },
                                    }}

                                >
                                    {(field) => (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <Handshake color="grey" size={18} />
                                                    {t('ui.loans.fields.code')}
                                                </div>
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                value={field.state.value?.toString()}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder={t('ui.loans.placeholders.code')}
                                                disabled={form.state.isSubmitting}
                                                required={false}
                                                autoComplete="off"
                                                className='my-4 no-spinner border rounded px-2 py-1'
                                            />
                                            <FieldInfo field={field} />
                                        </>
                                    )}
                                </form.Field>
                            </div>
                            {/* Books field */}
                            <div className='w-[45%] mb-8'>
                                <form.Field
                                    name="book_id"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));



                                            if (!value) {
                                                return t('ui.validation.required', { attribute: t('ui.loans.fields.book_title')});
                                            }

                                            return undefined;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <>

                                            <Label htmlFor={field.name}>
                                                <div className="mb-4 flex items-center gap-1">
                                                    <Book color="grey" size={18} />
                                                    {t('ui.loans.fields.book_title')}
                                                </div>
                                            </Label>
                                            <Select
                                                value={field.state.value}
                                                onValueChange={(value: string) => {
                                                    field.handleChange(value);
                                                }}
                                            >
                                                <SelectTrigger className=" w-48 rounded-md border mb-6">
                                                    <SelectValue placeholder={t('ui.loans.placeholders.book_title')} />
                                                </SelectTrigger>
                                                <SelectContent className="h-30">
                                                    {books.map((book) => (
                                                        <SelectItem key={book.id} value={book.id} className="w-full">
                                                            <div className="text-sm">
                                                                {book.title}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>

                                            </Select>
                                            <FieldInfo field={field} />
                                        </>
                                    )}
                                </form.Field>
                            </div>

                        </div>

                        <div className="h-full">

                            {/* Users field */}
                            <div className='w-[45%] mb-8'>
                                <form.Field
                                    name="user_id"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));



                                            if (!value) {
                                                return t('ui.validation.required', { attribute: t('ui.loans.fields.user_email')});
                                            }

                                            return undefined;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <>

                                            <Label htmlFor={field.name}>
                                                <div className="mb-4 flex items-center gap-1">
                                                    <Mail color="grey" size={18}/>
                                                    {t('ui.loans.fields.user_email')}
                                                </div>
                                            </Label>
                                            <Select
                                                value={field.state.value}
                                                onValueChange={(value: string) => {
                                                    field.handleChange(value);
                                                }}
                                            >
                                                <SelectTrigger className=" w-48 rounded-md border mb-6">
                                                    <SelectValue placeholder={t('ui.loans.placeholders.user_email')} />
                                                </SelectTrigger>
                                                <SelectContent className="h-30">
                                                    {users.map((user) => (
                                                        <SelectItem key={user.id} value={user.id} className="w-full">
                                                            <div className="text-sm">
                                                                {user.email}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>

                                            </Select>
                                            <FieldInfo field={field} />
                                        </>
                                    )}
                                </form.Field>
                            </div>
                        </div>


                    </TabsContent>

                </Tabs>
                <Separator className="mt-3" />
                {/* Form buttons */}
                <div className="mt-6 mb-2 flex justify-center gap-100">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = '/loans';
                            if (page) {
                                url += `?page=${page}`;
                                if (perPage) {
                                    url += `&per_page=${perPage}`;
                                }
                            }
                            router.visit(url);
                        }}
                        disabled={form.state.isSubmitting}
                    >
                        <X />
                        {t('ui.loans.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.loans.buttons.saving')
                                    : initialData
                                      ? t('ui.loans.buttons.update')
                                      : t('ui.loans.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>

            </div>
        </form>
    );
}
