import { ContactFormData, ContactResponse, Project, PropertiesResponse, Property } from "@/types";

export  const API_BASE_URL =  "https://api.saajra.com/api/v1";
// export  const API_BASE_URL =  "https://realestate.volvrit.org/api/v1";
//export  const API_BASE_URL =  "http://localhost:5002/api/v1";
export const LOCAL_BASE_URL = "https://api.saajra.com";

//export const IMAGE_BASE_URL = "https://realestate.volvrit.org/uploads/";
//https://api.saajra.com/

export const fetchProjects = async (page: number = 1, limit: number = 3): Promise<Project[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const data = await response.json();
    return data.projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const submitContactForm = async (formData: ContactFormData): Promise<ContactResponse> => {
  try {
    const response = await fetch(`${LOCAL_BASE_URL}/api/v1/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit contact form");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};


//properties
export const fetchAllProperties = async (
  page: number = 1,
  limit: number = 10,
  category?: string,
  projectId?: string
): Promise<PropertiesResponse> => {
  try {
    const queryParams = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (category) queryParams.append('category', category);
    if (projectId) queryParams.append('projectId', projectId);

    const response = await fetch(`${API_BASE_URL}/properties/all?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    const data: PropertiesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return { total: 0, page: 1, limit: 10, count: 0, properties: [] };
  }
};