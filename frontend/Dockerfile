FROM node
COPY /frontend/src /frontendsrc
COPY /frontend/public /frontendpublic
WORKDIR /frontend
COPY package*.json ./
RUN npm install --install-strategy=nested
RUN npm run build
EXPOSE 5000
