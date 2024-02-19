FROM node
COPY . /backend
WORKDIR /backend
RUN apt-get update && apt-get install -y libavahi-compat-libdnssd-dev
RUN npm install --install-strategy=nested
RUN npm rebuild
EXPOSE 3000
