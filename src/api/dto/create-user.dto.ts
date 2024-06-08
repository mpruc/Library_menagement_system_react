export interface CreateUserDto {
  username: string;
  password: string;
  role: string;
  name: string;
  email: string;
}

export interface CreateUserResponseDto {
  username: string;
  role: string;
  loginId: number;
}
