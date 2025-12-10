export const Patterns = {
  USERS_REGISTER: 'users.register',
  USERS_FIND_ALL: 'users.findAll',
  USERS_LOGIN: 'users.login',
} as const;

export type PatternKeys = keyof typeof Patterns;
export type PatternValues = typeof Patterns[PatternKeys];
