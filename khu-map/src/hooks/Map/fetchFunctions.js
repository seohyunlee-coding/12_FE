import Axios from 'axios';
import { BUILDINGAPI, POSTSAPI, AUTOCOMPLETEAPI, NAVIGATEAPI, TIPSAPI, COMMENTSAPI } from '../../constants/endpoints';


async function fetchBuildingInfo(buildingID) {
    try {
        const response = await Axios.get(`${BUILDINGAPI}?id=${buildingID}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function fetchBuildingList() {
    console.log("fetchBuildingList called")
    try {
        const response = await Axios.get(`${BUILDINGAPI}`)
        console.log("Response from fetchBuildingList:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function fetchTips(buildingID = 0) {
    try {
        const response = await Axios.get(`${TIPSAPI}?building_id=${buildingID}`);
        console.log("Response from fetchTips:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }

}

async function fetchCommunityPosts(building_id) {
    try {
        if (!building_id) {
            const response = await Axios.get(`${POSTSAPI}`);
            console.log("Response from fetchCommunityPosts:", response.data);
            return response.data;
        } else {
            const response = await Axios.get(`${POSTSAPI}?building_id=${building_id}`);
            console.log("Response from fetchCommunityPosts:", response.data);
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}
async function fetchComments(post_id) {
    try {
        if (!post_id) {
            const response = await Axios.get(`${COMMENTSAPI}`);
            console.log("Response from fetchComments:", response.data);
            return response.data;
        } else {
            const response = await Axios.get(`${COMMENTSAPI}?post_id=${post_id}`);
            console.log("Response from fetchComments:", response.data);
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

async function getAutocomplete(query) {
    try {
        const response = await Axios.get(`${AUTOCOMPLETEAPI}?q=${encodeURIComponent(query)}`);
        console.log("Response from getAutocomplete:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
async function getNavigate(start_ID, end_ID) {
    try {
        const response = await Axios.get(`${NAVIGATEAPI}?start=${start_ID}&end=${end_ID}`);
        console.log("Response from getNavigate:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export {
    fetchBuildingInfo,
    fetchBuildingList,
    fetchCommunityPosts,
    fetchComments,
    fetchTips,
    getAutocomplete,
    getNavigate
};