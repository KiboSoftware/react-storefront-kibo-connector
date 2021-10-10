# KIBO React-Storefront Connector

The [React Storefront](https://github.com/storefront-foundation/react-storefront) headless ecommerce connector for Kibo Commerce.

Main features:

- Product listing pages (PLP)
- Product detail pages (PDP)
- Cart

This guide covers how to get up and running with the Kibocommerce Connector. For information on connectors in general and how to write your own connector refer to the [React Storefront Connectors](https://docs.reactstorefront.io/guides/connectors) documentation.

## Requirements

You will need a Kibo commerce backend to try out the connector.

## Running Locally

Create a new React Storefront app using version 8.14.0 or later:

```
npm create react-storefront my-kibo-app
```

Next `cd` into your created application and install the Kibo commerce connector:

```
cd my-kibo-app
npm install @kibocommerce/react-storefront-kibo-connector
```

## Configuration

Next configure the `KIBO_CONFIG_HOST` environment variable in `.env` file to point to your Kibo backend. See `.env.sample` file as an example of adding env variable via [dotenv](https://www.npmjs.com/package/dotenv). You can also check [this guide](https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html) to get more info about Node.js Environment Variables. For example, your `.env` file may look like:

```
    KIBO_ACCESS_TOKEN_URL=https://home.mozu.com/api/platform/applications/authtickets/oauth
    KIBO_CLIENT_ID: KIBO_APP.1.0.0.Release
    KIBO_SHARED_SECRET: 12345_Secret
    KIBO_API_HOST: https://kibo-site.com
    HOME_DOCUMENT_TYPE=cms_content_type
    PRODUCT_DOCUMENT_TYPE=cms_content_type
```

- `KIBO_API_HOST` - link to your Kibo Commerce GraphQL API instance.
- `KIBO_ACCESS_TOKEN_URL` - link to Kibo Commerce Authentication Server. It is used to request an access token from Kibo Commerce OAuth 2.0 service.
- `KIBO_CLIENT_ID` - Unique Application (Client) ID of your Application
- `KIBO_SHARED_SECRET` - Secret API key used to authenticate application. Viewable from your [Kibo eCommerce Dev Center](https://mozu.com/login)
- `HOME_DOCUMENT_TYPE` - Custom developer defined content type name for Kibo CMS HTML blocks
- `PRODUCT_DOCUMENT_TYPE` - Custom developer defined content type name for Kibo CMS HTML blocks

Visit [Kibo documentation](https://apidocs.kibong-perf.com/?spec=graphql#auth) for more details on API authentication

Based on the config, this package will handle Authenticating your application against the Kibo API.

Finally set the connector in your `next.config.js` file. By default this file is set to use the `react-storefront/mock-connector` as shown below:

```
module.exports = withReactStorefront({
  // ... Some code

  connector: 'react-storefront/mock-connector',
  // ... More code
```

Change this line to use the `@kibocommerce/react-storefront-kibo-connector` as shown below:

```
module.exports = withReactStorefront({
  // ... Some code

  connector: '@kibocommerce/react-storefront-kibo-connector',
  // ... More code
```

Now you can run your project locally,

```
npm start
```

And then visit http://127.0.0.1:3000 in your browser.

## Deploying to the Layer0

The front-end React Storefront can be hosted anywhere that supports Node and Express but it works great on the [Layer0](https://www.layer0.co/). You can try the Layer0 for free by signing up [here](https://app.layer0.co/signup). Once you have an account you can deploy it by running `layer0 deploy`:

```
Layer0 deploy
```

Refer to the [Layer0 deployment guide](https://docs.layer0.co/guides/deploying) for more information.

## Development

- In 1st terminal window (this repo), run `yalc publish` & `npm run watch`
- In 2nd terminal window, open [RSF starter app (`commercial` branch)](https://github.com/storefront-foundation/react-storefront-starter-app/tree/commercial)
- Go to `next.config.js` and change `connector` field value to `react-storefront-kibo-connector`
- Run `yalc add react-storefront-kibo-connector`
- Run `npm i`
- Run `npm run start`
