This repo acts as the backend connector to Kibo for React Storefront
clone repo and  `npm install `

To publish react-kibo-storefront to your local yalc store:

`npm run push-build`

Then run the following to push updated builds to yalc store on changes.
`npm run watch`

Repo for front end:
https://github.kibocommerce.com/EcommNG/kibo-react-storefront
or create a fresh application
`npm create react-storefront kibo-reactstorefront`

To add our local backend connector:
`cd ./kibo-reactstorefront`
`yalc add react-storefront-kibo-connector`
`npm start`

Replace “react-storefront-connector” import references in front end with “react-kibo-storefront-connector”