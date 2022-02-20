"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userSchema_1 = __importDefault(require("../model/userSchema"));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, pass } = req.body;
    let user = yield userSchema_1.default.findOne({ login, pass });
    if (!user) {
        user = new userSchema_1.default({ login, pass, items: [] });
        yield user.save();
        res.status(201).send({ 'ok': true });
    }
    else {
        res.status(400).send({});
    }
}));
exports.default = router;
