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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
const user_repository_1 = require("../repositories/user.repository");
dotenv_1.default.config();
const userRepository = new user_repository_1.UserRepository();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verifique se o usuário já existe no banco
        const existingUser = yield userRepository.findByEmail(profile.emails[0].value);
        if (existingUser) {
            // Se o usuário já existir, faça login e retorne
            return done(null, existingUser);
        }
        // Caso contrário, crie um novo usuário no banco
        const newUser = yield userRepository.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "", // Não usamos senha aqui, porque a autenticação é via Google
            phoneNumber: "", // Você pode adicionar mais campos, se necessário
        });
        done(null, newUser);
    }
    catch (error) {
        done(error, null);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id); // Salva o ID do usuário na sessão
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findById(id);
    done(null, user); // Retorna o usuário ao Passport para a sessão
}));
