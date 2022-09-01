import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_DETAIL = "GET_DETAIL";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const FILTER_ACTIVITIES = "FILTER_ACTIVITIES";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const EDIT_ACTIVITY = "EDIT_ACTIVITY";

export function getCountries() {
  return async function (dispatch) {
    const countries = await axios.get("/country");
    return dispatch({
      type: GET_COUNTRIES,
      payload: countries.data,
    });
  };
}

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
}

export function getCountryByName(name) {
  return async function (dispatch) {
    const countryByName = await axios.get(`/country?name=${name}`);
    return dispatch({
      type: GET_BY_NAME,
      payload: countryByName.data,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    const countryFound = await axios.get(`/country/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: countryFound.data,
    });
  };
}

export function getActivities() {
  return async function (dispatch) {
    const activities = await axios.get("/activity");
    return dispatch({
      type: GET_ACTIVITIES,
      payload: activities.data,
    });
  };
}

export function createActivity(payload) {
  return async function (dispatch) {
    const newActivity = await axios.post("/activity", payload);
    return dispatch({
      type: CREATE_ACTIVITY,
      payload: newActivity.data,
    });
  };
}

export function filterActivities(payload) {
  return {
    type: FILTER_ACTIVITIES,
    payload: payload,
  };
}

export function deleteActivity(id) {
  return async function (dispatch) {
    const activityDelete = await axios.delete(`/activity/${id}`);
    return dispatch({
      type: DELETE_ACTIVITY,
      payload: id,
    });
  };
}

export function updateActivity(id, body) {
  return async function (dispatch) {
    const activity = await axios.put(`/activity/${id}`, body);
    return dispatch({
      type: EDIT_ACTIVITY,
      payload: activity.data,
    });
  };
}
