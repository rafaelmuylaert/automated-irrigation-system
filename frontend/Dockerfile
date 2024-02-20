FROM node
COPY ./frontend/src /frontend/src
COPY ./frontend/public /frontend/public
WORKDIR /frontend
COPY package*.json ./
RUN npm install --install-strategy=nested
RUN npm run build
EXPOSE 5000
