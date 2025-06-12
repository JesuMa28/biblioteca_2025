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
import { LandPlot, Save, Building, X, LibraryBig, Drama } from 'lucide-react';
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



interface BookFormProps {
    initialData?: {
        id: string;
        title: string;
        author: string;
        editorial: string;
        language: string;
        category_id: string;
        published_year: number;
        isbn: string;
        pages: number;
        shelf_id: string;
    };
    page?: string;
    perPage?: string;
    languages: {
        name: string;
    } [];

    shelves: {
        id: string;
        code: string;
    } [];
    categories: {
        id: string;
        name: string;
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

export function BookForm({ initialData, page, perPage, shelves, languages, categories }: BookFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    // const uniqueCategories = categories.filter(
    //     (cat, index, self) => index === self.findIndex((c) => c.name === cat.name)
    // );

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            title: initialData?.title ?? '',
            author: initialData?.author ?? '',
            editorial: initialData?.editorial ?? '',
            language: initialData?.language ?? '',
            published_year: initialData?.published_year ?? '',
            isbn: initialData?.isbn ?? '',
            pages: initialData?.pages ?? '',
            shelf_id: initialData?.shelf_id ?? '',
            category_id: initialData?.category_id ?? '',

        },
        onSubmit: async ({ value }) => {
            const bookData = {
                ...value,
            };

            const options = {

                onSuccess: () => {
                    console.log('Zona creada con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['books'] });

                    // Construct URL with page parameters
                    let url = '/books';
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
                        toast.error(initialData ? t('messages.books.error.update') : t('messages.books.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/books/${initialData.id}`, bookData, options);
            } else {
                router.post('/books', bookData, options);
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
                <Tabs defaultValue="bookForm">

                    <TabsContent value="bookForm" className="w-full flex justify-center gap-20">
                        <div className="h-full">
                            {/* Name field */}
                            <div className="mb-8">
                                <form.Field
                                    name="title"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));

                                            return !value
                                                ? t('ui.validation.required', { attribute: t('ui.books.fields.title')})
                                                : value.length < 3
                                                ? t('ui.validation.min.string', { attribute: t('ui.books.fields.title').toLowerCase(), min: '3' })
                                                : undefined;
                                        },
                                    }}

                                >
                                    {(field) => (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <LandPlot color="grey" size={18} />
                                                    {t('ui.books.fields.title')}
                                                </div>
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                value={field.state.value?.toString()}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder={t('ui.books.placeholders.title')}
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
                            {/* Author field */}
                            <div className="mb-8">
                                <form.Field
                                    name="author"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));

                                            const stringValue = String(value);
                                            const number = parseInt(stringValue, 10);

                                            if (!stringValue) {
                                                return t('ui.validation.required', { attribute: t('ui.books.fields.author')});
                                            }

                                            if (isNaN(number)) {
                                                return t('ui.validation.author');
                                            }

                                            if (number > 10) {
                                                return t('ui.validation.author');
                                            }

                                            return undefined;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <LibraryBig color="grey" size={18} />
                                                    {t('ui.books.fields.author')}
                                                </div>
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                value={field.state.value ? String(field.state.value) : undefined}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder={t('ui.books.placeholders.author')}
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
                            {/* Editorial field */}
                            <div className="mb-8">
                                <form.Field
                                    name="editorial"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));

                                            const stringValue = String(value);
                                            const number = parseInt(stringValue, 10);

                                            if (!stringValue) {
                                                return t('ui.validation.required', { attribute: t('ui.books.fields.editorial')});
                                            }

                                            if (isNaN(number)) {
                                                return t('ui.validation.editorial');
                                            }

                                            if (number > 10) {
                                                return t('ui.validation.editorial');
                                            }

                                            return undefined;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <LibraryBig color="grey" size={18} />
                                                    {t('ui.books.fields.editorial')}
                                                </div>
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                value={field.state.value ? String(field.state.value) : undefined}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder={t('ui.books.placeholders.editorial')}
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

                            {/* ISBN field */}
                            <div className="mb-8">
                                <form.Field
                                    name="isbn"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));

                                            const stringValue = String(value);
                                            const number = parseInt(stringValue, 10);

                                            if (!stringValue) {
                                                return t('ui.validation.required', { attribute: t('ui.books.fields.isbn')});
                                            }

                                            if (isNaN(number)) {
                                                return t('ui.validation.isbn');
                                            }

                                            if (number > 10) {
                                                return t('ui.validation.isbn');
                                            }

                                            return undefined;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <LibraryBig color="grey" size={18} />
                                                    {t('ui.books.fields.isbn')}
                                                </div>
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                value={field.state.value ? String(field.state.value) : undefined}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder={t('ui.books.placeholders.isbn')}
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

                            {/* Published Year field */}
                            <div className="mb-8">
                                <form.Field
                                    name="published_year"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));

                                            const stringValue = String(value);
                                            const number = parseInt(stringValue, 10);

                                            if (!stringValue) {
                                                return t('ui.validation.required', { attribute: t('ui.books.fields.published_year')});
                                            }

                                            if (isNaN(number)) {
                                                return t('ui.validation.published_year');
                                            }

                                            if (number > 10) {
                                                return t('ui.validation.published_year');
                                            }

                                            return undefined;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <LibraryBig color="grey" size={18} />
                                                    {t('ui.books.fields.published_year')}
                                                </div>
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                value={field.state.value ? String(field.state.value) : undefined}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder={t('ui.books.placeholders.published_year')}
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

                        </div>

                        <div className="h-full">

                            {/* Pages field */}
                            <div className="mb-8">
                                <form.Field
                                    name="pages"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));

                                            const stringValue = String(value);
                                            const number = parseInt(stringValue, 10);

                                            if (!stringValue) {
                                                return t('ui.validation.required', { attribute: t('ui.books.fields.pages')});
                                            }

                                            if (isNaN(number)) {
                                                return t('ui.validation.pages');
                                            }

                                            if (number > 10) {
                                                return t('ui.validation.pages');
                                            }

                                            return undefined;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <LibraryBig color="grey" size={18} />
                                                    {t('ui.books.fields.pages')}
                                                </div>
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                value={field.state.value ? String(field.state.value) : undefined}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder={t('ui.books.placeholders.pages')}
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

                            {/* Language field */}
                            <div className='w-[45%] mb-8'>
                                <form.Field
                                    name="language"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));



                                            if (!value) {
                                                return t('ui.validation.required', { attribute: t('ui.books.fields.languages')});
                                            }

                                            return undefined;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <>

                                            <Label htmlFor={field.name}>
                                                <div className="mb-4 flex items-center gap-1">
                                                    <Building color="grey" size={18} />
                                                    {t('ui.books.fields.languages')}
                                                </div>
                                            </Label>
                                            <Select
                                                value={field.state.value}
                                                onValueChange={(value: string) => {
                                                    field.handleChange(value);
                                                }}
                                            >
                                                <SelectTrigger className=" w-48 rounded-md border mb-6">
                                                    <SelectValue placeholder={t('ui.books.placeholders.languages')} />
                                                </SelectTrigger>
                                                <SelectContent className="h-30">
                                                    {languages.map((language) => (
                                                        <SelectItem key={language.name} value={language.name} className="w-full">
                                                            <div className="text-sm">
                                                                {language.name}
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

                            {/* Shelves field */}
                            <div className='w-[45%] mb-8'>
                                <form.Field
                                    name="shelf_id"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));



                                            if (!value) {
                                                return t('ui.validation.required', { attribute: t('ui.books.fields.shelves')});
                                            }

                                            return undefined;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <>

                                            <Label htmlFor={field.name}>
                                                <div className="mb-4 flex items-center gap-1">
                                                    <Building color="grey" size={18} />
                                                    {t('ui.books.fields.shelves')}
                                                </div>
                                            </Label>
                                            <Select
                                                value={field.state.value}
                                                onValueChange={(value: string) => {
                                                    field.handleChange(value);
                                                }}
                                            >
                                                <SelectTrigger className=" w-48 rounded-md border mb-6">
                                                    <SelectValue placeholder={t('ui.books.placeholders.shelves')} />
                                                </SelectTrigger>
                                                <SelectContent className="h-30">
                                                    {shelves.map((shelf) => (
                                                        <SelectItem key={shelf.id} value={shelf.id} className="w-full">
                                                            <div className="text-sm">
                                                                {shelf.code}
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

                            {/* Categories field */}
                            <div className='w-[45%] mb-8'>
                                <form.Field
                                    name="category_id"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));



                                            if (!value) {
                                                return t('ui.validation.required', { attribute: t('ui.books.fields.categories')});
                                            }

                                            return undefined;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <>

                                            <Label htmlFor={field.name}>
                                                <div className="mb-4 flex items-center gap-1">
                                                    <Building color="grey" size={18} />
                                                    {t('ui.books.fields.categories')}
                                                </div>
                                            </Label>
                                            <Select
                                                value={field.state.value}
                                                onValueChange={(value: string) => {
                                                    field.handleChange(value);
                                                }}
                                            >
                                                <SelectTrigger className=" w-48 rounded-md border mb-6">
                                                    <SelectValue placeholder={t('ui.books.placeholders.categories')} />
                                                </SelectTrigger>
                                                <SelectContent className="h-30">
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id} className="w-full">
                                                            <div className="text-sm">
                                                                {category.name}
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
                            let url = '/books';
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
                        {t('ui.books.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.books.buttons.saving')
                                    : initialData
                                      ? t('ui.books.buttons.update')
                                      : t('ui.books.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>

            </div>
        </form>
    );
}
