import jwt from 'jsonwebtoken'

const jwtTokenGenerator = (expiresIn: string,data?:object) => {

    return jwt.sign(data || {}, process.env.JWT_KEY, {expiresIn});
}

export default jwtTokenGenerator;