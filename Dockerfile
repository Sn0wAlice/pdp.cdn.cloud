FROM node:20-alpine

# Dossier de travail dans le container
WORKDIR /app

# Copier package files et installer
COPY package*.json ./
RUN npm install

# Copier le reste du projet
COPY . .

# Créer le dossier si non existant
RUN mkdir -p public/pdp

# Exposer le port
EXPOSE 3000

# Start de l'app
CMD ["npm", "start"]