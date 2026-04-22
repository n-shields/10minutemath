import unit1 from "./unit1";
import unit2 from "./unit2";
import unit3 from "./unit3";
import unit4 from "./unit4";
import unit5 from "./unit5";
import unit6 from "./unit6";
import unit7 from "./unit7";
import unit8 from "./unit8";
import { ALGEBRA1_UNITS } from "../algebra1/index";

export const GEOMETRY_UNITS = [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8];

export const SUBJECTS = [
  { id: "algebra1",  label: "Algebra 1", units: ALGEBRA1_UNITS },
  { id: "geometry",  label: "Geometry",  units: GEOMETRY_UNITS },
];
