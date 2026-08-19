import User from '../models/User.js';
import { validPassword,validationError } from '../utils/validation.js';
import { clearAuthCookie } from '../utils/tokens.js';

export async function changeAuthenticatedPassword(req,res){
  const currentPassword=String(req.body.currentPassword||'');
  const newPassword=String(req.body.newPassword||'');
  const errors={};
  if(!currentPassword)errors.currentPassword='Current password is required.';
  else if(currentPassword.length>128)errors.currentPassword='Current password is too long.';
  if(!validPassword(newPassword))errors.newPassword='New password must be 8–128 characters and include at least one letter and one number.';
  if(Object.keys(errors).length)return validationError(res,errors);

  const user=await User.findById(req.user._id).select('+password +passwordResetTokenHash +passwordResetExpiresAt');
  if(!user||user.status!=='active')return res.status(403).json({message:'This account is not available.'});
  if(!(await user.comparePassword(currentPassword)))return validationError(res,{currentPassword:'Current password is incorrect.'});
  if(await user.comparePassword(newPassword))return validationError(res,{newPassword:'Choose a password different from your current password.'});

  user.password=newPassword;
  user.passwordResetTokenHash=null;
  user.passwordResetExpiresAt=null;
  await user.save();
  clearAuthCookie(res);
  return res.json({message:'Password changed successfully. Sign in again with your new password.',requiresReauthentication:true});
}
