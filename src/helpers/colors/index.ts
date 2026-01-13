import { COLORS_SCHEMA_VALUES, ENUM_COLOR_SCHEMA_TYPE } from "./constants";
import { COLOR_NAME } from "./types";

export const selectColorSchema = (type: ENUM_COLOR_SCHEMA_TYPE): COLOR_NAME => {
  return COLORS_SCHEMA_VALUES[type];
};
