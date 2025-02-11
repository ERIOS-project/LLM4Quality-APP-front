# Utilisez une image de base officielle de Node.js
FROM node:23-alpine

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le fichier package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install --legacy-peer-deps

# Copiez le reste de l'application dans le répertoire de travail
COPY . .

# Construisez l'application pour la production
RUN npm run build

# Exposez le port sur lequel l'application sera disponible
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "preview"]