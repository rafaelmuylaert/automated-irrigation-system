FROM node
WORKDIR /frontend
COPY . ./
RUN npm install --install-strategy=nested
RUN npm run build
EXPOSE 5000
