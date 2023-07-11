# Movies App
This is the frontend of the Movies application, which consumes the OMDbApi to search for movies and display their details. The application was developed using React and TypeScript.

## Running the Project
Before running the project, make sure the backend is up and running correctly. Follow the instructions provided in the backend's README.md file to set up the environment variables correctly, including the API Key generated from the OMDbApi service.

Follow the steps below to run the frontend:

Install the dependencies:
```shell
npm install
```

Start the application:
```shell
npm run dev
```

## Using the Application
The Movies application has a simple and intuitive user interface. It consists of two pages:
### Movie Search Page
On the home page, you can search for movies by their title using the search bar. Enter the desired title and click the search button or press Enter to see the results. The corresponding movies will be displayed in a grid, showing the movie poster and title.

You can also navigate through the result pages using the pagination buttons at the top.
### Movie Details Page
When you click on a movie on the search page, you will be redirected to the movie details page. On this page, you can see more detailed information about the movie, such as the title, release year, rating, genre, synopsis, and other relevant details.
Feel free to use the favorite button!
