# Étape 1 : Build de l'application
FROM node:23-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances et construire l'application
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Étape 2 : Utiliser Nginx pour servir les fichiers statiques
FROM nginx:stable-alpine

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers construits depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
