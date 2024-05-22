import config from '../config';
import {PeopleResponse} from './responses';

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
  console.log('fetching');
  const response = await api(config.url + '/people?page=' + params.page);
  console.log(response, 'fetching');

  const json = (await response.json()) as PeopleResponse;
  return json;
};

export const fetchSpecies = async () => {
  const response = await api(config.url + '/species');

  const json = await response.json();
  console.log(json);
};

export const fetchPlanets = async () => {
  const response = await api(config.url + '/planets');

  const json = await response.json();
};
