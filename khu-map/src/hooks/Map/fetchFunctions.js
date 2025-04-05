import Axios from 'axios';
import { BUILDINGAPI, COMMUNITYAPI, COMMUNITYLISTAPI, WAYPOINTAPI } from '../../constants/constants';


export function fetchBuildingInfo(buildingID) {
    return Axios.get(`${BUILDINGAPI}?id=${buildingID}`)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}

export async function fetchBuildingList() {
    console.log("fetchBuildingList called")
    const data = await Axios.get(`${BUILDINGAPI}`)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });

    return data
}

export function fetchRoadList() {
}

export function fetchTips() {
}

export function fetchCommunityPosts() {
    return Axios.get(`${COMMUNITYAPI}`)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}

export default function fetchEventPosts() {
    return Axios.get(`${COMMUNITYLISTAPI}`)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}