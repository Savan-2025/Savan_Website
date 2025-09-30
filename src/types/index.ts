// types/index.ts
export interface ProjectImage {
  url: string;
  
  caption: string;
  _id: string;
}

export interface Project {
  _id: string;
  projectName: string;
  imageUrl?: string;
  budget: number;
  city: string;
  category: string;
  subType: string;
  images: ProjectImage[];
  isActive: boolean;
}


// lib/api.ts
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  budget: number;
  location: string;
}

export interface ContactResponse {
  message: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    message: string;
    budget: number;
    location: string;
    _id: string;
    createdAt: string;
    __v: number;
  };
}

export interface Property {
  _id: string;
  
  propertyName: string;
  budget: number;
  location: string;
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Agricultural';
  propertyArea: string; // Includes unit, e.g., "1500 sqft"
  measurementUnit?: string; // Optional, as it's not always used
  projectId?: {
    _id: string;
    projectName: string;
  };
  imageUrl?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertiesResponse {
  total: number;
  page: number;
  limit: number;
  count: number;
  properties: Property[];
}