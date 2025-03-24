import { useForm } from "@tanstack/react-form";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield } from 'lucide-react';
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator";
import { Users, PackageOpen, FileText, Settings } from 'lucide-react';
import { useEffect } from "react";


const permissionsGroup = {

    "users": [
        { id: "view", label: "Ver usuarios" },
        { id: "create", label: "Crear usuarios" },
        { id: "edit", label: "Editar usuarios" },
        { id: "delete", label: "Eliminar usuarios" },
    ],

    "products": [
        { id: "view", label: "Ver productos" },
        { id: "create", label: "Crear productos" },
        { id: "edit", label: "Editar productos" },
        { id: "delete", label: "Eliminar productos" },
    ],

    "reports": [
        { id: "view", label: "Ver reportes" },
        { id: "export", label: "Exportar reportes" },
        { id: "import", label: "Importar reportes" },
    ],

    "settings": [
        { id: "view", label: "Ver reportes" },
        { id: "export", label: "Acceso a configuración" },
        { id: "import", label: "Modificar configuración" },
    ]

 } as const;


const iconsMap: Record<keyof typeof permissionsGroup, React.ComponentType<{ className?: string }>> = {
  users: Users,
  products: PackageOpen,
  reports: FileText,
  settings: Settings,
};

export function PermissionsForm() {
    const form = useForm({
        defaultValues: {
            selector: "",
            items: ["view"],
        },
        onSubmit: async ({ value }) => {
            console.log("Formulario enviado:", value);
            toast.success("Formulario enviado con éxito");
        },
    });

    // useEffect(() =>{
    //     // Getting the role
    //     const role = form.getValues("selector");

    //     // Choosing the checked boxes by default with each role
    //     if (role == "admin") {
    //         Object.keys(permissionsGroup).forEach((category) => {
    //             permissionsGroup[category as keyof typeof permissionsGroup].forEach((perm) => {
    //                 form.setValues(`permissions.${category}.${perm.id}`, true);
    //             });
    //         });
    //     } else if (role === "user") {
    //         // Checking only the first and second perms of each section
    //         Object.keys(permissionsGroup).forEach((category) => {
    //             permissionsGroup[category as keyof typeof permissionsGroup].forEach((perm, index) => {
    //                 if (index === 0 || index === 1) {
    //                     form.setValue(`permissions.${category}.${perm.id}`, true);
    //                 } else {
    //                     form.setValue(`permissions.${category}.${perm.id}`, false);
    //                 }
    //             });
    //         });
    //     }
    // }, [form.getValues("selector")]); // Este efecto se ejecuta cuando cambia el valor de "selector"



    return (

        <form onSubmit={form.handleSubmit} className="space-y-6 w-full mx-auto rounded-lg shadow-lg">

            {/* Selección de categoría */}
            <form.Field name="selector">
                {(field) => (
                    <div>
                        <Label htmlFor="selector" className="flex items-center mb-2">
                            <Shield size={18} className="mr-2" />
                            Rol Principal

                        </Label>
                        <Select
                            onValueChange={(value) => field.handleChange(value)}
                            value={field.state.value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un Rol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Administrador</SelectItem>
                                <SelectItem value="user">Usuario</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                )}
            </form.Field>

            <Separator/>

            <FormItem className="grid grid-cols-2 gap-4">
                {Object.entries(permissionsGroup).map(([category, permissions]) => {
                    const Icon = iconsMap[category as keyof typeof iconsMap];

                    return (
                        <Card key={category}>
                            <CardHeader className="w-full">
                                <div className="w-full flex items-center">
                                    {Icon && <Icon className="w-4 h-4 mr-2 text-[#3b82f6]"/>}
                                    <CardTitle className="w-5">
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </CardTitle>

                                </div>
                            </CardHeader>
                            <CardContent>
                                {permissions.map((perm) => (
                                    <form.Field key={perm.id} name={`permissions.${category}.${perm.id}`} defaultValue={false}>
                                        {(field) => {
                                            // Saving checboxes' Id for the htmlFor of the labels
                                            const checkboxId = `checkbox-${category}-${perm.id}`;
                                            return (
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <Checkbox
                                                        checked={Boolean(field.state.value)}
                                                        onCheckedChange={(checked) => field.handleChange(checked === true)}
                                                        className="border-[#3b82f6] data-[state=checked]:bg-[#3b82f6] data-[state=checked]:border-[#3b82f6]"

                                                    />
                                                    <Label htmlFor={checkboxId}>{perm.label}</Label>
                                                </div>
                                            );
                                        }}
                                    </form.Field>
                                ))}
                            </CardContent>
                        </Card>
                    );
                })}
            </FormItem>

            {/* Botón de envío */}
            <Button type="submit" className="w-full">
                Enviar
            </Button>
        </form>
    );
}
