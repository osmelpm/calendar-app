type Env = {
  VITE_API_URL: string;
};

export const getConfig = (): Env => {
  return import.meta.env as unknown as Env;
};
