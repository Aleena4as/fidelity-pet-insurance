**Architecture, Design Patterns & Best Practices**
# To run the project
   npm run dev


-  Author Name must be written on top of the file
   Example: @Author Your Name

# DRY - Do Not Repeat Yourself

If you are using a function more than once, then write that function inside the utils/function.js
So that you and others can re-use it where ever necessary

# Write Re-Usable Components
*  Cut down a page into different components so that it can be easily maintained.
*  If a section is being repeated on the same page or on a different page then make that section into a component , put them inside src/Components/ComponentName.js. Along with their SCSS File

# React / Javascript

-  Always _COMMENT_ your code where ever necessary
   This will reduce the stress of debugging
   Example: 
   /**
   * Function creates a loop that calls an API 
   *
   */
   const callAPI =()=>{}   

-  Only use Funcitonal Component and React Hooks
   * _Do Not use_ class component

- If a page has sections which isnt being re-used in other files then  make sure to create it as seperate components in the
  same folder.
  Example : About Page - has 4 sections Make the 4sections as individual components inside the About page folder
  /About
    /SectionOne
    /SectionTwo
    /SectionThee 
    - With respective names
   So this way we wont have one huge file, instead we will be small small pieces of code.


-  Use Context API for StateManagement
   *  Create Seperate file for context and reducer in the same Folder
      Example:
      context/Complier/ComplierContext.js
      context/Complier/ComplierReducer.js
      context/Complier/types.js - All the type should be inside the type.js

-  _API Calls_
   * Use Axios for api call and write the API url in the /utils/Request.js
   * Call axios from Request.js whenever making an API call instead of import axios from "axios" everytime
   * Once the api url is set in tha Request.js then we don't have to go each and every page to change the URL

-  Do no write comments inside the html section (Also known as JSX).


# SCSS
-  Create the SCSS file inside the same folder as the js file for that same component with same name
   Example :
   if Home Component Folder then,
   Home/
   Home.js
   Home.scss

*  If you create a scss file, Make sure to import that in the src/styles/style.css file at the bottom.
   *  If the scss file is a component, place it below the component section
   *  If the scss file is a page, place it below the component section

*  When writing a style in a scss file
   -  Parent className should be same as the page name
   -  Example if the page is Home.js
   -  className should be className="home-container" ** This class name must be never used again to avoid conflicts **
   -  Only write the styles for that specific file in it, NO DONT Conflict the style for other pages
      Every code of the file should be nested inside the same container, do no write any code out side this container, that will lead to conflict in different pages if we use the same class name.
      Example:
      ** Do This **
      .home-container {
      .title { //Classes are nested inside the .home-container
      color:grey;
      }
      }

      ** Don't Do This **
      home-container {
      //Code
      }
      .title { //Classes are NOT nested inside the .home-container
      color:grey;
      }

*  _DO NOT USE_
   Float - CSS Property
   Jquery - JavaScript Library
   
- Before installing any package, inform the person handling the project. Avoid using packages as much as possible depending on the time.

# GIT
-  Always take a pull from dev branch before starting the day.
-  Once the task is done, Push to the branch and create a pull request - Do not merge
-  Always create a new branch from "dev" branch before working, _DO NOT WORK DIRECTLY ON MASTER OR DEV Branch_


# Author - Aleena Antony
