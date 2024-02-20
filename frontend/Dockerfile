FROM node
WORKDIR /frontend
COPY package*.json ./
RUN npm install --install-strategy=nested
RUN npm run build
EXPOSE 5000
