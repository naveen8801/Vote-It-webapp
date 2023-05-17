import axios from "axios";

// export const url = 'https://voteme-webapp.herokuapp.com';

export const url = "http://localhost:8000";

export const NewPoll = (newPoll) => axios.post(`${url}/poll`, newPoll);
export const GetPoll = (id) => axios.get(`${url}/getpoll/${id}`);
export const CastVote = (pollid, optionid, updatedPoll) =>
  axios.patch(`${url}/${pollid}/${optionid}`, updatedPoll);
export const GetAllPolls = () => axios.get(`${url}/getpolls`);
