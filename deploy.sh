#!/bin/bash
set -e

echo "Starting Production Deployment..."

cd "$(dirname "$0")"

echo "Pulling latest changes from Git..."
git pull origin master

echo "Building and starting production containers..."
docker compose up --build -d

sleep 3

echo "Running database migrations..."
docker exec aruda_presence_prod php artisan migrate --force

echo "Clearing old config and route caches..."
docker exec aruda_presence_prod php artisan config:clear
docker exec aruda_presence_prod php artisan cache:clear

echo "Deployment completed successfully!"
