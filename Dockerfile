FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including serve for production)
RUN npm ci && npm install -g serve

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Serve the production build
CMD ["serve", "-s", "dist", "-l", "8080"]