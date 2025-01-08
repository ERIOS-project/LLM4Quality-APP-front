import API from "./axios";

async function fetchVerbatims() {
  const response = await API.get("/get");
  console.log(response.data);
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