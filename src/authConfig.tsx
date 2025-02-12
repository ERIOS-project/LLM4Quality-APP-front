import { LogLevel, PublicClientApplication } from "@azure/msal-browser";

if (!window.env) {
  window.env = import.meta.env;
}
const azureAppId = window.env.VITE_AZURE_APP_ID;
const azureLocataireId = window.env.VITE_AZURE_LOCATAIRE_ID;
const azureApiAppId = window.env.VITE_AZURE_API_APP_ID;
/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */

export const msalConfig = {
  auth: {
    clientId:  azureAppId || "", //id de l'application
    authority: `https://login.microsoftonline.com/${azureLocataireId}`, //id de l'annuaire (locataire)
    redirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

let msalInstance : any ;
export async function initializeMsal() {
    msalInstance = await PublicClientApplication.createPublicClientApplication(msalConfig);
}

// Ensuite, vous pouvez appeler cette fonction pour initialiser msalInstance
initializeMsal().catch(console.error);

export async function getUserToken() {
    try {
        await initializeMsal(); // Assurez-vous que MSAL est initialisé
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length === 0) throw Error("Aucun utilisateur n'est connecté.");

        const silentResult = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
        });
        return silentResult.accessToken;
    } catch (error) {   
        console.error(error);
    }
}

export const graphRequest = {
    scopes: ["https://graph.microsoft.com/.default"]
};

// Créez une nouvelle fonction pour obtenir le jeton pour Microsoft Graph
export async function getGraphToken() {
    try {
        await initializeMsal(); // Assurez-vous que MSAL est initialisé
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length === 0) throw Error("Aucun utilisateur n'est connecté.");

        const silentResult = await msalInstance.acquireTokenSilent({
            ...graphRequest, // Utilisez graphRequest au lieu de loginRequest
            account: accounts[0],
        });

        return silentResult.accessToken;
    } catch (error) {   
        console.error(error);
    }
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: [
    `api://${azureApiAppId}/user_impersonation`,
  ], //id application de l'api
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};