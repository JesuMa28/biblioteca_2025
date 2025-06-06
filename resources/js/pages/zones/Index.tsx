import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Zone, useDeleteZone, useZones } from "@/hooks/zones/useZones";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useMemo } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslations } from "@/hooks/use-translations";
import { Table } from "@/components/stack-table/Table";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { toast } from "sonner";
import { ColumnDef, createColumnHelper, Row } from "@tanstack/react-table";
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";
import { floor } from "lodash";
import FloorsIndex from "../floors/Index";

export default function ZonesIndex() {
  const { t } = useTranslations();
  const { url } = usePage();

  // Obtener los parámetros de la URL actual
  const urlParams = new URLSearchParams(url.split('?')[1] || '');
  const pageParam = urlParams.get('page');
  const perPageParam = urlParams.get('per_page');

  // Inicializar el estado con los valores de la URL o los valores predeterminados
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const [perPage, setPerPage] = useState(perPageParam ? parseInt(perPageParam) : 10);
  const [filters, setFilters] = useState<Record<string, any>>({});
  // Combine name and email filters into a single search string if they exist
  const combinedSearch = [
    filters.search,
    filters.name ? `${filters.name}` : null,
    filters.capacity ? `${filters.capacity}` : null
  ].filter(Boolean).join(' ');

  const { data: zones, isLoading, isError, refetch } = useZones({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteZoneMutation = useDeleteZone();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteZone = async (id: string) => {
    try {
      await deleteZoneMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.zones.deleted_error") || "Error deleting zone");
      console.error("Error deleting zone:", error);
    }
  };

  const columnHelper = createColumnHelper<Zone>();

  const columns = useMemo(() => ([
    createTextColumn<Zone>({
      id: "name",
      header: t("ui.zones.columns.name") || "Name",
      accessorKey: "name",
    }),
    createTextColumn<Zone>({
      id: "category_name",
      header: t("ui.zones.columns.category") || "Category",
      accessorKey: "category_name",
    }),
    createTextColumn<Zone>({
      id: "floor_number",
      header: t("ui.zones.columns.floor_number") || "Floor Number",
      accessorKey: "floor_number",
    }),
    createTextColumn<Zone>({
      id: "zones_count",
      header: t("ui.zones.columns.current_shelves") || "Shelves Count",
      accessorKey: "zones_count",
    }),
    createTextColumn<Zone>({
      id: "capacity",
      header: t("ui.zones.columns.capacity") || "Capacity",
      accessorKey: "capacity",
    }),
    createDateColumn<Zone>({
      id: "created_at",
      header: t("ui.zones.columns.created_at") || "Created At",
      accessorKey: "created_at",
    }),
    createActionsColumn<Zone>({
      id: "actions",
      header: t("ui.zones.columns.actions") || "Actions",
      renderActions: (zone) => (
        <>
          <Link href={`/zones/${zone.id}/edit?page=${currentPage}&perPage=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.zones.buttons.edit") || "Edit zone"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={zone.id}
            onDelete={handleDeleteZone}
            title={t("ui.zones.delete.title") || "Delete zone"}
            description={t("ui.zones.delete.description") || "Are you sure you want to delete this zone? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.zones.buttons.delete") || "Delete zone"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<Zone>[]), [t, handleDeleteZone]);

  return (
      <ZoneLayout title={t('ui.zones.title')}>
          <div className="p-6">
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.zones.title')}</h1>
                      <Link href="/zones/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.zones.buttons.new')}
                          </Button>
                      </Link>
                  </div>
                  <div></div>

                  <div className="space-y-4">
                      <FiltersTable
                          filters={
                              [
                                  {
                                      id: 'search',
                                      label: t('ui.zones.filters.search') || 'Buscar',
                                      type: 'text',
                                      placeholder: t('ui.zones.placeholders.search') || 'Buscar...',
                                  },
                                  {
                                      id: 'name',
                                      label: t('ui.zones.filters.name') || 'Nombre',
                                      type: 'text',
                                      placeholder: t('ui.zones.placeholders.name') || 'Nombre...',
                                  },
                                  {
                                      id: 'categories',
                                      label: t('ui.zones.filters.category') || 'Category',
                                      type: 'text',
                                      placeholder: t('ui.zones.placeholders.capacity') || 'Category...',
                                  },
                              ] as FilterConfig[]
                          }
                          onFilterChange={setFilters}
                          initialValues={filters}
                      />
                  </div>

                  <div className="w-full overflow-hidden">
                      {isLoading ? (
                          <TableSkeleton columns={4} rows={10} />
                      ) : isError ? (
                          <div className="p-4 text-center">
                              <div className="mb-4 text-red-500">{t('ui.zones.error_loading')}</div>
                              <Button onClick={() => refetch()} variant="outline">
                                  {t('ui.zones.buttons.retry')}
                              </Button>
                          </div>
                      ) : (
                          <div>
                              <Table
                                  data={
                                      zones ?? {
                                          data: [],
                                          meta: {
                                              current_page: 1,
                                              from: 0,
                                              last_page: 1,
                                              per_page: perPage,
                                              to: 0,
                                              total: 0,
                                          },
                                      }
                                  }
                                  columns={columns}
                                  onPageChange={handlePageChange}
                                  onPerPageChange={handlePerPageChange}
                                  perPageOptions={[10, 25, 50, 100]}
                                  noResultsMessage={t('ui.zones.no_results') || 'No zones found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </ZoneLayout>
  );
}
