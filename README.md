# WenJobs Front-end

## Authors

- Jack Stubblefield
- Xavier Hillman
- Robert Ball
- Stephen Martinez
- Alan Chelko
- Elaine Huynh

### What is WenJobs?

A job board that utilizes scheduled web-scraping to collect current Web3 job postings. The data is then stored in a database and served to the front-end of the application. The front-end is built with React and is hosted on Firebase.

### Why did we build WenJobs?

- To create a more effective, efficient and natural path for job seekers to identify and obtain their next role.

- Job boards are great at percolating a vast array of jobs in one place, but are disconnected from your network and from each other. LinkedIn is a great resource for networking, but you have to have a specific job or company in mind in order to see who might be in your network. Lastly, researching companies and identifying a decent volume of meaningful opportunities in your particular area of interest is just unsolved currently.

- One of the hardest parts of the job hunt is networking---finding those people who can actually help you get your application seen and your voice heard. Often these quick conversations can lead to a job much more efficiently and effectively than any other job-seeking technique.

## Deployed Site

[wenjob.xyz]('wenjobs.xyz')

## Domain Modeling

![UML Diagram](./public/UML.png)

## Tech Stack

The primary tools used to build this application are:

- React
- Firebase
- Algolia
- Redux
- Ant Design
- Auth0
- Papaparse

## Run app locally

- Clone the repo
- Create a .env file in the root directory
- Create a firebase project and add a web app
  - You will be given a firebaseConfig object (Follow this link for more details: <https://firebase.google.com/docs/web/setup#config-object>)
- Add the following to the .env file:

```env
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID= 
REACT_APP_APP_ID=
REACT_APP_MEASUREMENT_ID=
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENT_ID=
REACT_APP_ALGOLIA_ID=
REACT_APP_ALGOLIA_API_KEY=
```

You can find the values for the first 7 variables in your firebase project settings. The last 3 variables are for Auth0 and Algolia. You will need to create accounts with those services and add the values to the .env file.

Algolia is third party service that we use to search our database. We integrated it with firebase in the "Extensions" section of the firebase console. You can find the values for the last 2 variables in the Algolia dashboard.

- Run `npm install` to install dependencies
  - The following dependencies will be installed:
  
```js
 "dependencies": {
    "@algolia/client-search": "^5.0.0-alpha.27",
    "@auth0/auth0-react": "^1.12.0",
    "@reduxjs/toolkit": "^1.9.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "algoliasearch": "^5.0.0-alpha.27",
    "antd": "^5.0.0",
    "axios": "^1.1.3",
    "browser-router": "^0.2.0",
    "convert-csv-to-json": "^1.4.0",
    "dotenv": "^16.0.3",
    "firebase": "^9.13.0",
    "papaparse": "^5.3.2",
    "react": "^18.2.0",
    "react-data-table-component": "^7.5.3",
    "react-dom": "^18.2.0",
    "react-highlight-words": "^0.18.0",
    "react-papaparse": "^4.1.0",
    "react-redux": "^8.0.5",
    "react-router-dom": "^6.4.3",
    "react-scripts": "^5.0.1",
    "web-vitals": "^2.1.4",
    "xlsx": "^0.18.5"
  }
```

- Run `npm start` to start the app locally.

## Database Design

The database is a NoSQL database hosted on Firebase. The database is structured as follows:

- Users
  - Email (string) - used as the key
    - Connections (array of strings)
      - Email Address (string)
      - Company (string)
      - Connected On (string)
      - First name (string)
      - Last name (string)
      - Position (string)

- Jobs
  - id (string)
    - URL (string)
    - Company (string)
    - details (string)
    - Key (number)
    - location (string)
    - posted (string)
    - salary (string)
    - source (string)
    - tags (array of strings)
    - title (string)

## Main Components

### Connections

This component is what allows you to upload your CSV file and add your connections to the database. The CSV file must be modified before it can be uploaded. Rows 1-3 needs to be deleted so just the headers and the data are present.

All of this connection data is stored in redux so it can be accessed by other components.abs

### Jobs

This is the main component of the application. It is where the user can search for jobs and view the details of each job. The search bar is powered by Algolia. The jobs are stored in redux so they can be accessed by other components.

### Companies

This component is where you can see how many of your connections work at any given company, this is mainly for informational purposes, but the information is shared with the job details component so you can see how many of your connections work at a given company when you are viewing the details of a job.
