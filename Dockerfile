# Step 1: Use an official Node.js base image that allows custom versions
FROM node:20-slim

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package files to the container
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy the rest of the project files to the container
COPY . .

# Step 6: Expose the port that your app runs on
EXPOSE 3000

# Step 7: Command to run the development server
CMD ["npm", "run", "dev"]
