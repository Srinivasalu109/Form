import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const url = "http://localhost:4000";
const postData = async (forms) => {
  console.log(forms);
  const id = uuidv4();
  const form = {
    id,
    Name: forms.Name,
    Ph_number: forms.Ph_number,
    Gender: forms.Gender,
    Age: forms.Age,
  };

  const data = await axios.post(`${url}/postData`, { form });
  return data;
};

const updateDate = async (forms) => {
  console.log(forms);
  console.log("user");
  const form = {
    id: forms.id,
    Name: forms.Name,
    Ph_number: forms.Ph_number,
    Gender: forms.Gender,
    Age: forms.Age,
  };
  const data = await axios.patch(`${url}/updateData`, { form });
  return data;
};

const deleteData = async (id) => {
  const data = await axios.delete(`${url}/deleteData/${id}`);
  return data;
};
export { postData, updateDate, deleteData };
