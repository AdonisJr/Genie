const bcrypt = require('bcrypt')

export async function hashPassword (unHash: any){
    const salt = await bcrypt.genSalt(13)
    return bcrypt.hash(unHash, salt).then((hash: String) => {return hash})
}


export async function comparePassword (password: String, hashed: String){
    return bcrypt.compare(password, hashed)
}