import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Shelf, useDeleteShelf, useShelves } from "@/hooks/shelves/useShelves";
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
import { floor } from "lodash";
import { ShelfLayout } from "@/layouts/shelves/ShelfLayout";
import ZonesIndex from "../zones/Index";

export default function ShelvesIndex() {
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

  const { data: shelves, isLoading, isError, refetch } = useShelves({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteShelfMutation = useDeleteShelf();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteShelf = async (id: string) => {
    try {
      await deleteShelfMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.shelves.deleted_error") || "Error deleting shelf");
      console.error("Error deleting shelf:", error);
    }
  };

  const columnHelper = createColumnHelper<Shelf>();

  const columns = useMemo(() => ([
    createTextColumn<Shelf>({
      id: "code",
      header: t("ui.shelves.columns.code") || "Code",
      accessorKey: "code",
    }),
    createTextColumn<Shelf>({
      id: "category_name",
      header: t("ui.shelves.columns.category") || "Category",
      accessorKey: "category_name",
    }),
    createTextColumn<Shelf>({
      id: "zone_name",
      header: t("ui.shelves.columns.zone_name") || "Zone Name",
      accessorKey: "zone_name",
    }),
    // createTextColumn<Shelf>({
    //   id: "floor_number",
    //   header: t("ui.shelves.columns.floor_number") || "Floor Number",
    //   accessorKey: "floor_number",
    // }),
    createTextColumn<Shelf>({
      id: "shelves_count",
      header: t("ui.shelves.columns.current_shelves") || "Shelves Count",
      accessorKey: "shelves_count",
    }),
    createTextColumn<Shelf>({
      id: "capacity",
      header: t("ui.shelves.columns.capacity") || "Capacity",
      accessorKey: "capacity",
    }),
    createDateColumn<Shelf>({
      id: "created_at",
      header: t("ui.shelves.columns.created_at") || "Created At",
      accessorKey: "created_at",
    }),
    createActionsColumn<Shelf>({
      id: "actions",
      header: t("ui.shelves.columns.actions") || "Actions",
      renderActions: (shelf) => (
        <>
          <Link href={`/shelves/${shelf.id}/edit?page=${currentPage}&perPage=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.shelves.buttons.edit") || "Edit shelf"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={shelf.id}
            onDelete={handleDeleteShelf}
            title={t("ui.shelves.delete.title") || "Delete shelf"}
            description={t("ui.shelves.delete.description") || "Are you sure you want to delete this shelf? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.shelves.buttons.delete") || "Delete shelf"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<Shelf>[]), [t, handleDeleteShelf]);

  return (
      <ShelfLayout title={t('ui.shelves.title')}>
          <div className="p-6">
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.shelves.title')}</h1>
                      <Link href="/shelves/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.shelves.buttons.new')}
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
                                      label: t('ui.shelves.filters.search') || 'Buscar',
                                      type: 'text',
                                      placeholder: t('ui.shelves.placeholders.search') || 'Buscar...',
                                  },
                                  {
                                      id: 'name',
                                      label: t('ui.shelves.filters.code') || 'Nombre',
                                      type: 'text',
                                      placeholder: t('ui.shelves.placeholders.code') || 'Nombre...',
                                  },
                                  {
                                      id: 'categories',
                                      label: t('ui.shelves.filters.category') || 'Category',
                                      type: 'text',
                                      placeholder: t('ui.shelves.placeholders.capacity') || 'Category...',
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
                              <div className="mb-4 text-red-500">{t('ui.shelves.error_loading')}</div>
                              <Button onClick={() => refetch()} variant="outline">
                                  {t('ui.shelves.buttons.retry')}
                              </Button>
                          </div>
                      ) : (
                          <div>
                              <Table
                                  data={
                                      shelves ?? {
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
                                  noResultsMessage={t('ui.shelves.no_results') || 'No shelves found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </ShelfLayout>
  );
}
