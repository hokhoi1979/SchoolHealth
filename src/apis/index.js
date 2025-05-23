import axiosConfig from "@/config/axiosConfig.js";

// *** CLAIMER
// List Requests
export const claimerRequestsApi = () => axiosConfig.get("/claim-request");
// List Projects
export const claimerProjectsApi = () => axiosConfig.get("/projects");
// Create Request
export const createRequestApi = (requestData) =>
  axiosConfig.post("/claim-request", requestData);
// Save Request
export const saveRequestApi = (requestData) =>
  axiosConfig.post(`/claim-request/save`, requestData);
// Submit Request
export const submitRequestApi = (requestId) =>
  axiosConfig.put(`/claim-request/submit/${requestId}`);
// Cancel Request
export const cancelRequestApi = (requestId) =>
  axiosConfig.put(`/claim-request/cancel/${requestId}`);

// *** ADMIN
// List Projects
export const adminGetProjectApi = () => axiosConfig.get("/projects/list");
// List Users
export const adminGetUserApi = () => axiosConfig.get("/users");
// List Requests
export const adminGetRequestApi = () => axiosConfig.get("/claim-request");
// Create Project
export const adminAddProjectApi = (newProject) =>
  axiosConfig.post("/projects", newProject);

export const rejectRequestApi = (requestId) =>
  axiosConfig.put(`/claim-request/reject/${requestId}`);

export const getUserRequestApi = () => axiosConfig.get(`/users`);

export const addProjectRequestApi = (projectData) =>
  axiosConfig.post(`/project`, projectData);

export const addUserProjectRequestApi = (projectId, userId) =>
  axiosConfig.post(`/project/addUser`, projectId, userId);

// APPROVER
export const approverRequestsApi = () => axiosConfig.get("/claim-request");

export const postApproverApi = (id, actionType) =>
  axiosConfig.put(`/claim-request/${actionType}/${id}`);
export const financeRequestApis = () => axiosConfig.get("/claim-request");

export const payFinanceApis = (requestId) =>
  axiosConfig.put(`/claim-request/pay/${requestId}`);

export const commentsRequestApis = (requestId) =>
  axiosConfig.get(`/comments/${requestId}`);

export const postCommentApi = (data) => axiosConfig.post(`/comments`, data);

export const postLoginApi = (data) => axiosConfig.post(`/auth/login`, data);

// SEARCH
export const fetchSearchApi = (data) =>
  axiosConfig.get(`/claim-request/search?v=${data}`);

export const sendMail = (data) => axiosConfig.post(`/notifications`, data);

export const fetchNotificationApi = () => axiosConfig.get(`/notifications`);

export const postNotificationApi = () =>
  axiosConfig.post(`/notifications/mark-all-as-read`);
