const API_URL = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// Types

export interface SiteSettings {
  [key: string]: string;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
  unit: string;
  badge: string;
  display_order: number;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image_url: string;
  display_order: number;
}

export interface Case {
  id: number;
  case_number: string;
  status: string;
  amount: string;
  description: string;
  card_size: string;
  accent: boolean;
  display_order: number;
}

export interface Submission {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest: string;
  comment: string;
  debt: string;
  status: string;
  created_at: string;
}

export interface MediaFile {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

export interface NavItem {
  id: number;
  title: string;
  href: string;
  dropdown: { title: string; href: string }[];
}

// API methods

export const api = {
  settings: {
    getAll: () => request<SiteSettings>('/settings'),
    update: (key: string, value: string) =>
      request('/settings/' + encodeURIComponent(key), {
        method: 'PUT',
        body: JSON.stringify({ setting_value: value }),
      }),
    bulkUpdate: (settings: Record<string, string>) =>
      request('/settings', { method: 'PUT', body: JSON.stringify(settings) }),
  },

  stats: {
    list: () => request<Stat[]>('/stats'),
    create: (data: Partial<Stat>) =>
      request<Stat>('/stats', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Partial<Stat>) =>
      request<Stat>(`/stats/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) =>
      request<{ success: boolean }>(`/stats/${id}`, { method: 'DELETE' }),
  },

  services: {
    list: () => request<Service[]>('/services'),
    create: (data: Partial<Service>) =>
      request<Service>('/services', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Partial<Service>) =>
      request<Service>(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) =>
      request<{ success: boolean }>(`/services/${id}`, { method: 'DELETE' }),
  },

  cases: {
    list: () => request<Case[]>('/cases'),
    create: (data: Partial<Case>) =>
      request<Case>('/cases', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Partial<Case>) =>
      request<Case>(`/cases/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) =>
      request<{ success: boolean }>(`/cases/${id}`, { method: 'DELETE' }),
  },

  submissions: {
    list: () => request<Submission[]>('/submissions'),
    create: (data: { name: string; phone: string; email?: string; interest?: string; comment?: string; debt?: string }) =>
      request<Submission>('/submissions', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: number, status: string) =>
      request<Submission>(`/submissions/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
    delete: (id: number) =>
      request<{ success: boolean }>(`/submissions/${id}`, { method: 'DELETE' }),
  },

  media: {
    list: () => request<MediaFile[]>('/media'),
    upload: async (file: File): Promise<MediaFile> => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API_URL}/media/upload`, { method: 'POST', body: formData });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      return res.json();
    },
    delete: (id: string) =>
      request<{ success: boolean }>(`/media/${id}`, { method: 'DELETE' }),
  },

  health: () => request<{ status: string; timestamp: string }>('/health'),
};
