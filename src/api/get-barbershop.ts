import { httpRequest } from "../config/axios/httpRequest";
import { Barbershop } from "../config/entities/barbershop/barbershop.types";
import { generateReactQuery } from "../helpers/react-query";

export const GET_BARBERSHOP_BY_OWNER_QUERY_KEY =
  "GET_BARBERSHOP_BY_OWNER_QUERY_KEY";

interface GetBarbershopByOwnerParams {
  ownerId: string;
}

export const getBarbershopByOwner = async ({
  ownerId,
}: GetBarbershopByOwnerParams): Promise<Barbershop[]> => {
  const path = `/api/barbershop/owner/${ownerId}`;

  try {
    const response = await httpRequest.get<Barbershop[]>(path);
    return response.data;
  } catch (error) {
    console.error("Error fetching barbershop:", error);
    throw error;
  }
};

export const useGetBarbershopByOwner = generateReactQuery<
  Barbershop[],
  GetBarbershopByOwnerParams
>(GET_BARBERSHOP_BY_OWNER_QUERY_KEY, getBarbershopByOwner);
