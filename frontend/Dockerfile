# Use Node.js image to build the frontend
FROM node:20 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first (Better for caching)
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY frontend . 

# Build the project
RUN npm run build

# Use Nginx to serve the frontend in production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 5173
EXPOSE 5173

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


# docker run -p 5173:5173 nikhilappasani/posetra-frontend