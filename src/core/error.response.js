"use strict";

const {statusCodes, reasonPhrases} = require("./httpStatusCode");

class ErrorResponse extends Error {
    constructor(message = reasonPhrases.CONFLICT, status = statusCodes.FORBIDDEN) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = reasonPhrases.CONFLICT, statusCode = statusCodes.FORBIDDEN) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = reasonPhrases.CONFLICT, statusCode = statusCodes.FORBIDDEN) {
        super(message, statusCode);
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(message = reasonPhrases.UNAUTHORIZED, statusCode = statusCodes.UNAUTHORIZED) {
        super(message, statusCode);
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = reasonPhrases.NOT_FOUND, statusCode = statusCodes.NOT_FOUND) {
        super(message, statusCode);
    }
}

module.exports = {
    ConflictRequestError, BadRequestError, AuthFailureError, NotFoundError
};
