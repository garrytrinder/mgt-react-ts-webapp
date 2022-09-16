#!/usr/bin/env bash

# login
echo "Sign in to Microsoft 365..."
npx -p @pnp/cli-microsoft365 -- m365 login --authType browser
# create AAD app
echo "Creating AAD app..."
appId=$(npx -p @pnp/cli-microsoft365 -- m365 aad app add --name "mgt-react-ts-webapp" --multitenant --redirectUris "http://localhost:1234/" --platform spa --query "appId" -o text)
# write appId to .env
echo "Writing appId to .env ..."
echo "CLIENTID=$appId" > .env

echo "DONE"
