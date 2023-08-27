import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { Document } from 'mongoose'
import { user_model } from '../models/user_model.js'
import { IUser } from '../types/User.js'

const jwtOptions: StrategyOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const jwtVerify = async (payload: { sub: string }, done: (error: any, user?: IUser | boolean) => void) => {
  try {
    const user = await user_model.findById(payload.sub)

    if (!user) {
      return done(null, false)
    }
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

export { jwtStrategy }
