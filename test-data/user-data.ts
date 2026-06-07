// test-data/user-data.ts
export const CUSTOMER_DATA = {
  FIRST_NAME: 'John',
  LAST_NAME: 'Doe',
  POSTAL_CODE: '12-345',
} as const;

export const INVALID_CREDENTIALS = {
  USERNAME: 'invalid_user',
  PASSWORD: 'wrong_password',
} as const;

export const LOCKED_OUT_USER = {
  USERNAME: 'locked_out_user',
  PASSWORD: 'secret_sauce',
} as const;

export const EMPTY_CUSTOMER = {
  FIRST_NAME: '',
  LAST_NAME: '',
  POSTAL_CODE: '',
} as const;
