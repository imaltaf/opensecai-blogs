# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
