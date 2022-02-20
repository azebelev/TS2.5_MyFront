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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    login: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    items: [{
            text: {
                type: String,
                required: true
            },
            checked: {
                type: Boolean,
                default: false
            }
        }]
});
userSchema.methods.addNewTask = function (text) {
    return __awaiter(this, void 0, void 0, function* () {
        this.items.push({ text });
        yield this.save();
        return this.items[this.items.length - 1]._id;
    });
};
userSchema.methods.deleteTaskById = function (task_idForDelete) {
    return __awaiter(this, void 0, void 0, function* () {
        this.items = this.items.filter((task) => { var _a; return ((_a = task._id) === null || _a === void 0 ? void 0 : _a.toString()) !== task_idForDelete; });
        yield this.save();
    });
};
userSchema.methods.updateTask = function (task) {
    return __awaiter(this, void 0, void 0, function* () {
        this.items = this.items.map((item) => {
            var _a;
            if (((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === task.id) {
                item = { text: task.text, checked: task.checked, _id: item._id };
            }
            return item;
        });
        yield this.save();
    });
};
exports.default = (0, mongoose_1.model)('User', userSchema);
