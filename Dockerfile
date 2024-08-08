# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire server directory to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 5003

# Command to run the application
CMD ["npm", "start"]
