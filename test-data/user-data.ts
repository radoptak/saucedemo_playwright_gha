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

export const CUSTOMER_WITHOUT_FIRST_NAME = {
  FIRST_NAME: '',
  LAST_NAME: 'Doe',
  POSTAL_CODE: '12-345',
} as const;

export const CUSTOMER_WITHOUT_LAST_NAME = {
  FIRST_NAME: 'John',
  LAST_NAME: '',
  POSTAL_CODE: '12-345',
} as const;

export const CUSTOMER_WITHOUT_POSTAL_CODE = {
  FIRST_NAME: 'John',
  LAST_NAME: 'Doe',
  POSTAL_CODE: '',
} as const;

export const EMPTY_CUSTOMER = {
  FIRST_NAME: '',
  LAST_NAME: '',
  POSTAL_CODE: '',
} as const;
