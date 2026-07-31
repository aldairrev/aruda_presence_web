# Stage 1: Build frontend assets
FROM node:20-alpine AS node-builder
ENV NODE_OPTIONS="--max-old-space-size=512"
WORKDIR /app
COPY package*.json ./
RUN npm ci --quiet --no-audit --no-fund
COPY . .
RUN npm run build

# Stage 2: Install Composer dependencies
FROM composer:latest AS composer-builder
WORKDIR /app
COPY composer*.json ./
RUN composer install --no-dev --optimize-autoloader --no-scripts --ignore-platform-reqs

# Stage 3: Final Production Runtime
FROM php:8.2-cli-alpine

# Install SQLite dependencies
RUN apk add --no-cache sqlite-dev \
    && docker-php-ext-install pdo pdo_mysql

WORKDIR /var/www/html

# Copy application source code
COPY . .

# Copy built vendor dependencies from Stage 2
COPY --from=composer-builder /app/vendor ./vendor

# Copy built frontend assets from Stage 1
COPY --from=node-builder /app/public/build ./public/build

# Expose port
EXPOSE 8000

# Start the production server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
