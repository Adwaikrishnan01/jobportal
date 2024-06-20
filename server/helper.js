import bcrypt from 'bcrypt'

const rounds=10;
export const hashpassword=async(password)=>{
try{
    const hashedpassword= await bcrypt.hash(password,rounds)
    return hashedpassword
}
catch(error){
    console.log(error)
}
};
