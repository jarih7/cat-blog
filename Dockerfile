FROM node:16

# directory inside the docker image
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# bundle app src
COPY . .

RUN npm run build

# expose port
EXPOSE 3000

CMD ["npm", "run", "start:dev"]
