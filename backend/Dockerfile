FROM node:22-alphine

#working directory
WORKDIR /app

#copy package.json files
COPY package*.json ./

#run the commands to installation of packages
RUN npm install 

#copy source code
COPY . .

#Exppose port
EXPOSE 3000

#run the server
CMD ["npm","run","start"]