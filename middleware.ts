export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/income(.*)", "/expenses(.*)", "/todos(.*)"],
};
