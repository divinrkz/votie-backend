class APIResponse {

    /**
     * Success API Response
     * @param {*} data 
     * @param {*} message 
     * @returns 
     */
    static success (data=null, message="") {
        return {success: true, data, message, timestamp:new Date().getTime()};
    }
    
    /**
     * Fail API Response
     * @param {*} err 
     * @param {*} message 
     * @returns 
     */
    static fail(err=null, message="INTERNAL SERVER ERROR"){
        return {success: false, error: err, message, timestamp:new Date().getTime()};
    }
}

exports.APIResponse = APIResponse