import API from "./axios";

interface FetchVerbatimsParams {
  pagination?: number;
  page?: number;
  year?: number;
  status?: string;
  created_at?: string;
}

async function fetchVerbatims(params: FetchVerbatimsParams = {}) {
  const { pagination = 10, page = 1, year, status, created_at } = params;
  const response = await API.get('/get', {
    params: {
      pagination,
      page,
      year,
      status,
      created_at,
    },
  });
  return response.data;
}


async function deleteVerbatims(ids: string[]) {
    const response = await API.delete("/delete", { data: { ids } });
    return response.data;
  }

export { 
    fetchVerbatims, 
    deleteVerbatims
};