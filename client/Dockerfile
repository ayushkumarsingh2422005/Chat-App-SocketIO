# Use the official Node.js 20 image as the base image
FROM node:20

# Create and change to the app directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]
