import { ENUM_COLOR_NAMES, ENUM_COLOR_SCHEMA_TYPE } from "../constants";

export type COLOR_NAME = Record<ENUM_COLOR_NAMES, string>;

export type COLOR_SCHEMA = Record<ENUM_COLOR_SCHEMA_TYPE, COLOR_NAME>;
