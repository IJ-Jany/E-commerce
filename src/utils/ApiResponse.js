 class ApiResponse {
    constructor(statusCode=200,message = "success", data = null){
      this.statusCode = statusCode
      this.message = message
      this.data = data
    }
    apiLoginRes(data){
        return new ApiResponse(201, "login successfull", data);
    }
    apiLogoutRes(data){
        return new ApiResponse(201, "logout successfull", data);
    }
 }
 export default ApiResponse ;