const sendResponse = (resp, code, boolSuccess, message, data) => {

    // Show errors only on Dev and not Prod
    let showErrors = process.env.SHOW_ERRORS || false;
    let dataSend = "";

    if (showErrors === "false" && !boolSuccess) {
        dataSend = "";
    } else {
        dataSend = data;
    }

    resp.status(code).json({
        "success": boolSuccess,
        "message": message,
        "data": dataSend
    });
}


module.exports = {
    sendResponse
}