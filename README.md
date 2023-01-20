This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
#   n e x t - j s - g y m - w o r k o u t s 
 
 

A website that has pages for seeing the list of profiles, registering the profiles, seeing the profile's schedule, and editing the workouts of the profile. On the list of profiles webpage you can delete the profile and various buttons that lead you to the other pages. In the registering a user page you must put the profile's first and last name to let it be inserted to the database. In the user schedule page you see the list of exercise that you have as well as a stylized table to show the days of the week and which exercises are to be performed on what day. The final page is the editing the profile's exercise page, in this page you can either remove or add the exercise from the profile's list. For the exercise that are not in the profile's list there are several actions that the person can perform. For one the user can set the reps and sets for the exercise and also using checkboxes decide what days the exercise would be performed and finally a reset button in case of mistakes. All this data is to be grabbed from the local mssql database the scripts are found in the folder named "planning-docs". The "planning-docs" also holds some design images such as ER diagram, relational schema , and a physical data dictionary for the database.
