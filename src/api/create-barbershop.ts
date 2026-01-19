import { httpRequest } from "../config/axios/httpRequest";
import { Barbershop } from "../config/entities/barbershop/barbershop.types";
import { generateReactQueryMutation } from "../helpers/react-query";
import { uploadImage } from "./upload-image";

export const CREATE_BARBERSHOP_QUERY_KEY = "CREATE_BARBERSHOP_QUERY_KEY";

interface CreateBarbershopParams {
  name: string;
  address: string;
  description?: string;
  imageFile?: File | null;
  ownerId: string;
}

export const createBarbershop = async ({
  name,
  address,
  description,
  imageFile,
  ownerId,
}: CreateBarbershopParams): Promise<Barbershop> => {
  let image_url: string | undefined;

  if (imageFile) {
    image_url = await uploadImage(imageFile);
  }

  const response = await httpRequest.post<Barbershop>("/api/barbershop", {
    name,
    address,
    description,
    image_url,
    ownerId,
  });

  return response.data;
};

export const useCreateBarbershop = generateReactQueryMutation<
  Barbershop,
  CreateBarbershopParams
>(CREATE_BARBERSHOP_QUERY_KEY, createBarbershop);
