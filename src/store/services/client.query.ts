import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { baseApiUrl } from "@/api/index";
import { ClientService } from "@/services/ClientService";

export const clientApi = createApi({
  reducerPath: "clientApi",
  tagTypes: ["Client"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
  }),
  endpoints: (builder) => ({
    fetchClients: builder.query<Response.ClientsResponse | { errors: ErrorObject[] }, { officeId: number; query: string }>({
      queryFn: async ({ officeId, query }) => {
        try {
          const res = await ClientService.fetchClients({ officeId, query });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      providesTags: ["Client"],
    }),
    fetchClient: builder.query<Response.ClientResponse | { errors: ErrorObject[] }, { officeId: number; clientId: number }>(
      {
        queryFn: async ({ officeId, clientId }) => {
          try {
            const res = await ClientService.fetchClient({ officeId, clientId });
            return { data: res };
          } catch (error: any) {
            return {
              error: error.response.data.errors,
            };
          }
        },
        providesTags: ["Client"],
      },
    ),
    createClient: builder.mutation<Model.Client | { errors: ErrorObject[] }, { clientData: FormData; officeId: number }>({
      queryFn: async ({ clientData, officeId }) => {
        try {
          const res = await ClientService.createClient({
            clientData,
            officeId,
          });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      invalidatesTags: ["Client"],
    }),
    updateClient: builder.mutation<
      Model.Client | { errors: ErrorObject[] },
      {
        officeId: number;
        clientId: number;
        data: FormData;
      }
    >({
      queryFn: async ({ officeId, clientId, data }) => {
        try {
          const res = await ClientService.updateClient({
            officeId,
            clientId,
            data,
          });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      invalidatesTags: ["Client"],
    }),
    deleteClient: builder.mutation<
      ResponseSuccess | { error: Response.Ordinary },
      {
        officeId: number;
        clientId: number;
      }
    >({
      queryFn: async ({ officeId, clientId }) => {
        try {
          const res = await ClientService.deleteClient({ officeId, clientId });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data,
          };
        }
      },
      invalidatesTags: ["Client"],
    }),
    updatePriority: builder.mutation<
      Model.Client | { errors: ErrorObject[] },
      {
        officeId: number;
        clientId: number;
        priority: number;
      }
    >({
      queryFn: async ({ officeId, clientId, priority }) => {
        try {
          const res = await ClientService.updatePriority({
            officeId,
            clientId,
            priority,
          });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      invalidatesTags: ["Client"],
    }),
    fetchCards: builder.query<
      Response.CardsResponse | { errors: ErrorObject[] },
      { clientId: number; query: string; page?: number }
    >({
      queryFn: async ({ clientId, query, page = 1 }) => {
        try {
          const res = await ClientService.fetchCards({ clientId, query });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      providesTags: ["Client"],
    }),
    relateCard: builder.mutation<ResponseSuccess | { error: Response.Ordinary }, { query: string; clientId: number }>({
      queryFn: async ({ query, clientId }) => {
        try {
          const res = await ClientService.relateCard({ query, clientId });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data,
          };
        }
      },
      invalidatesTags: ["Client"],
    }),
    createMember: builder.mutation<
      Model.Member | { errors: ErrorObject[] },
      {
        data: {
          linkedPerson: number;
        } & Omit<Model.Member, "linkedPerson">;
        clientId: number;
      }
    >({
      queryFn: async ({ data, clientId }) => {
        try {
          const res = await ClientService.createMember({ data, clientId });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      invalidatesTags: ["Client"],
    }),
    fetchMembers: builder.query<Response.MemberResponse | { errors: ErrorObject[] }, { clientId: number; query: string }>({
      queryFn: async ({ clientId, query }) => {
        try {
          const res = await ClientService.fetchMembers({ clientId, query });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      providesTags: ["Client"],
    }),
    updateMember: builder.mutation<
      Model.Member | { errors: ErrorObject[] },
      {
        clientId: number;
        memberId: number;
        data: {
          linkedPerson: number;
        } & Omit<Model.Member, "linkedPerson">;
      }
    >({
      queryFn: async ({ clientId, memberId, data }) => {
        try {
          const res = await ClientService.updateMember({ clientId, memberId, data });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      invalidatesTags: ["Client"],
    }),
    deleteMember: builder.mutation<
      ResponseSuccess | { errors: ErrorObject[] },
      {
        memberId: number;
        clientId: number;
      }
    >({
      queryFn: async ({ memberId, clientId }) => {
        try {
          const res = await ClientService.deleteMember({
            memberId,
            clientId,
          });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      invalidatesTags: ["Client"],
    }),
    createScan: builder.mutation<
      Model.Scan | { errors: ErrorObject[] },
      {
        data: FormData;
        clientId: number;
      }
    >({
      queryFn: async ({ data, clientId }) => {
        try {
          const res = await ClientService.createScan({ data, clientId });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      invalidatesTags: ["Client"],
    }),
    deleteScan: builder.mutation<
      ResponseSuccess | { errors: ErrorObject[] },
      {
        scanId: number;
        clientId: number;
      }
    >({
      queryFn: async ({ scanId, clientId }) => {
        try {
          const res = await ClientService.deleteScan({
            scanId,
            clientId,
          });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      invalidatesTags: ["Client"],
    }),
    fetchScan: builder.query<Response.ResponseScan | { errors: ErrorObject[] }, { clientId: number; scanId: number }>({
      queryFn: async ({ clientId, scanId }) => {
        try {
          const res = await ClientService.fetchScan({ clientId, scanId });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      providesTags: ["Client"],
    }),
    fetchScans: builder.query<Response.ResponseScans | { errors: ErrorObject[] }, { clientId: number }>({
      queryFn: async ({ clientId }) => {
        try {
          const res = await ClientService.fetchScans({ clientId });
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      providesTags: ["Client"],
    }),
    fetchLegalForms: builder.query<Response.LegalFormsResponse | { errors: ErrorObject[] }, void>({
      queryFn: async () => {
        try {
          const res = await ClientService.fetchLegalForms();
          return { data: res };
        } catch (error: any) {
          return {
            error: error.response.data.errors,
          };
        }
      },
      providesTags: ["Client"],
    }),
  }),
});

export const {
  useFetchClientsQuery,
  useLazyFetchClientsQuery,
  useCreateClientMutation,
  useFetchClientQuery,
  useLazyFetchClientQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useUpdatePriorityMutation,
  useLazyFetchCardsQuery,
  useCreateMemberMutation,
  useFetchMembersQuery,
  useRelateCardMutation,
  useDeleteMemberMutation,
  useUpdateMemberMutation,
  useCreateScanMutation,
  useFetchScanQuery,
  useDeleteScanMutation,
  useFetchScansQuery,
  useFetchCardsQuery,
  useFetchLegalFormsQuery,
} = clientApi;
