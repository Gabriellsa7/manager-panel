import { httpRequest } from "../config/axios/httpRequest";
import { generateReactQueryMutation } from "../helpers/react-query";

export const POST_CREATE_USER_KEY = "POST_CREATE_USER_KEY";

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserPayload) => {
  const path = "http://localhost:3001/api/users";

  try {
    const response = await httpRequest.post(path, {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error("Error fetching appointment details: " + error);
  }
};

export const useCreateUser = generateReactQueryMutation<
  void,
  CreateUserPayload
>(POST_CREATE_USER_KEY, createUser);
