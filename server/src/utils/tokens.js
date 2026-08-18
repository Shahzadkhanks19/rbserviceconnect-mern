import jwt from 'jsonwebtoken';

const COOKIE_NAME='rbsc_token';
const TWO_HOURS=2*60*60*1000;

export function signAccessToken(user){return jwt.sign({sub:user._id.toString(),role:user.role},process.env.JWT_SECRET,{expiresIn:'2h',algorithm:'HS256'});}
export function setAuthCookie(res,token){res.cookie(COOKIE_NAME,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',maxAge:TWO_HOURS,path:'/'});}
export function clearAuthCookie(res){res.clearCookie(COOKIE_NAME,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/'});}
