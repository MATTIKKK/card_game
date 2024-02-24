import axios from "axios";
import { Config } from "../config";

export async function setLogin(email: string, password: string): Promise<any> {
  const body = {
    email: email,
    password: password,
    rememberMe: false,
  };

  return await axios
    .post(Config.API_URL + "/auth/login", body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("response in setLogin", response);
      localStorage.setItem("token", response.data.token);

      const user = {
        _id: response.data._id,
        email: response.data.email,
        name: response.data.name,
        avatar: response.data.avatar || "",
        publicCardPacksCount: response.data.publicCardPacksCount,
        created: response.data.created,
        updated: response.data.updated,
        isAdmin: response.data.isAdmin,
        verified: response.data.verified,
        rememberMe: response.data.rememberMe,
      };
      return user;
    })
    .catch((error) => {
      console.log("error in setLogin", error);
      throw error;
    });
}

export async function setRegistration(
  email: string,
  password: string
): Promise<any> {
  const body = {
    email: email,
    password: password,
  };

  return await axios
    .post(Config.API_URL + "/auth/register", body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("response in setRegistration", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("error in setRegistration", error);
      throw error;
    });
}

export async function checkMe(): Promise<any> {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found in localStorage");
    return false;
  }

  return await axios
    .post(
      Config.API_URL + "/auth/me",
      {
        "token": token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      const user = {
        _id: response.data._id,
        email: response.data.email,
        name: response.data.name,
        avatar: response.data.avatar || "",
        publicCardPacksCount: response.data.publicCardPacksCount,
        created: new Date(response.data.created),
        updated: new Date(response.data.updated),
        isAdmin: response.data.isAdmin,
        verified: response.data.verified,
        rememberMe: response.data.rememberMe,
      };

      localStorage.setItem("token", response.data.token);
      return user;
    })
    .catch((error) => {
      console.log("error in checkMe", error);
      throw error;
    });
}
