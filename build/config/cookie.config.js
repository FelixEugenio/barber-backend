"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieConfig = void 0;
exports.cookieConfig = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
};
