// AuthResponse.ts

export interface Token {
    accessToken: string;
    refreshToken: string;
}

export interface UserData {
    email: string;
    name: string;
    token: Token;
}

export interface AuthResponse {
    data: UserData;
    additionalData: any;
    message: string | null;
    statusCode: number;
    code: string;
}
