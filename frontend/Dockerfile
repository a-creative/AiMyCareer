# pull official base image
FROM node:14.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY src/package.json /app
COPY src/package-lock.json /app
RUN npm install

# add app
COPY src/ /app/

# start app
CMD ["npm", "start", "--port 3000"]