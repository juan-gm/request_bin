# This is our RequestBin Project

Authors:
* Rich
* Callie
* José
* Juan

# Set-up Steps
- Run `npm install`

- Create a local postgresql database. Type commands:

  - `psql`
  - `CREATE DATABASE request_bin`
  - Go out of psql `\q`

- Use `setup.sql` to set up the schema:

  - `psql -d request_bin < db/setup.sql`

- Create an `.env` file in the root directory and add `DATABASE = ` with the following link. Edit the uri to be 

  - `'postgres://yourpsqlusername:psqlpassword@localhost:5432/request_bin'`

  The psql pasword it's usually 12345
  It is possible to change it by running the command `ALTER USER username WITH PASSWORD 'newpassword';`
