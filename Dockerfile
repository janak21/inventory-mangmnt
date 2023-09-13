# Use Node.js Alpine base image
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 3001

# Start the application
CMD [ "node", "app.js" ]