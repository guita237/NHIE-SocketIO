# -------- BUILD STAGE --------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# -------- PRODUCTION STAGE --------
FROM node:20-alpine

WORKDIR /app

# 1️⃣ Copier package + lock et installer TOUTES les deps (incl. dev, pour @mikro-orm/cli & ts-node)
COPY package.json package-lock.json ./
RUN npm ci

# 2️⃣ Copier tsconfig pour que ts-node soit content
COPY tsconfig.json ./

# 3️⃣ Copier le build compilé + le fichier de questions
COPY --from=builder /app/dist ./dist
COPY NHIE_Questions.txt ./NHIE_Questions.txt

ENV NODE_ENV=production

EXPOSE 3500

# 4️⃣ Lancer migrations + serveur
CMD ["sh", "-c", "npx mikro-orm migration:up && node dist/server.js"]
