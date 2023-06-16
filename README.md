# Internal Staff Portal Demo

Using HTML, CSS, JavaScript/Angular and SQL design a user registration, login and home page for an internal staff portal. The user should be able to create an account, sign in using the account credentials used to create and account, change their password, and log out.

## Database Design

Using a local SQL Server, create an SQL database and user table with the following fields:

- First Name
- Last Name
- Other Names
- Country
- Email Address
- Telephone Number
- Password

## Registration Page

A form to collect the following user information for account registration:

- First Name
- Last Name
- Other Names
- Country
- Email Address
- Confirm Email Address
- Telephone Number
- Password
- Confirm Password

## Login Page

A user authentication form that requires their username (email address) and password to login.

## Home Page

The home page or dashboard should indicate the user is signed in and give them the opportunity to log out and change their password. No additional functionality is required on this page.

The change password feature can be a new page or modal window but must fit the aesthetic of the page design.

## How to Run

1. Must have Node.js installed.
2. Must have MySQL workbench installed.
3. Create a schema called cbsi_connect and table called users in MySQL workbench. The users table has the following properties:

- **id** int AI PK
- **first_name** varchar(255)
- **last_name** varchar(255)
- **other_names** varchar(255)
- **country** varchar(255)
- **email** varchar(255)
- **telephone** varchar(10)
- **password** varchar(255)

4. Open a command terminal and navigate to backend folder. Run the command

```
npm start
```

5. Open another command terminal and navigate to frontend folder. Run the command

```
ng serve
```
