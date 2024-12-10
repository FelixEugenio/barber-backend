import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { UserRepository } from "../repositories/user.repository";

dotenv.config();

const userRepository = new UserRepository();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Verifique se o usuário já existe no banco
    const existingUser = await userRepository.findByEmail(profile.emails[0].value);

    if (existingUser) {
      // Se o usuário já existir, faça login e retorne
      return done(null, existingUser);
    }

    // Caso contrário, crie um novo usuário no banco
    const newUser = await userRepository.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: "", // Não usamos senha aqui, porque a autenticação é via Google
      phoneNumber: "", // Você pode adicionar mais campos, se necessário
    });

    done(null, newUser);
  } catch (error) {
    done(error, null);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user.id); // Salva o ID do usuário na sessão
});

passport.deserializeUser(async (id: string, done) => {
  const user = await userRepository.findById(id);
  done(null, user); // Retorna o usuário ao Passport para a sessão
});
