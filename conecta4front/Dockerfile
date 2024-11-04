# Usa una imagen base con Node.js para construir la aplicación
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Usa una imagen base de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos de construcción al directorio de Nginx
COPY --from=build /app/dist/angular4rayas /usr/share/nginx/html

# Expone el puerto en el que Nginx escucha
EXPOSE 80

# Comando para ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]