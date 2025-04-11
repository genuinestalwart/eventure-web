# Eventure | Web

> *Eventure is a modern event management platform that allows users to easily create, manage, and attend events. Whether it's a virtual webinar, a local concert, or a corporate conference, Eventure simplifies the process with features like event creation, RSVP tracking, ticket sales, and real-time notifications. With an intuitive dashboard for organizers and a seamless discovery experience for attendees, planning and participating in events has never been easier.*

## Technologies Used

- Next.js
- Mantine UI
- TailwindCSS
- TypeScript
- Next Auth
- Axios
- Tanstack React Query

## Documentation

If you want to create this project on your own, do the following steps:

1. Create an app-router based next.js app with tailwindcss and typescript. Then, install the necessary packages.

    ```bash
    npx create-next-app@latest
    npm i @mantine/core @mantine/hooks @tabler/icons-react next-auth axios @tanstack/react-query
    npm i -D postcss-preset-mantine postcss-simple-vars
    ```

2. Update the `postcss.config.mjs` file.

    ```js
    plugins: {
        "@tailwindcss/postcss": {},
        "postcss-preset-mantine": {},
        "postcss-simple-vars": {
            variables: {
                "mantine-breakpoint-xs": "40em",
                "mantine-breakpoint-sm": "48em",
                "mantine-breakpoint-md": "64em",
                "mantine-breakpoint-lg": "80em",
                "mantine-breakpoint-xl": "96em",
            },
        },
    },
    ```

3. Generate the auth secret environment variable for Next Auth.

    ```bash
    npx auth secret
    ```
