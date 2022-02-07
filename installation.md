# Setting up the project


1. clone repo

    cd to project directory e.g.,

        cd bootcamp/group-projects/...

    copy the ssh link from my github repo

        git clone <paste repo ssh link here>

        // => bootcamp/group_projects/our-group-project-repo

1. setup your repo

    install the required modules

        npm i

    add your environment variables
    1. create a `.env` file in the root directory of the repo

            touch .env

    1. add your credentials to the `.env` file

            SESS_SECRET='uber secret passkey'
            DB_NAME=messages_db
            DB_USER='my-username'
            DB_PASSWORD='my-pw1234'

    1. create the MySQL Database 'messages_db'

    ```
    npm run db
    ```

1. install eslint and prettier extensions in vscode

    1. click on the extensions tab
    1. search for eslint > click install extension

    OPTIONAL

    1. disable the extensions globally
        1. right click on the extension and select `disable`
        1. inside the vscode project workspace (ie. 'messaging-app' window)
        1. right click on the extension and select `Enable (workspace)`

    This will allow you to only use eslint & prettier within this project. And save resources on your computer when working on other projects.

[list of Express.js-compliant template engines that the Express.js team maintains](https://github.com/expressjs/express/wiki#template-engines).
