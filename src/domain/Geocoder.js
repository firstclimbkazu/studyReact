import axios from 'axios';
import userEnv from 'userEnv';

const GEOCODE_ENDPOINT = userEnv.REACT_APP_MAP_DEV_API_URL +
userEnv.REACT_APP_MAP_DEV_API_KEY;

export const getcode = place =>
  axios
    .get(GEOCODE_ENDPOINT, { params: { address: place } })
    .then((results) => {
      console.log(results);
      const data = results.data;
      const status = data.status;
      const result = data.results[0];
      if (typeof result === 'undefined') {
        return { status };
      }

      const address = result.formatted_address;
      const location = result.geometry.location;
      return { status, address, location };
    });

export const reverseGeocode = () => null;
