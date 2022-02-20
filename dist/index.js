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
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./routes/login"));
const register_1 = __importDefault(require("./routes/register"));
const logout_1 = __importDefault(require("./routes/logout"));
const items_1 = __importDefault(require("./routes/items"));
const router_1 = __importDefault(require("./routes/router"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const MongoStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 8080;
const MONGODB_URI = 'mongodb+srv://andrew:zheb2501@cluster0.fi69x.mongodb.net/problemBook';
const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
});
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use('/api/v1/items', items_1.default);
app.use('/api/v1/login', login_1.default);
app.use('/api/v1/logout', logout_1.default);
app.use('/api/v1/register', register_1.default);
app.use('/api/v2/router', router_1.default);
function startServing() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(MONGODB_URI, {
            useNewUrlParser: true
        });
        app.listen(PORT, () => {
            console.log(`server on port ${PORT}`);
        });
    });
}
;
startServing();
