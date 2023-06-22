// const mainUrl = "http://localhost:5000"
const mainUrl = "https://skids-health-backend-api.vercel.app"
const getData = `${mainUrl}/api/userdata/get/data`
const addData = `${mainUrl}/api/userdata/create`
const updateData = `${mainUrl}/api/userdata/update`
const deleteData = `${mainUrl}/api/userdata/delete`

export { getData, addData, updateData, deleteData };

