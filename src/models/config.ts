import { Client, Databases, Users } from "node-appwrite";

let client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINTS as string)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string)
  .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY as string);

const databases = new Databases(client);
const users = new Users(client);

export { client, databases, users };
