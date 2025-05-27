import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Reservation, useDeleteReservation, useReservations } from "@/hooks/reservations/useReservations";
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
import { ReservationLayout } from "@/layouts/reservations/ReservationLayout";
import { floor } from "lodash";
import FloorsIndex from "../floors/Index";

export default function ReservationsIndex() {
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

  const { data: reservations, isLoading, isError, refetch } = useReservations({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteReservationMutation = useDeleteReservation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteReservation = async (id: string) => {
    try {
      await deleteReservationMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.reservations.deleted_error") || "Error deleting reservation");
      console.error("Error deleting reservation:", error);
    }
  };

  const columnHelper = createColumnHelper<Reservation>();

  const columns = useMemo(() => ([
    createTextColumn<Reservation>({
      id: "code",
      header: t("ui.reservations.columns.code") || "Code",
      accessorKey: "code",
    }),
    createTextColumn<Reservation>({
      id: "book_title",
      header: t("ui.reservations.columns.book_title") || "Book Title",
      accessorKey: "book_title",
    }),
    createTextColumn<Reservation>({
      id: "user_email",
      header: t("ui.reservations.columns.user_email") || "User Email",
      accessorKey: "user_email",
    }),
    createDateColumn<Reservation>({
      id: "created_at",
      header: t("ui.reservations.columns.created_at") || "Created At",
      accessorKey: "created_at",
    }),
    createActionsColumn<Reservation>({
      id: "actions",
      header: t("ui.reservations.columns.actions") || "Actions",
      renderActions: (reservation) => (
        <>
          <Link href={`/reservations/${reservation.id}/edit?page=${currentPage}&perPage=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.reservations.buttons.edit") || "Edit reservation"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={reservation.id}
            onDelete={handleDeleteReservation}
            title={t("ui.reservations.delete.title") || "Delete reservation"}
            description={t("ui.reservations.delete.description") || "Are you sure you want to delete this reservation? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.reservations.buttons.delete") || "Delete reservation"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<Reservation>[]), [t, handleDeleteReservation]);

  return (
      <ReservationLayout title={t('ui.reservations.code')}>
          <div className="p-6">
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.reservations.code')}</h1>
                      <Link href="/reservations/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.reservations.buttons.new')}
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
                                      label: t('ui.reservations.filters.search') || 'Buscar',
                                      type: 'text',
                                      placeholder: t('ui.reservations.placeholders.search') || 'Buscar...',
                                  },
                                  {
                                      id: 'title',
                                      label: t('ui.reservations.filters.title') || 'Book Title',
                                      type: 'text',
                                      placeholder: t('ui.reservations.placeholders.book_title') || 'Title...',
                                  },
                                  {
                                      id: 'author',
                                      label: t('ui.reservations.filters.author') || 'User Email',
                                      type: 'text',
                                      placeholder: t('ui.reservations.placeholders.user_email') || 'Email...',
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
                              <div className="mb-4 text-red-500">{t('ui.reservations.error_loading')}</div>
                              <Button onClick={() => refetch()} variant="outline">
                                  {t('ui.reservations.buttons.retry')}
                              </Button>
                          </div>
                      ) : (
                          <div>
                              <Table
                                  data={
                                    reservations ?? {
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
                                  noResultsMessage={t('ui.reservations.no_results') || 'No reservations found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </ReservationLayout>
  );
}
