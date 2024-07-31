import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

export const login = async (userData) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
};

export const updateUser = async (id, userData, token) => {
  return await axios.patch(`${API_URL}/auth/${id}`, userData,{
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createFolder = async(folderData, token)=>{
  return await axios.post(`${API_URL}/folders/create`, folderData, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const getFolders = async(userID,token)=>{
  
  return await axios.get(`${API_URL}/folders/${userID}`,{
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const deleteFolder = async(folderId, token)=>{
  return await axios.delete(`${API_URL}/folders/delete/${folderId}`,{
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const createForm = async (formData, token) => {
  return await axios.post(`${API_URL}/forms/create`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateForm = async (formId, formData, token) => {
  console.log("hi")
  return await axios.put(`${API_URL}/forms/update/${formId}`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getForms = async({userID,folderID}, token)=> {
  console.log(userID, folderID)
  return await axios.get(`${API_URL}/forms`, {
    params:{
        userID,
        folderID
    },
    headers: { Authorization: `Bearer ${token}` }
    
});
}

export const deleteForm = async(formId, token)=>{
  return await axios.delete(`${API_URL}/forms/delete/${formId}`,{
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const getPublicForm = async (formId) => {
  return await axios.get(`${API_URL}/forms/public/${formId}`);
};

export const submitForm = async (formId, data) => {
  return await axios.post(`${API_URL}/forms/submit/${formId}`, data);
};

export const getFormSubmissions = async (formId,token) => {
  return await axios.get(`${API_URL}/forms/submissions/${formId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};



