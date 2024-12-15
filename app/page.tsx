import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import HomeClient from "./components/HomeClient";

export default async function Home() {
  const session = await getServerSession(options);
  return <HomeClient session={session} />;
}
