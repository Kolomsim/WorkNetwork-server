FROM node:21-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
COPY public ./public
RUN npm install nodemon --save-dev bcrypt cookie-parser socket.io multer

EXPOSE 4000
CMD ["npm", "run", "dev"]

