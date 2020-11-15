#!/usr/bin/env zsh

function createAppRegistration (){
    local appName=$1
    local replyUrl=$2
    
    appObjectId=`az ad app create --display-name "${appName}" --available-to-other-tenants true --oauth2-allow-implicit-flow true  --reply-urls "${replyUrl}" --query "objectId" --output tsv`
    # Undocumented: You need to create the service principal to back the app registration
    # https://github.com/Azure/azure-cli/issues/12797#issuecomment-612138520
    sp=`az ad sp create --id ${appObjectId}`
    appId=`az ad app show --id ${appObjectId} --query "appId" --output tsv`
    
    echo "${appId}"
}

function addDelegatePermission (){
    local appId=$1
    local sp=$2
    local scope=$3
    
    spId=`az ad sp list --display-name "${sp}" --query "[0].appId" --output tsv`
    scopeId=`az ad sp show --id ${spId} --query "oauth2Permissions[?value=='${scope}'].id" --output tsv`
    count=`az ad app permission list --id ${appId} --query "length([*].resourceAccess[?id=='${scopeId}'] | [])" --output tsv`
    
    if [ $count -eq 0 ]; then
        echo "Adding ${scope} permission for ${sp} ..."
        az ad app permission add --id ${appId} --api ${spId} --api-permissions "${scopeId}=Scope"
    else
        echo "${scope} already listed in permissions ... skipping ..."
    fi
}

function grantAdminConsent (){
    local appId=$1
    
    az ad app permission admin-consent --id ${appId}
}

echo "Creating app registration ..."
appName="mgt-react-ts-webapp"
replyUrl="http://localhost:1234/"
appId=`createAppRegistration $appName $replyUrl`

echo "Adding delegate permissions ..."
addDelegatePermission ${appId} "Microsoft Graph" "User.Read"

echo "Granting admin consent ..."
grantAdminConsent ${appId}

echo "${appId}"