## Infoware

## Built with
- Node.js
- MySQL
- Sequelize

## Getting started
### To get a local copy of this repository kindly follow the steps below.
- Scroll to top of this current repository
- Click on the `Code` button with background color green on the right end corner
- Click on the clipboard icon on the extreme right of the dropdown to copy the repository link
- In your local PC, open your terminal or command prompt in the folder you would like to clone this repository into
- Type `git clone (copied link)` on the currently opened terminal or command prompt
- Remember to change `(copied link)` to `git@github.com:olawale-o/infoware.git` which is the name of the repository

## Running the app
### Development
#### Install
```bash
npm install
```

#### Setup Database
```sh
npm run db:create:dev
```

#### Migrate Database
```sh
npm run db:migrate
```

#### Usage
```bash
npm run start
```

### Test
```sh
npm run db:create:test
```

```sh
npm test
```

## Endpoints
- POST
```sh
/api/v1/employees
```
- GET
```sh
/api/v1/employees?page=1&per_page=5&include=metadata
```
- GET
```sh
/api/v1/employees/1
```
- PUT
```sh
/api/v1/employees
```
- DELETE
```sh
/api/v1/employees
```

👤 **Omoogun Olawale**

* Github: [@githubhandle](https://github.com/olawale-o)
* LinkedIn: [LinkedIn](https://www.linkedin.com/in/olawaleomoogun/)

## Acknowledgments

- Infoware