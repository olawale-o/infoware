# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN npm install --only=production

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application to the container
COPY . .

# Expose the port the application listens on
EXPOSE 4000

# Set the NODE_ENV environment variable to "production"
ENV NODE_ENV=production

# Install nodemon globally
RUN npm install -g nodemon

# Start the application
CMD ["node", "index.js"]