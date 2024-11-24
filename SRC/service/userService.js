import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/userRepository.js';
import ClientErrors from '../utils/errors/clientErrors.js';
import bcrypt from 'bcrypt'
import genToken from '../utils/JWTtoken/genToken.js'


export const userSignUpService = async function (data) {
  try {
    // Validate incoming data (optional but recommended)
    if (!data || !data.email || !data.password) {
      throw new Error('Invalid data: Email and Password are required.');
    }
    if (!data) {
      return res.json({
        message: 'data not found in service'
      });
    }

    // Attempt to create a new user
    const newUser = await userRepository.create(data);

    if (!newUser) {
      throw new Error('Failed to create the user.');
    }

    console.log('New user created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error in userSignUpService:', error.message);

    // Optionally rethrow the error if it needs to be handled elsewhere
    throw error;
  }
};



export const userSignInService= async (data)=>{
  try {
    if(!data.email){
      throw new Error("email is invalid try again");
      
    }
    const userExist= await userRepository.getUserByEmail(data.email)

    if(!userExist){
      throw new ClientErrors({
        message:"invalid data sent by the client",
        Explanation:"No registered user found with thid email",
        StatusCode:StatusCodes.NOT_FOUND
      })
      

    }

    //if user is present than check the correct password

    const isMatch=bcrypt.compareSync(data.password,userExist.password)

    if(!isMatch){
      throw new ClientErrors({
        message:"Invalid password please try again",
        Explanation:"Invalid data senr=t by the user",
        StatusCode:StatusCodes.BAD_REQUEST
      })
      
    }

    return{
      username:userExist.username,
      avatar:userExist.avatar,
      email:userExist.email,
      Token:genToken({
        id:userExist.id,
        email:userExist.email
      })
    }
    
  } catch (error) {
    
    console.log("error in service layer in signin",error);
    throw error;
    
    
  }

}
