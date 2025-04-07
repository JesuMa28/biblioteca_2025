import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { LandPlot, Save, Building, X } from 'lucide-react';
import { toast } from 'sonner';

interface FloorFormProps {
    initialData?: {
        id: string;
        number: number;
        capacity: number;
    };
    page?: string;
    perPage?: string;
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

export function FloorForm({ initialData, page, perPage }: FloorFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            number: initialData?.number ?? '',
            capacity: initialData?.capacity ?? '',

        },
        onSubmit: async ({ value }) => {
            const floorData = {
                ...value,
            };

            const options = {

                onSuccess: () => {
                    console.log('Piso creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['floors'] });

                    // Construct URL with page parameters
                    let url = '/floors';
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
                        toast.error(initialData ? t('messages.floors.error.update') : t('messages.floors.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/floors/${initialData.id}`, floorData, options);
            } else {
                router.post('/floors', floorData, options);
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
                <Tabs defaultValue="floorForm">

                    <TabsContent value="floorForm" className="w-full flex justify-between">
                        {/* Name field */}
                        <div className='w-[45%]'>
                            <form.Field
                                name="number"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 300));

                                        // Si no hay valor, devolver error
                                        if (!value) {
                                            return t('ui.validation.required', { attribute: t('ui.floors.fields.floor')});
                                        }

                                        const res = await fetch(`/api/floors/check-number/${value}`);
                                        const data = await res.json();

                                        if (data.exists) {
                                            return t('ui.validation.used_floor', { attribute: t('ui.floors.fields.floor')});
                                        }

                                        return undefined;
                                    },
                                }}

                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-1 flex items-center gap-1">
                                                <Building color="grey" size={18} />
                                                {t('ui.floors.fields.floor')}
                                            </div>
                                        </Label>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.floors.placeholders.number')}
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
                        <div className='w-[45%]'>
                            <form.Field
                                name="capacity"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 300));

                                        const stringValue = String(value);
                                        const number = parseInt(stringValue, 10);

                                        if (!stringValue) {
                                            return t('ui.validation.required', { attribute: t('ui.floors.fields.max-zones')});
                                        }

                                        if (isNaN(number)) {
                                            return t('ui.validation.max_zones');
                                        }

                                        if (number > 10) {
                                            return t('ui.validation.max_zones');
                                        }

                                        return undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-1 flex items-center gap-1">
                                                <LandPlot color="grey" size={18} />
                                                {t('ui.floors.fields.max-zones')}
                                            </div>
                                        </Label>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.floors.placeholders.max-zones')}
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

                    </TabsContent>

                </Tabs>
                <Separator className="mt-3" />
                {/* Form buttons */}
                <div className="mt-6 mb-2 flex justify-center gap-100">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = '/floors';
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
                        {t('ui.floors.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.floors.buttons.saving')
                                    : initialData
                                      ? t('ui.floos.buttons.update')
                                      : t('ui.floors.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}
