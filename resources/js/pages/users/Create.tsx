import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button"
import { User } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function CreateUser() {
  const { t } = useTranslations();

  return (
    <UserLayout title={t("ui.users.create")}>
      <div className=" p-8 w-full flex justify-center">
        <div className="w-[70%]">

          <Tabs defaultValue="createUser" className="w-[100%]">

            {/* Main Card */}
            <Card className="shadow-xl">

              {/* Main Card Content */}
              <CardContent>

                {/* Header Content */}
                <CardHeader className="mb-4 p-0">
                  <div className="w-full flex items-center">
                    <User color="#3b82f6" className="mr-2" />
                    <CardTitle>{t("ui.user_creation.title")}</CardTitle>
                  </div>
                  <CardDescription>{t("ui.user_creation.description")}</CardDescription>
                </CardHeader>

                <Separator className="my-4" />

                {/* Switch */}
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="createUser">{t("ui.user_creation.tab_list.user_info_tab")}</TabsTrigger>
                  <TabsTrigger value="roles&permissions">{t("ui.user_creation.tab_list.roles_permissions")}</TabsTrigger>
                </TabsList>

                <Separator className="my-4" />

                {/* CreateUser Section */}
                <TabsContent value="createUser">
                  {/* Import Form as Card content */}
                  <UserForm />
                </TabsContent>

                {/* Roles-Permissions Section */}
                <TabsContent value="roles&permissions">

                    <CardContent className="">

                    </CardContent>


                </TabsContent>

              </CardContent>

            </Card>

          </Tabs>

        </div>
      </div>
    </UserLayout>
  );
}
