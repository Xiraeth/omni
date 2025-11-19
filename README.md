This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## An app to track various everyday stats

A project I am building to hone my nextjs skills, while using various libraries

## Features

Some of there features used in this app so far are:

### Authentication

- Custom login and signup authentication pages
- Github authentication

## Income & Expenses pages

- Pages for income and expenses that let you filter entries based on various criteria.

## Todo-list page

- Page for creating and tracking todo-lists with categories and date selection.

## Settings page

- Page for updating user settings

## Stats page

- Dashboard for viewing stats (eternally under construction)

<hr/>

## Key Libraries Overview

| Category                     | Libraries                                                                                                                      | Purpose                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Framework & Core**         | Next.js 15, React 18, TypeScript                                                                                               | Core application framework, UI library, and static typing.                            |
| **UI & Styling**             | Tailwind CSS, tailwind-merge, tailwindcss-animate, Lucide React, FontAwesome, Radix UI (shadcn) | Styling system, animation utilities, icons, and accessible headless UI components.    |
| **Forms & User Interaction** | React Hook Form, React Day Picker, React Toastify                                                                              | Form handling, date selection UI, and toast notifications.                            |
| **Data Fetching & State**    | @tanstack/react-query, React Query DevTools                                                                                    | Server-state management, caching, and async data fetching.                            |
| **Backend / Full-Stack**     | Mongoose, bcrypt, NextAuth, Nodemailer                                                                                         | MongoDB ORM, password hashing, authentication, and email sending.                     |
| **Utilities**                | Axios, clsx, class-variance-authority, date-fns                                                                                | HTTP client, conditional class helpers, variant-based styling, and date manipulation. |
| **Charts & Visualization**   | Recharts                                                                                                                       | Data visualization and chart components.                                              |
| **Tooling & Linting (Dev)**  | ESLint, eslint-config-next, @typescript-eslint, PostCSS, Tailwind build tools, TypeScript types                                | Linting, formatting, and build tooling for development.                               |

