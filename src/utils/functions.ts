import { OPTIONS } from "./constants";

export const generateOptionOfCpu = () => {
  const optionSelected = Math.floor(Math.random() * (4 - 1) + 1);
  if (optionSelected === 1) {
    const { value, element } = OPTIONS.rock;
    return { value, element };
  } else if (optionSelected === 2) {
    const { value, element } = OPTIONS.paper;
    return { value, element };
  } else {
    const { value, element } = OPTIONS.scissors;
    return { value, element };
  }
};
