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
import { LandPlot, Save, Building, X, LibraryBig, Drama, Book } from 'lucide-react';
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

export function ShelfForm({ initialData, page, perPage, zones, categories }: ShelfFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const uniqueCategories = categories.filter(
        (cat, index, self) => index === self.findIndex((c) => c.name === cat.name)
    );

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            code: initialData?.code ?? '',
            capacity: initialData?.capacity ?? '',
            zone_id: initialData?.zone_id ?? '',
            category_id: initialData?.category_id ?? '',

        },
        onSubmit: async ({ value }) => {
            const shelfData = {
                ...value,
            };

            const options = {

                onSuccess: () => {
                    console.log('Zona creada con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['shelves'] });

                    // Construct URL with page parameters
                    let url = '/shelves';
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
                        toast.error(initialData ? t('messages.shelves.error.update') : t('messages.shelves.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/shelves/${initialData.id}`, shelfData, options);
            } else {
                router.post('/shelves', shelfData, options);
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
                <Tabs defaultValue="shelfForm">

                    <TabsContent value="shelfForm" className="w-full flex justify-center gap-20">
                        <div className="h-full">
                            {/* Name field */}
                            <div className="mb-8">
                                <form.Field
                                    name="code"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));

                                            return !value
                                                ? t('ui.validation.required', { attribute: t('ui.shelves.fields.shelf_zone')})
                                                : value.length < 3
                                                ? t('ui.validation.min.string', { attribute: t('ui.shelves.fields.name').toLowerCase(), min: '3' })
                                                : undefined;
                                        },
                                    }}

                                >
                                    {(field) => (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <LibraryBig color="grey" size={18} />
                                                    {t('ui.shelves.fields.name')}
                                                </div>
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                value={field.state.value?.toString()}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder={t('ui.shelves.placeholders.code')}
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
                            {/* Capacity field */}
                            <div className="mb-8">
                                <form.Field
                                    name="capacity"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));

                                            const stringValue = String(value);
                                            const number = parseInt(stringValue, 10);

                                            if (!stringValue) {
                                                return t('ui.validation.required', { attribute: t('ui.shelves.fields.max-shelves')});
                                            }

                                            if (isNaN(number)) {
                                                return t('ui.validation.max_shelves');
                                            }

                                            if (number > 10) {
                                                return t('ui.validation.max_shelves');
                                            }

                                            return undefined;
                                        },
                                    }}
                                >
                                    {(field) => (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <Book color="grey" size={18} />
                                                    {t('ui.shelves.fields.max-books')}
                                                </div>
                                            </Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                value={field.state.value ? String(field.state.value) : undefined}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                placeholder={t('ui.shelves.placeholders.max-books')}
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

                            {/* Floor field */}
                            <div className='w-[45%] mb-8'>
                                <form.Field
                                    name="zone_id"
                                    validators={{
                                        onChangeAsync: async ({ value }) => {
                                            await new Promise((resolve) => setTimeout(resolve, 300));



                                            if (!value) {
                                                return t('ui.validation.required', { attribute: t('ui.shelves.fields.shelf_zone')});
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
                                                    {t('ui.shelves.fields.shelf_zone')}
                                                </div>
                                            </Label>
                                            <Select
                                                value={field.state.value}
                                                onValueChange={(value: string) => {
                                                    field.handleChange(value);
                                                }}
                                            >
                                                <SelectTrigger className=" w-48 rounded-md border mb-6">
                                                    <SelectValue placeholder={t('ui.shelves.placeholders.shelf_zone')} />
                                                </SelectTrigger>
                                                <SelectContent className="h-30">
                                                    {zones.map((zone) => (
                                                        <SelectItem key={zone.id} value={zone.name} className="w-full">
                                                            <div className="text-sm">
                                                                Zona: {zone.name}
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
                            {/* Floor field */}
                            <div className='w-[45%] mb-8'>
                                <form.Field
                                    name="category_id"
                                    // validators={{
                                    //     onChangeAsync: async ({ value }) => {
                                    //         await new Promise((resolve) => setTimeout(resolve, 300));



                                    //         if (!value) {
                                    //             return t('ui.validation.required', { attribute: t('ui.zones.fields.zone_floor')});
                                    //         }

                                    //         return undefined;
                                    //     },
                                    // }}
                                >
                                    {(field) => (
                                        <>

                                            <Label htmlFor={field.name}>
                                                <div className="mb-4 flex items-center gap-1">
                                                    <Drama color="grey" size={18} />
                                                    {t('ui.shelves.fields.category')}
                                                </div>
                                            </Label>
                                            <Select
                                                value={field.state.value}
                                                onValueChange={(value: string) => {
                                                    field.handleChange(value);
                                                }}
                                            >
                                                <SelectTrigger className=" w-48 rounded-md border mb-6">
                                                    <SelectValue placeholder={t('ui.shelves.placeholders.category')} />
                                                </SelectTrigger>
                                                <SelectContent className="h-30">
                                                    {uniqueCategories.map((category) => (
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
                            let url = '/shelves';
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
                        {t('ui.shelves.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.shelves.buttons.saving')
                                    : initialData
                                      ? t('ui.shelves.buttons.update')
                                      : t('ui.shelves.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>

            </div>
        </form>
    );
}
