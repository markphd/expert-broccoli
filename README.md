# Summary

React project for a simple catalog website with order functionality. Basically, the website showcases products within different categories that are stored on the backend database (MongoDB). Using MongoDB Compass, webshop owners can directly access the database in a GUI and update the inventory easily.

## User

When a user orders thru the website, they are given an order code which is auto generated. This code are presented to webshop owners by the user, this is just to ensure that the user is not just playing around the website.

## Webshop Owner

Once an order is completed, the webshop owner will receive an email with all the list of items in the basket, together with name, email address and mobile number. This email is sent via Sendgrid email service.

🌍 View the live site: https://mariamarie.garden/

## Tech Stack

-   Database: MongoDB
-   Frontend: React
-   Routing: Next.js
-   Styling: Pure CSS / CSS Grid
-   Hosting: Vercel
-   Analytics: FBPixel

### Starting project

-   Create an .env file with a working MongoDB URI and Sendgrid API

```
MONGODB_URI=mongodb+srv://xxx:xxx@xxx
MONGODB_DB=xxxx
SENDGRID_API=SG.XXXXXX
```

-   Run `yarn`
-   Run `yarn dev`

### Extra Credit

Thanks to Leigh Halliday for the generousity of sharing his knowledge, I have learned a lot from his Youtube videos.
📺 https://www.youtube.com/user/leighhalliday
