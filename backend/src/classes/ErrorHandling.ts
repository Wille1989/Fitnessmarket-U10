export class AppError extends Error {
    status?: number;
}

export class ValidationError extends Error {
    status: number;
    constructor(message: string, status = 400) {
        super(message);
        this.status = status;
    }
}

export class NotFoundError extends Error {
    status: number;
    constructor(message: string, status = 404) {
        super(message);
        this.status = status;
    }
}

export class ConflictError extends Error {
    status: number;
    constructor(message: string, status = 409) {
        super(message);
        this.status = status;
    }
}

export class AuthorizationError extends Error {
    status: number;
    constructor(message: string, status = 401) {
        super(message);
        this.status = status;
    }
}