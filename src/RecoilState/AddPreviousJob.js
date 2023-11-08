import { atom } from "recoil";

export const AddPreviousJob = atom({
  key: "AddPreviousJob",
  default: [{ major: "", start_year: "", end_year: "", workplace: "" }],
});
