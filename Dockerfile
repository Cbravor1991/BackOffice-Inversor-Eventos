FROM node:16
#RUN apk add --no-cache python2 g++ make

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build 

EXPOSE 3000

CMD ["npm", "start"]