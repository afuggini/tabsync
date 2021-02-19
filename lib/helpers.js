"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomId = exports.randomNumber = void 0;
const randomNumber = (from, to) => Math.floor(Math.random() * (to - from + 1) + from);
exports.randomNumber = randomNumber;
const randomId = () => exports.randomNumber(100000, 999999).toString();
exports.randomId = randomId;
//# sourceMappingURL=helpers.js.map