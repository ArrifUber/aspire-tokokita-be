FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copy package & prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# 2. Install dependencies
RUN npm ci

# 3. Generate Prisma Client
RUN npx prisma generate

# 4. Copy sisa kode aplikasi
COPY . .

EXPOSE 3001

# 5. Jalankan migrasi dulu, baru start server
CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed-2 && node cmd/main.js"]
