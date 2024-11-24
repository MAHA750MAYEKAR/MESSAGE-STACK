import jwt from 'jsonwebtoken'
import { JWT_EXPIRY,JWT_SECRET } from '../../config/serverConfig'

export const JWTtoken=(payload)=>{
return jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_EXPIRY})
}