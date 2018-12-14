FROM node:carbon

# Install nodemon
RUN npm install -f -g nodemon

# Create app directory
WORKDIR /home/nodejs

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for productionpm n
# RUN npm install --only=production

#COPY ./src ./src

#EXPOSE 4300
EXPOSE 4300 9229
CMD [ "npm", "run", "debug" ]
#CMD [ "npm", "start" ]
