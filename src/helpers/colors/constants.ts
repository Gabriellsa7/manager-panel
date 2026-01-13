import { COLOR_SCHEMA } from "./types";

export enum ENUM_COLOR_SCHEMA_TYPE {
  DEFAULT = "default",
  ADDITIONAL_1 = "additional_1",
}

export enum ENUM_COLOR_NAMES {
  PRIMARY = "primary",
}

export const COLORS_SCHEMA_VALUES: COLOR_SCHEMA = {
  [ENUM_COLOR_SCHEMA_TYPE.DEFAULT]: {
    [ENUM_COLOR_NAMES.PRIMARY]: "#000000",
  },
  [ENUM_COLOR_SCHEMA_TYPE.ADDITIONAL_1]: {
    [ENUM_COLOR_NAMES.PRIMARY]: "#9403fc",
  },
};
