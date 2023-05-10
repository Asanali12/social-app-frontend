const bcrypt = require("bcryptjs")

const saltRounds = 10

export const generateHash = (password: string) => {
    const hash = bcrypt.hashSync(password, saltRounds)
    return hash
}

export const compare = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash)
}