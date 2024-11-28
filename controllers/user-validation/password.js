const {USERS} =require('../../model/users')
const crypto=require('crypto')

async function checkHIBP(password) {
    
    // Step 1: Hash the password using SHA-1
    async function sha1(input) {
        const hash=crypto.createHash('sha1')
        hash.update(input)
        return hash.digest('hex');
    }
    
    const hashedPassword = await sha1(password);
    const prefix = hashedPassword.slice(0, 5); // First 5 characters
    const suffix = hashedPassword.slice(5);   // Remaining characters

    // Step 2: Query the HIBP API
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!response.ok) {
        return { isBreached: false, msg: "Error querying Have I Been Pwned." };
    }

    // Step 3: Check if the hash suffix exists in the response
    const result = await response.text();
    const breached = result.split("\n").some(line => line.startsWith(suffix.toUpperCase()));
    return breached
        ? { isBreached: true, msg: "Password has been found in a data breach, please choose a strong password for security purpose" }
        : { isBreached: false, msg: "Password is safe from known breaches." };
}
const isStrongPassword=async(password)=>{

   const minLength=12;
   if(password.length<minLength){
    return {
        isValid:false,
        message:"minimum length of password should be 12 characters (including at least one numbers, UPPERCASE letters, lowercase letters and special charaters)"
    }
   }
    const hasDigit=/[0-9]/.test(password)
    const hasUpperCase=/[A-Z]/.test(password)
    const hasLowerCase=/[a-z]/.test(password)
    const hasSpecialCharacter=/[!@#$%^&*(),.?":{}|<>]/.test(password)

    if(!hasDigit || !hasUpperCase || !hasLowerCase || !hasSpecialCharacter){
        return {
            isValid:false,
            message:"Password must include at least one numbers, UPPERCASE letters, lowercase letters and special charaters"
        }
    }    
    
    let hibp=await checkHIBP(password);
    hibp.isValid=hibp.isBreached ? false:true;
    return hibp;
}
module.exports={isStrongPassword,checkHIBP}