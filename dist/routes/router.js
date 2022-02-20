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
router.all('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    switch (req.query.action) {
        case 'login': {
            let { login, pass } = req.body;
            let user = yield userSchema_1.default.findOne({ login, pass });
            if (user) {
                req.session.user_id = user._id;
                req.session.save();
                res.status(200).send({ 'ok': true });
            }
            else {
                res.status(404).send({ 'error': 'not found' });
            }
            break;
        }
        case 'register': {
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
            break;
        }
        case 'getItems': {
            const user_id = req.session.user_id;
            if (!user_id) {
                res.status(403).send({ error: 'forbidden' });
            }
            else {
                const user = yield userSchema_1.default.findById(user_id);
                res.status(200).send({ items: user.items });
            }
            break;
        }
        case 'deleteItem': {
            try {
                const { id: task_id } = req.body;
                const user = yield userSchema_1.default.findById(req.session.user_id);
                yield user.deleteTaskById(task_id);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({});
            }
            res.status(200).send({ ok: true });
            break;
        }
        case 'createItem': {
            const { text } = req.body;
            const user = yield userSchema_1.default.findById(req.session.user_id);
            const task_id = yield user.addNewTask(text);
            res.status(201).send({ id: task_id });
            break;
        }
        case 'editItem': {
            try {
                const { text, id, checked } = req.body;
                const user = yield userSchema_1.default.findById(req.session.user_id);
                yield user.updateTask({ text, id, checked });
                res.status(200).send({ ok: true });
            }
            catch (error) {
                console.log(error);
                res.status(500).send({});
            }
            break;
        }
        default: {
            req.session.destroy((error) => {
                if (!error)
                    res.clearCookie('connect.sid');
                res.status(200).send({ "ok": true });
            });
            break;
        }
    }
}));
exports.default = router;
