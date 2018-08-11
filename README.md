# API Tres Bares

## Introducción

## Instalación

### Con Docker

Con `docker` y `docker-compose` previamente instalado (en el caso de Ubuntu los descargué directamente de la paquetería).
Ejecutar los siguientes comandos:

```
$ npm i
$ docker-compose up
```
El primer comando simplemente instala las dependencias de NodeJS.
El segundo inicia dos containers (esto se puede ver bien en `docker-compose.yml`) uno para la API y otro para mongo,
expone los puertos de cada contenedor a puertos de la máquina local y por último monta el directorio local en el container
de Node, así puede acceder a las dependencias que se instalaron con el comando anterior además de poder leer los cambios
que se hagan en la API.


### Sin Docker

Sin docker es necesario tener las siguientes dependencias instaladas

- node 8 o superior
- mongo 3 o superior

```
$ npm i
$ npm run dev
```

## Precargar base de datos

Los scripts preguntarán previamente si se decide eliminar los posibles anteriores valores que puedan encontrarse
en cada colección (colección es el nombre que usa mongo para lo que en un ambiente SQL sería tabla), de ésta forma
se evita que se duplique información.

Si se quiere modificar el contenido de lo que se precarga, esto está en el directorio `scripts/data`, siendo `tables.json`
el que es leído e insertado por el script `01-load-tables.js` y `dishes.json` usado por `02-load-products.js`.
Es fundamental no tocar los nombres de los campos, pero si hay total libertad en agregar más entradas o modificar los valores
de los campos.

### Con Docker
```
$ docker-compose run --rm api node scripts/01-load-tables.js
$ docker-compose run --rm api node scripts/02-load-products.js
```
Estos dos scripts se ejecutan internamente en el contenedor de Mongo

### Sin Docker
```
$ node 01-load-tables.js #para precargar información de las mesas
$ node 02-load-products.js #para precargar información de los productos
```
