FROM node
WORKDIR /frontend
COPY package*.json ./
COPY src src
COPY public public
RUN npm install --install-strategy=nested
RUN npm run build
EXPOSE 5000
