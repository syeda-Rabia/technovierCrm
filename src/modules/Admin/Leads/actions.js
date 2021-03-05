import types from "./types";

export const CreateLead = (data) => ({
  type: types.ADD_LEAD,
  payload: data,
});
