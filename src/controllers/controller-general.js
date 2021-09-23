
const { response, request } = require('express');
const { sendResponse } = require('../helpers/general');
const { GENERAL } = require('../_constants/constants');

/* API 404 Handle */
const apiError404 = async (req = request, resp = response) => {
    return sendResponse(resp, 404, false, GENERAL.URL_API_404, "");
};


module.exports = {
    apiError404
}