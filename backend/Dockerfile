FROM node
WORKDIR /backend
COPY package*.json ./
RUN apt-get update && apt-get install -y libavahi-compat-libdnssd-dev
RUN npm install --install-strategy=nested
RUN npm rebuild
EXPOSE 3000
