FROM node:carbon

RUN mkdir -p /nest
ADD ./ /nest
WORKDIR /nest
RUN npm i -g @nestjs/cli

#RUN npm install -f -g nodemon
#RUN npm install

EXPOSE 3000 9229
CMD [ "npm", "run", "debug" ]
