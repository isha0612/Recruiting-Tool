# Recruiter Tool - A PERN Stack Application


This is a Recruiter Tool application using a blend of HTML, Tailwind CSS and React.js for the frontend. The backend employes Typescript, Node.js and Express.js, with PostgreSQL serving as the database. The application boasts a robust authentication system, facilitating user registration and login through the utilization of JSON Web Tokens and cookies. Moreover, it features a section dedicated to candidate information, including their name, email, phone number, skills, status and expected salary. Recruiters can add new candidates and edit the details of existing ones. Lastly, the application includes a dark mode feature to cater to different user preferences.


Link to the website - https://recruiting-tool.vercel.app/


## Clone the repository
```terminal
$ git clone https://github.com/isha0612/Recruiting-Tool.git
```

## Project structure
```terminal
client/
   package.json
   .env 
server/
   package.json
   .env 
README.md
```


# Run the fullstack app on your machine 

Notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other.

## Client-side usage

### Prepare your secret

Run the script at the first level:

(You need to assign values to all the variables mentioned in the .env.example file and store those variables in the .env file.)

For example -

```terminal
$ cd server
$ echo "REACT_APP_SERVER_URL=YOUR_REACT_APP_SERVER_URL" >> src/.env
```

### Start the client-side server

```terminal
$ cd client          // go to client folder
$ npm i              // npm install packages
$ npm run dev        // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```


## Server-side usage

### Prepare your secret

Run the script at the first level:

(You need to assign values to all the variables mentioned in the .env.example file and store those variables in the .env file to  set port numbers of frontend and backend, connect to MongoDB and enable password recovery functionality.)

For example -

```terminal
$ cd server
$ echo "JWTSECRET=YOUR_JWT_SECRET" >> src/.env
```

### Start the server-side server

```terminal
$ cd server       // go to server folder
$ npm i           // npm install packages
$ npm run dev     // run it locally
$ npm run build   // this will build the server code to es5 js codes and generate a dist file
```