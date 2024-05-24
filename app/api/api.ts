import config from '../config';
import {PeopleResponse, PlanetsResponse, SpeciesResponse} from './responses';

const api = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    let errorText: string | undefined;
    try {
      errorText = await response.text();
    } catch (error) {
      console.warn(error);
    }

    return Promise.reject({
      url,
      body: errorText,
    });
  }
  return response;
};

export const fetchPeople = async (params: {page: string}) => {
  const response = await api(config.url + '/people?page=' + params.page);
  const json = (await response.json()) as PeopleResponse;
  return json;
};

export const fetchSpecies = async (params: {page: string}) => {
  const response = await api(config.url + '/species/' + params.page);
  const json = (await response.json()) as SpeciesResponse;
  return {index: params.page, name: json.name};
};

export const fetchPlanets = async (params: {page: string}) => {
  const response = await api(config.url + '/planets/' + params.page);
  const json = (await response.json()) as PlanetsResponse;
  return {index: params.page, name: json.name};
};
