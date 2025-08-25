interface User {
  id: string;
  name: string;
  email: string;
  // Add any other user fields you expect
}

export interface LoginSuccessResponse {
  success: true;
  message: string;
  data: {
    token: string;
    user: User;
  };
  statusCode: number;
}

export interface LoginErrorResponse {
  success: false;
  message: string;
  statusCode: number;
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
