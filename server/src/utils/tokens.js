import jwt from 'jsonwebtoken';
export function signAccessToken(user){return jwt.sign({sub:user._id.toString(),role:user.role},process.env.JWT_SECRET,{expiresIn:'2h'});}
export function setAuthCookie(res,token){res.cookie('rbsc_token',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',maxAge:2*60*60*1000,path:'/'});}
