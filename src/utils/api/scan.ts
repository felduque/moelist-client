import axios from "./axios";
export const createScan = async (datos: any, token: string) => {
  try {
    const res = await axios.post("https://apix.moelist.online/scans", datos, {
      headers: {
        "x-auth-token": token,
      },
    });
    console.log(datos, token);
    return res;
  } catch (error) {
    console.log(error);
  }
};
