# Microsoft Graph Toolkit + React + TypeScript + Parcel

This sample shows how you can use the Microsoft Graph Toolkit with React and TypeScript, using the Parcel web application bundler.

The sample uses the `Login` component to authenticate with Azure and the `Get` component with a custom template to render the current users profile.

## Path to awesome

- Clone repo
- Create Azure AD app registration
  - Install Azure CLI & login to tenant
  - Make setup file executable
    - `chmod +x scripts/aad-setup.sh`
  - Execute script to create app
    - `./scripts/aad-setup.sh`
  - Copy returned client id
- Create `.env` file in root
  - Add `CLIENTID=<clientid>`
- Install dependencies 
  - `npm install` 
- Start web server
  - `npm start`
- Open `http://localhost:1234`