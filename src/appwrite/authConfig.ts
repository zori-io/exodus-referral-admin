import { Client, Account } from "appwrite";
import { deleteCookie, setCookie } from "cookies-next";

interface SignInPayload {
  email: string;
  password: string;
}

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINTS!)
      .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!);
    this.account = new Account(this.client);
  }

  async signIn({ email, password }: SignInPayload) {
    const result = await this.account.createEmailPasswordSession(
      email,
      password
    );
    setCookie("adminToken", result.userId);
    return result;
  }

  async logout() {
    await this.account.deleteSessions();
    deleteCookie("adminToken");
  }
}

const authService = new AuthService();

export default authService;
