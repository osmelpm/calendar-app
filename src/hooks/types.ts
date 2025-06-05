export type EventCreationResp = {
  title: string;
  notes?: string;
  start: string;
  end: string;
  user: string;
  id: string;
};

export type EventApiResp = Omit<EventCreationResp, "user"> & {
  user: {
    _id: string;
    name: string;
  };
};

export type StartLogin = {
  email: string;
  password: string;
};

export type StartRegister = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  uid: string;
  name: string;
  email: string;
  token: string;
};
