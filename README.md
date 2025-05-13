# 🎲 Avatar CDN API

Une API ultra-légère en Node.js pour générer dynamiquement des avatars SVG à partir de [DiceBear](https://www.dicebear.com/), les stocker localement, et les servir via un chemin accessible.

---

## 🚀 Fonctionnalités

- 🎨 Génération d'avatars SVG uniques via DiceBear API
- 💾 Stockage local dans un répertoire dédié (`/public/pdp`)
- 📦 Serveur CDN léger pour servir les avatars générés
- 🔒 Validation UUID sécurisée
- ⚙️ Configuration simple via fichier `config`

---

## 🔧 Installation (manuelle)

```bash
git clone https://github.com/Sn0wAlice/pdp.cdn.cloud.git
cd pdp.cdn.cloud
npm install
```

## 🔧 Installation (via Docker)

```bash
wget https://raw.githubusercontent.com/Sn0wAlice/pdp.cdn.cloud/main/docker-compose.yml
docker compose up
```
- Assurez-vous d'avoir Docker et Docker Compose installés sur votre machine.
- Le fichier `docker-compose.yml` est déjà configuré pour vous.
- Il télécharge l'image Node.js et exécute le serveur sur le port 3000.
- Accédez à l'API via `http://localhost:3000`.
- Les avatars générés seront stockés dans le répertoire `public/pdp`.

---

## 📁 Configuration

Crée un fichier config/default.json basé sur config.sample.json.

Exemple (config.sample.json)

```json
{
    "collection": "adventurer",
    "background": "d1d4f9"
}
```

- collection : nom de la collection DiceBear (ex: avataaars, bottts, identicon, etc.)
- background : couleur de fond en hex (sans #)

Voir toutes les collections disponibles ici : [DiceBear API Reference](https://www.dicebear.com)

---

## 🖥️ Lancement du serveur

Utilise docker pour lancer le serveur, le fichier `docker-compose.yml` est déjà dans repo.

> N'oublie pas de créer un fichier `config.json` basé sur `config.sample.json` avant de lancer le serveur.

```bash
docker compose up
```

> docker expose le port 33200 par defaut, mais tu peux le changer dans le fichier `docker-compose.yml`.

---

## 📡 Utilisation de l’API

Générer un avatar (UUID v4 requis, et votre clé de sécurité)
- L'uuid permet d'associer un avatar à un utilisateur
- La clé de sécurité est une chaîne aléatoire pour éviter les abus

```
GET /new/:uuid/:securitykey
```

- `:uuid` doit être un UUID v4 valide
- Réponse :
```json
{
  "url": "/assets/pdp/550e8400-e29b-41d4-a716-446655440000.svg"
}
```

Accéder à l’avatar généré

```
HOSTNAME /assets/pdp/550e8400-e29b-41d4-a716-446655440000.svg
```


---

## 📂 Arborescence

```
.
├── public/
│   └── pdp/                 # Avatars SVG stockés ici
├── main.js                  # Point d’entrée de l’application
├── config.json
├── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 🛡️ Sécurité
- UUID strictement validé via regex avant toute génération
- Les fichiers SVG sont réécrits s’ils existent déjà, évitant la duplication

---

## 🧪 Exemple d’appel avec curl

```bash
curl http://localhost:33200/new/550e8400-e29b-41d4-a716-446655440000/mysecretkey
```

---

## ❤️ Crédits
- DiceBear Avatars pour l’API de génération
- Inspiré par le besoin de générer des avatars personnalisés pour des apps, jeux ou outils communautaires