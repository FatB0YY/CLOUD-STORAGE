FROM node

WORKDIR /app

EXPOSE 8080

COPY package* ./

RUN npm install 

COPY . ./

CMD ["npm", "start"]

