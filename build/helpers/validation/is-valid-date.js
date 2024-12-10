"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = isValidDate;
function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}
