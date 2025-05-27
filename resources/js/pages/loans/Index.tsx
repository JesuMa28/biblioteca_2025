import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Loan, useDeleteLoan, useLoans } from "@/hooks/loans/useLoans";
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
import { LoanLayout } from "@/layouts/loans/LoanLayout";
import { floor } from "lodash";
import FloorsIndex from "../floors/Index";

export default function LoansIndex() {
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

  const { data: loans, isLoading, isError, refetch } = useLoans({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteLoanMutation = useDeleteLoan();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteLoan = async (id: string) => {
    try {
      await deleteLoanMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.loans.deleted_error") || "Error deleting loan");
      console.error("Error deleting loan:", error);
    }
  };

  const columnHelper = createColumnHelper<Loan>();

  const columns = useMemo(() => ([
    createTextColumn<Loan>({
      id: "code",
      header: t("ui.loans.columns.code") || "Code",
      accessorKey: "code",
    }),
    createTextColumn<Loan>({
      id: "book_title",
      header: t("ui.loans.columns.book_title") || "Book Title",
      accessorKey: "book_title",
    }),
    createTextColumn<Loan>({
      id: "user_email",
      header: t("ui.loans.columns.user_email") || "User Email",
      accessorKey: "user_email",
    }),
    createTextColumn<Loan>({
      id: "loan_date",
      header: t("ui.loans.columns.loan_date") || "Loan Date",
      accessorKey: "loan_date",
    }),
    createTextColumn<Loan>({
      id: "return_date",
      header: t("ui.loans.columns.return_date") || "Return Date",
      accessorKey: "return_date",
    }),
    createTextColumn<Loan>({
      id: "status",
      header: t("ui.loans.columns.status") || "Status",
      accessorKey: "status",
    }),
    createDateColumn<Loan>({
      id: "created_at",
      header: t("ui.loans.columns.created_at") || "Created At",
      accessorKey: "created_at",
    }),
    createActionsColumn<Loan>({
      id: "actions",
      header: t("ui.loans.columns.actions") || "Actions",
      renderActions: (loan) => (
        <>
          <Link href={`/loans/${loan.id}/edit?page=${currentPage}&perPage=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.loans.buttons.edit") || "Edit loan"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={loan.id}
            onDelete={handleDeleteLoan}
            title={t("ui.loans.delete.title") || "Delete loan"}
            description={t("ui.loans.delete.description") || "Are you sure you want to delete this loan? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.loans.buttons.delete") || "Delete loan"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<Loan>[]), [t, handleDeleteLoan]);

  return (
      <LoanLayout title={t('ui.loans.code')}>
          <div className="p-6">
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.loans.code')}</h1>
                      <Link href="/loans/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.loans.buttons.new')}
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
                                      label: t('ui.loans.filters.search') || 'Buscar',
                                      type: 'text',
                                      placeholder: t('ui.loans.placeholders.search') || 'Buscar...',
                                  },
                                  {
                                      id: 'title',
                                      label: t('ui.loans.filters.title') || 'Book Title',
                                      type: 'text',
                                      placeholder: t('ui.loans.placeholders.book_title') || 'Title...',
                                  },
                                  {
                                      id: 'author',
                                      label: t('ui.loans.filters.author') || 'User Email',
                                      type: 'text',
                                      placeholder: t('ui.loans.placeholders.user_email') || 'Email...',
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
                              <div className="mb-4 text-red-500">{t('ui.loans.error_loading')}</div>
                              <Button onClick={() => refetch()} variant="outline">
                                  {t('ui.loans.buttons.retry')}
                              </Button>
                          </div>
                      ) : (
                          <div>
                              <Table
                                  data={
                                      loans ?? {
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
                                  noResultsMessage={t('ui.loans.no_results') || 'No loans found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </LoanLayout>
  );
}
