import axios from "axios";

const PROJECT_API_BASE_URL = "http://localhost:8081/api/v1/PendingProjects";
const PROJECT_API_BASE_URL_T_PROJECTS = "http://localhost:8081/api/v1/Projects";
const PROJECT_API_BASE_URL_ADMIN = "http://localhost:8081/api/v1/createAdmin";
const PROJECT_API_BASE_URL_APPROVE = "http://localhost:8081/api/v1/approveProject";
const PROJECT_API_BASE_URL_APPROVED = "http://localhost:8081/api/v1/ApprovedProjects";
const PROJECT_API_BASE_URL_REJECTED = "http://localhost:8081/api/v1/RejectedProjects";
const PROJECT_API_BASE_URL_USERS = "http://localhost:8081/api/v1/Users";
const PROJECT_API_BASE_URL_FLAGGED_PROJECTS= "http://localhost:8081/api/v1/MostFlagged";
const PROJECT_API_BASE_URL_SHOW_ADMINS="http://localhost:8081/api/v1/showAdmins";

class projectService {
    getProjects() {
        return axios.get(PROJECT_API_BASE_URL);
    }

    getApprovedProjects() {
        return axios.get(PROJECT_API_BASE_URL_APPROVED);
    }

    getRejectedProjects() {
        return axios.get(PROJECT_API_BASE_URL_REJECTED);
    }

    getAllProjects() {
        return axios.get(PROJECT_API_BASE_URL_T_PROJECTS);
    }

    createAdmin(admin) {
        return axios.post(PROJECT_API_BASE_URL_ADMIN, admin);
    }

    approveProject(projectId) {
        return axios.post(`${PROJECT_API_BASE_URL_APPROVE}/${projectId}`);
    }

    rejectProject(projectId) {
        return axios.post(`http://localhost:8081/api/v1/rejectProject/${projectId}`);
    }

    getApprovedProjectsAll() {
        return axios.get(PROJECT_API_BASE_URL_T_PROJECTS);
    }

    getUsers() {
        return axios.get(PROJECT_API_BASE_URL_USERS);
    }
    getFlaggedProjects()
    {
        return axios.get(PROJECT_API_BASE_URL_FLAGGED_PROJECTS);
    }

    getAdmins()
    {
        return axios.get(PROJECT_API_BASE_URL_SHOW_ADMINS);
    }

    async updateBlockedStatus(userId, blocked) {
        const url = `http://localhost:8081/api/v1/Users/${userId}/block`;
        const data = { blocked };

        try {
            const response = await axios.put(url, data);
            console.log("Update Blocked Status Response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Update Blocked Status Error:", error);
            throw error;
        }
    }

}

const projectServiceInstance = new projectService();

export default projectServiceInstance;
