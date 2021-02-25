import {request, Response} from "express";

class UserController {
    async create(request: Request, response: Response) {
        const body = request.body;
    }
}

export { UserController }