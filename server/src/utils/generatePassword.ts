import bcrypt from "bcryptjs"
import generator from "generate-password"

/**
 * Generates a random password of length between minLength and maxLength,
 * and returns the hashed and plain versions of the password.
 * @author Med Aziz GUennichi
 * @param {number} minLength - The minimum length of the password.
 * @param {number} maxLength - The maximum length of the password.
 * @returns {Promise<{hashedPassword: string, plainPassword: string}>} An object containing the hashed and plain versions of the password.
 */
async function generatePasswordHashed(minLength: number,maxLength: number): Promise<{ hashedPassword: string; plainPassword: string }> {
    // Generate a random password of the specified length.
    const length =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let password = generator.generate({
      length,
      numbers: true,
      lowercase: true,
      uppercase: true,
    });
    console.log(password);
    // Generate a salt and hash the password using bcrypt.
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Return the hashed and plain passwords.
    return { hashedPassword, plainPassword: password };
  }
  
  export default generatePasswordHashed;