import { Endpoints } from "@/api/endpoints";

import $api from "../api";

const config = {
  headers: {
    "Content-Type": "multipart/form-data", // Change content type here
  },
};

export const ClientService = {
  async fetchClients({
    officeId,
    query,
  }: {
    officeId: number;
    query: string;
  }): Promise<Response.ClientsResponse | { errors: ErrorObject[] }> {
    const res = await $api.get(`${Endpoints.NOTARIES}${officeId}/client/${query}`);
    return res.data;
  },
  async fetchClient({
    officeId,
    clientId,
  }: {
    officeId: number;
    clientId: number;
  }): Promise<Response.ClientResponse | { errors: ErrorObject[] }> {
    const res = await $api.get(`${Endpoints.NOTARIES}${officeId}/client/${clientId}/`);
    return res.data;
  },
  async createClient({
    clientData,
    officeId,
  }: {
    clientData: FormData;
    officeId: number;
  }): Promise<Model.Client | { errors: ErrorObject[] }> {
    const res = await $api.post(`${Endpoints.NOTARIES}${officeId}/client/`, clientData, config);
    return res.data;
  },
  async updateClient({
    officeId,
    clientId,
    data,
  }: {
    officeId: number;
    clientId: number;
    data: FormData;
  }): Promise<Model.Client | { errors: ErrorObject[] }> {
    const res = await $api.put<Model.Client | { errors: ErrorObject[] }>(
      `${Endpoints.NOTARIES}${officeId}/client/${clientId}/`,
      data,
    );
    return res.data;
  },
  async deleteClient({
    officeId,
    clientId,
  }: {
    officeId: number;
    clientId: number;
  }): Promise<ResponseSuccess | { error: Response.Ordinary }> {
    const res = await $api.delete<ResponseSuccess | { error: Response.Ordinary }>(
      `${Endpoints.NOTARIES}${officeId}/client/${clientId}`,
    );
    return res.data;
  },
  async updatePriority({
    officeId,
    clientId,
    priority,
  }: {
    officeId: number;
    clientId: number;
    priority: number;
  }): Promise<Model.Client | { errors: ErrorObject[] }> {
    const res = await $api.put<Model.Client | { errors: ErrorObject[] }>(
      `${Endpoints.NOTARIES}${officeId}/client/${clientId}/`,
      { priority },
    );
    return res.data;
  },
  async fetchCards({
    clientId,
    query,
  }: {
    clientId: number;
    query: string;
  }): Promise<Response.CardsResponse | { errors: ErrorObject[] }> {
    const res = await $api.get(`${Endpoints.CLIENTS}${clientId}/cards/${query}`);
    return res.data;
  },
  async relateCard({
    clientId,
    query,
  }: {
    clientId: number;
    query: string;
  }): Promise<ResponseSuccess | { error: Response.Ordinary }> {
    const res = await $api.patch(`${Endpoints.CLIENTS}${clientId}/cards/${query}`);
    return res.data;
  },
  async createMember({
    clientId,
    data,
  }: {
    clientId: number;
    data: {
      linkedPerson: number;
    } & Omit<Model.Member, "linkedPerson">;
  }): Promise<Model.Member | { errors: ErrorObject[] }> {
    const res = await $api.post<Model.Member | { errors: ErrorObject[] }>(
      `${Endpoints.CLIENTS}${clientId}/representative/`,
      data,
    );
    return res.data;
  },
  async fetchMembers({
    clientId,
    query,
  }: {
    clientId: number;
    query: string;
  }): Promise<Response.MemberResponse | { errors: ErrorObject[] }> {
    const res = await $api.get(`${Endpoints.CLIENTS}${clientId}/representative/${query}`);
    return res.data;
  },
  async updateMember({
    clientId,
    memberId,
    data,
  }: {
    clientId: number;
    memberId: number;
    data: {
      linkedPerson: number;
    } & Omit<Model.Member, "linkedPerson">;
  }): Promise<Model.Member | { errors: ErrorObject[] }> {
    const res = await $api.put<Model.Member | { errors: ErrorObject[] }>(
      `${Endpoints.CLIENTS}${clientId}/representative/${memberId}/update/`,
      data,
    );
    return res.data;
  },
  async deleteMember({
    clientId,
    memberId,
  }: {
    memberId: number;
    clientId: number;
  }): Promise<ResponseSuccess | { errors: ErrorObject[] }> {
    const res = await $api.delete<ResponseSuccess | { errors: ErrorObject[] }>(
      `${Endpoints.CLIENTS}${clientId}/representative/${memberId}/update`,
    );
    return res.data;
  },
  async createScan({
    clientId,
    data,
  }: {
    clientId: number;
    data: FormData;
  }): Promise<Model.Scan | { errors: ErrorObject[] }> {
    const res = await $api.post<Model.Scan | { errors: ErrorObject[] }>(
      `${Endpoints.CLIENTS}${clientId}/scanners/`,
      data,
      config,
    );
    return res.data;
  },
  async deleteScan({
    clientId,
    scanId,
  }: {
    clientId: number;
    scanId: number;
  }): Promise<ResponseSuccess | { errors: ErrorObject[] }> {
    const res = await $api.delete<ResponseSuccess | { errors: ErrorObject[] }>(
      `${Endpoints.CLIENTS}${clientId}/scanners/${scanId}/`,
    );
    return res.data;
  },
  async fetchScan({
    clientId,
    scanId,
  }: {
    clientId: number;
    scanId: number;
  }): Promise<Response.ResponseScan | { errors: ErrorObject[] }> {
    const res = await $api.get<Response.ResponseScan | { errors: ErrorObject[] }>(
      `${Endpoints.CLIENTS}${clientId}/scanners/${scanId}/`,
    );
    return res.data;
  },
  async fetchScans({ clientId }: { clientId: number }): Promise<Response.ResponseScans | { errors: ErrorObject[] }> {
    const res = await $api.get<Response.ResponseScans | { errors: ErrorObject[] }>(
      `${Endpoints.CLIENTS}${clientId}/scanners/`,
    );
    return res.data;
  },
  async fetchLegalForms(): Promise<Response.LegalFormsResponse | { errors: ErrorObject[] }> {
    const res = await $api.get<Response.LegalFormsResponse | { errors: ErrorObject[] }>(`${Endpoints.CLIENTS}statics`);
    return res.data;
  },
};
