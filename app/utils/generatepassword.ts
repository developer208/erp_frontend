import generator from "generate-password";

export const generatepass = (): string => {
  let password: string = generator.generate({
    length: 10,
    numbers: true,
  });
  return password;
};
