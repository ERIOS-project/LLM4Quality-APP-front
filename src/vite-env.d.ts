/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AZURE_APP_ID: string;
    readonly VITE_AZURE_LOCATAIRE_ID: string;
    readonly VITE_AZURE_API_APP_ID: string;
    readonly VITE_API_URL: string;
    // Ajoutez d'autres variables d'environnement ici si nécessaire
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }