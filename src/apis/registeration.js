import axios from "axios";
const fields = [
  "firstName",
  "middleName",
  "lastName",
  "phone",
  "address",
  "weight",
  "middleScale",
  "shift",
  "gender",
];
export const post = async (data) => {
  try {

    fields.forEach((field) => {
      if (!Object.getOwnPropertyNames(data).includes(field))
        throw Error(`${field} is missing`);
    });
    const response = await axios.post("https://server-hwdi.onrender.com/members", data);
    if (response.status == 200) return response.data;
  }
  catch (err) {
    throw new Error(err);
  }
};
