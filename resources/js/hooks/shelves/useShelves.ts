import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";

export interface Shelf {
  id: string;
  code: string;
  capacity: number;
  floor_number: number;
  zone_id: string;
  zone_name: string;
  category_id: string;
  category_name: string;
  created_at: string;
  shelves_count: number;
}

// Interface representing the actual API response structure
export interface ApiPaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Interface representing the expected format for the Table component
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

interface UseShelvesParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export function useShelves({ search, page = 1, perPage = 10 }: UseShelvesParams = {}) {
  return useQuery({
    queryKey: ["shelves", { search, page, perPage }],
    queryFn: async () => {
      const { data: apiResponse } = await axios.get<ApiPaginatedResponse<Shelf>>("/api/shelves", {
        params: {
          search,
          page,
          per_page: perPage,
        },
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      // Transform the API response to the expected format
      return {
        data: apiResponse.data,
        meta: {
          current_page: apiResponse.current_page,
          from: apiResponse.from,
          last_page: apiResponse.last_page,
          per_page: apiResponse.per_page,
          to: apiResponse.to,
          total: apiResponse.total
        }
      } as PaginatedResponse<Shelf>;
    },
  });
}

export function useCreateShelf() {
  return useMutation({
    mutationFn: async (data: {
      code: string;
      capacity: number;
      floor_number: number;
      zone_id: string
      zone_name: string;
      category_id: string;
      category_name: string}) => {
      const response = await axios.post("/api/shelves", data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return response.data;
    },
  });
}

export function useUpdateShelf(shelfId: string) {
  return useMutation({
    mutationFn: async (data: {
      code: string;
      capacity: number;
      floor_number: number;
      zone_id: string
      zone_name: string;
      category_id: string;
      category_name: string }) => {
      const response = await axios.put(`/api/shelves/${shelfId}`, data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return response.data;
    },
  });
}

export function useDeleteShelf() {
  return useMutation({
    mutationFn: async (shelfId: string) => {
      await axios.delete(`/api/shelves/${shelfId}`, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
    },
  });
}
