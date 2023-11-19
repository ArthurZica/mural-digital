export interface UserPayload {
  id: number;
  email: string;
  nome: string;
  iat?: number;
  exp?: number;
  type?: number;
}
