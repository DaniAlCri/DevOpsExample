# Descargar desde Docker Hub, la imagen pública de Node versión 10. 
FROM node:10
# Establecer como directorio de trabajo (el directorio por defecto) la ruta /usr/src/app
WORKDIR /usr/src/app
# Copia en la máquina de Docker el archivo 'server.js'. El segundo argumento es la ruta 
#  donde se encuentra el archivo respecto al Dockerfile (en la misma carpeta).
COPY server.js ./
# Copia todos los archivos que comiencen por 'package' y acaben en '.json'
COPY package*.json ./
# Copia la carpeta './www' dentro de la máquina con el nombre 'www'.
ADD www ./www
# Ejecuta los comandos en la máquina al crearse. En este caso instala npm y express.
RUN npm install
RUN npm install --save express 
# Abre el puerto 8081 para poder desplegar la aplicación.
EXPOSE 8081
# Al arrancar la máquina, ejecuta el siguiente comando de terminal (arranca el servidor)
CMD [ "node", "server.js" ]
