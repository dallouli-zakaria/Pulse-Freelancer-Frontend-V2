# # Stage 1: Build Angular Application
# FROM node:18 AS build

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application
# COPY . .

# # Build the Angular app
# RUN npm run build --prod

# # Stage 2: Serve Application using Nginx
# FROM nginx:alpine

# # Copy the built Angular app from the previous stage
# # Use the correct project name for the dist directory
# COPY --from=build /app/dist/pulse-freelancer-frontend-v2 /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]

# First stage of building image
FROM node:latest AS build

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npm run build --prod

# Second stage
FROM nginx:alpine

COPY --from=build /app/dist/pulse-freelancer-frontend-v2 /usr/share/nginx/html




