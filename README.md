# Smart Pump Profile

Live version available at smartpump.alazo.io

### Tech Stack

-   Backend
    -   Express
    -   Low DB
-   Frontend
    -   React
    -   Redux
    -   Bootstrap

### How to deploy

-   Create and configure **"./server/config/.env.secrets"**. View example at **"./server/config/example.env.secrets"**
-   Install dependencies
-   Build Static Files

```
cd ./server
npm run client-install
npm run postbuild
npm run server
```

### Run dev environment

-   Create and configure **"./server/config/.env.secrets"**. View example at **"./server/config/example.env.secrets"**
    -   Configure **PORT** to run on **5000**
-   Install dependencies

```
cd ./server
npm run client-install
npm run dev
```
