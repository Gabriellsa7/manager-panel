import { httpRequest } from "../config/axios/httpRequest";
import { generateReactQueryMutation } from "../helpers/react-query";

export const SET_OPENING_HOURS_QUERY_KEY = "SET_OPENING_HOURS_QUERY_KEY";

export type OpeningHourInput = {
  dayOfWeek: number; // 1–7
  openTime: string; // "09:00"
  closeTime: string; // "18:00"
  lunchStart?: string;
  lunchEnd?: string;
};

interface SetOpeningHoursParams {
  barbershopId: string;
  hours: OpeningHourInput[];
}

type SetOpeningHoursResponse = {
  success: boolean;
};

export const setOpeningHours = async ({
  barbershopId,
  hours,
}: SetOpeningHoursParams): Promise<SetOpeningHoursResponse> => {
  const response = await httpRequest.post(
    `/barbershop/${barbershopId}/opening-hours`,
    { hours },
  );

  return response.data;
};

export const useSetOpeningHours = generateReactQueryMutation<
  SetOpeningHoursResponse,
  SetOpeningHoursParams
>(SET_OPENING_HOURS_QUERY_KEY, setOpeningHours);
