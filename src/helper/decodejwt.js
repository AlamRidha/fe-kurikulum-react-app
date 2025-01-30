import { jwtDecode } from "jwt-decode";

// decode jwt token
export const decodeDataJwt = (token) => {
  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};
