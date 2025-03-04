# ------------------------------
# 1️⃣ Backend Build Stage
# ------------------------------
FROM node:20 AS backend

# Set working directory
WORKDIR /app/backend

# Copy backend files and install dependencies
COPY backend/package.json backend/package-lock.json ./
RUN npm install --production

# Copy remaining backend files
COPY backend ./

# Expose backend port
EXPOSE 3002

# ------------------------------
# 2️⃣ Frontend Build Stage
# ------------------------------
FROM node:20 AS frontend

# Set working directory
WORKDIR /app/frontend

# Copy frontend dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy frontend source files
COPY frontend ./

# Build frontend
RUN npm run build

# ------------------------------
# 3️⃣ Final Stage - Use Node.js for Backend and Serve Frontend with Nginx
# ------------------------------
FROM node:20  
# ✅ Use Node.js instead of Nginx for backend 

# Set working directory
WORKDIR /app

# Copy backend and frontend builds
COPY --from=backend /app/backend /app/backend
COPY --from=frontend /app/frontend/dist /usr/share/nginx/html

# Install backend dependencies (production)
WORKDIR /app/backend
RUN npm install --production

# Expose ports for frontend & backend
EXPOSE 5173 3002

# Start Backend & Serve Frontend
CMD ["sh", "-c", "node index.js & npx serve -s /usr/share/nginx/html -l 5173"]
