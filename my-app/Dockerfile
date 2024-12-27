# Usa una imagen base con Node.js para construir la aplicación
FROM node:16 as build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen más ligera para servir la aplicación
FROM nginx:alpine

# Copia los archivos de construcción al servidor de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto donde correrá Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
