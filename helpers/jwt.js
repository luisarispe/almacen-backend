import jwt from "jsonwebtoken";

const generarJWT = async (id, expire) => {
  try {
    const token = await jwt.sign({ id }, process.env.JWT, {
      expiresIn: expire,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
export default {
  generarJWT,
};
