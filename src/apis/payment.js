import axios from "axios";
const fields = ["amount", "member", "createdBy", "updatedBy", "method", "type"];
export const post = async (payment) => {
  let data, error = null;
  try {
    fields.forEach((f) => {
      if (!Object.getOwnPropertyNames(payment).includes(f))
        throw Error(`${f} is missing`);
    });
    const response = await axios.post("https://server-hwdi.onrender.com/payments/" + payment.member, payment);
    if (response.data) data = response.data;
  } catch (err) {
    error = err;
  } finally {
    return [data, error];
  }
};
