
#working directory
WORKDIR /app

#copy package.json files
COPY package*.json ./

#run the commands to installation of packages
RUN npm install 

#copy source code
COPY . .

#Expose port
EXPOSE 5173

#run the server
CMD ["npm","run","dev"]