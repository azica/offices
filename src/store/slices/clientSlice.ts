import type { RootState } from "..";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import { formatPhoneNumber, getDateString, getDefaultStatus } from "@/helpers/index";

const initialState: ClientsSlice = {
  clients: [] as Model.Client[],
  client: {} as Response.ClientResponse,
  members: [] as Model.Member[],
  cards: [] as Model.LinkedPerson[],
  clientCount: 0,
};

const ClientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, { payload }: PayloadAction<Model.Client[]>) => {
      state.clients = payload.map((el) => ({
        ...el,
        status: getDefaultStatus(el.status as Status),
        createdAt: getDateString(el.createdAt as unknown as Date),
      }));
    },
    setClient: (state, { payload }: PayloadAction<Response.ClientResponse>) => {
      state.client = {
        ...payload,
        status: getDefaultStatus(payload.status as Status),
        createdAt: payload.createdAt && getDateString(new Date(payload.createdAt)),
        dateOfBirth: payload.dateOfBirth,
        phoneNumber: payload.phoneNumber ? formatPhoneNumber(payload.phoneNumber) : "",
      };
    },
    setMembers: (state, { payload }: PayloadAction<Model.Member[]>) => {
      state.members = payload;
    },
    setCards: (state, { payload }: PayloadAction<Model.LinkedPerson[]>) => {
      state.cards = payload.map((el) => ({
        ...el,
        status: getDefaultStatus(el.status as Status),
        createdAt: getDateString(el.createdAt as unknown as Date),
      }));
    },
    setCount: (state, { payload }: PayloadAction<number>) => {
      state.clientCount = payload;
    },
  },
});
export const office = (state: RootState) => state.user;
export const { setClients, setClient, setMembers, setCards, setCount } = ClientsSlice.actions;
export default ClientsSlice.reducer;
