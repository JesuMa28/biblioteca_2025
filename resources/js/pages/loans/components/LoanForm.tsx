import * as React from "react"

import { useState } from "react";
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
import { LandPlot, Save, X, LibraryBig, Drama, Handshake, Book, Mail, GitPullRequestArrow } from 'lucide-react';
import { toast } from 'sonner';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"




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
            console.log('Submit data:', loanData);

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
    const [open, setOpen] = useState(false);

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <Tabs defaultValue="loanForm">

                    <TabsContent value="loanForm" className="w-full flex justify-center  gap-20">
                        <div className="h-full w-[45%]">
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
                                    // validators={{
                                    //     onChangeAsync: async ({ value }) => {
                                    //         await new Promise((resolve) => setTimeout(resolve, 300));

                                    //         // Si no hay valor, devolver error
                                    //         if (!value) {
                                    //             return t('ui.validation.required', { attribute: t('ui.floors.fields.floor')});
                                    //         }

                                    //         const res = await fetch(`/api/books/check-isbn/${value}`);
                                    //         const data = await res.json();

                                    //         if (!initialData && data.exists) {
                                    //             return t('ui.validation.used_book', { attribute: t('ui.loans.fields.book_id')});
                                    //         }

                                    //         return undefined;
                                    //     },
                                    // }}
                                >
                                    {(field) => (
                                        <>

                                            <Label htmlFor={field.name}>
                                                <div className="mb-4 flex items-center gap-1">
                                                    <Book color="grey" size={18} />
                                                    {t('ui.loans.fields.book_title')}
                                                </div>
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className="w-48 justify-between"
                                                    >
                                                    {field.state.value
                                                        ? books.find((book) => book.id === field.state.value)?.title
                                                        : t('ui.loans.placeholders.book_title')}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-48 p-0">
                                                    <Command>
                                                    <CommandInput placeholder={t('ui.loans.placeholders.book_title')} />
                                                    <CommandEmpty>{t('ui.loans.combo_no_result')}</CommandEmpty>
                                                    <CommandGroup>
                                                        {books.map((book) => (
                                                        <CommandItem
                                                            key={book.id}
                                                            value={book.title}
                                                            onSelect={() => field.handleChange(book.id)}
                                                        >
                                                            {book.title}
                                                        </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FieldInfo field={field} />
                                        </>
                                    )}
                                </form.Field>
                            </div>
                            {/* Users field */}
                            <div className='w-[45%] mb-8'>
                                <form.Field
                                    name="user_id"
                                    // validators={{
                                    //     onChangeAsync: async ({ value }) => {
                                    //         await new Promise((resolve) => setTimeout(resolve, 300));



                                    //         if (!value) {
                                    //             return t('ui.validation.required', { attribute: t('ui.loans.fields.user_email')});
                                    //         }

                                    //         return undefined;
                                    //     },
                                    // }}
                                >
                                    {(field) => (
                                        <>

                                            <Label htmlFor={field.name}>
                                                <div className="mb-4 flex items-center gap-1">
                                                    <Mail color="grey" size={18}/>
                                                    {t('ui.loans.fields.user_email')}
                                                </div>
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className="w-48 justify-between"
                                                    >
                                                    {field.state.value
                                                        ? users.find((user) => user.id === field.state.value)?.email
                                                        : t('ui.loans.placeholders.user_email')}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-48 p-0">
                                                    <Command>
                                                    <CommandInput placeholder={t('ui.loans.placeholders.user_email')} />
                                                    <CommandEmpty>{t('ui.loans.combo_no_result')}</CommandEmpty>
                                                    <CommandGroup>
                                                        {users.map((user) => (
                                                        <CommandItem
                                                            key={user.id}
                                                            value={user.email}
                                                            onSelect={() => field.handleChange(user.id)}
                                                        >
                                                            {user.email}
                                                        </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>

                                            <FieldInfo field={field} />
                                        </>
                                    )}
                                </form.Field>
                            </div>

                        </div>

                        <div className="h-full w-[45%]">


                            {/* Loan Date Field */}
                            <div className='mb-8'>
                                <form.Field name="loan_date">
                                    {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                        <div className="mb-4 flex items-center gap-1">
                                            <CalendarIcon size={18} />
                                            {t('ui.loans.fields.loan_date')}
                                        </div>
                                        </Label>
                                        <Popover>
                                        <PopoverTrigger asChild className="w-full">
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.state.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.state.value
                                                ? format(new Date(field.state.value), "yyyy-MM-dd HH:mm")
                                                : t('ui.loans.placeholders.loan_date')}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0" align="start">
                                            <Calendar
                                            mode="single"
                                            selected={new Date(field.state.value)}
                                            onSelect={(date) => {
                                                if (!date) return; // ✅ Protección contra undefined

                                                const now = new Date();
                                                date.setHours(now.getHours());
                                                date.setMinutes(now.getMinutes());

                                                field.handleChange(date.toISOString().slice(0, 19).replace('T', ' '));
                                            }}
                                            initialFocus
                                            />
                                        </PopoverContent>
                                        </Popover>
                                        <FieldInfo field={field} />
                                    </>
                                    )}
                                </form.Field>
                            </div>
                            {/* Return Date Field */}
                            <div className='mb-8'>
                                <form.Field name="return_date">
                                    {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                        <div className="mb-4 flex items-center gap-1">
                                            <CalendarIcon size={18} />
                                            {t('ui.loans.fields.return_date')}
                                        </div>
                                        </Label>
                                        <Popover>
                                        <PopoverTrigger asChild className="w-full">
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.state.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.state.value
                                                ? format(new Date(field.state.value), "yyyy-MM-dd HH:mm")
                                                : t('ui.loans.placeholders.return_date')}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0" align="start">
                                            <Calendar
                                            mode="single"
                                            selected={new Date(field.state.value)}
                                            onSelect={(date) => {
                                                if (!date) return; // ✅ Protección contra undefined

                                                const now = new Date();
                                                date.setHours(now.getHours());
                                                date.setMinutes(now.getMinutes());

                                                field.handleChange(date.toISOString().slice(0, 19).replace('T', ' '));
                                            }}
                                            initialFocus
                                            />
                                        </PopoverContent>
                                        </Popover>
                                        <FieldInfo field={field} />
                                    </>
                                    )}
                                </form.Field>
                            </div>
                            {/* Status field */}
                            <div className='w-[45%] mb-8'>
                                <form.Field
                                    name="status"
                                    // validators={{
                                    // onChange: ({ value }) => {
                                    //     if (!value) {
                                    //     return t('ui.validation.required', { attribute: t('ui.loans.fields.status') });
                                    //     }
                                    //     return undefined;
                                    // },
                                    // }}
                                >
                                    {(field) => {
                                    const statuses = [
                                        { value: "pending", label: "Pending" },
                                        { value: "returned", label: "Returned" },
                                        { value: "overdue", label: "Overdue" },
                                    ];

                                    const selected = statuses.find((s) => s.value === field.state.value);

                                    return (
                                        <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-4 flex items-center gap-1">
                                            <GitPullRequestArrow color="grey" size={18} />
                                            {t('ui.loans.fields.status')}
                                            </div>
                                        </Label>
                                        <Popover open={open} onOpenChange={setOpen}>

                                            <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-[240px] justify-start">
                                                {selected ? selected.label : t('ui.loans.placeholders.select_status')}
                                            </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0 w-[240px]">
                                            <Command>
                                                <CommandInput placeholder={t('ui.loans.fields.select_status')} />
                                                <CommandList>
                                                <CommandEmpty>{t('ui.common.no_results')}</CommandEmpty>
                                                <CommandGroup>
                                                    {statuses.map((status) => (
                                                    <CommandItem
                                                        key={status.value}
                                                        value={status.value}
                                                        onSelect={() => field.handleChange(status.value)}
                                                    >
                                                        {status.label}
                                                    </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                                </CommandList>
                                            </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FieldInfo field={field} />
                                        </>
                                    );
                                    }}
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
