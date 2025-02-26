# Use Node.js base image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy the backend files into the container
COPY . /app/backend

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Set environment variables (optional)
ENV NODE_ENV=production

# Expose backend port
EXPOSE 3002

# Start the backend server
CMD ["npm", "start"]


# docker run -p 3002:3002 nikhilappasani/posetra-backend:latest
