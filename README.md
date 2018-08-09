# API Tres Bares

## Introducción

## Instalación

### Alimentar la base de datos con ejemplos

Para que la base de datos tenga información sobre los dos recursos que entrega esta API (tables y dishes)
fueron creados dos scripts que precargan una base de datos llamada `tres-bares` (si no existe la crea
automáticamente) con una lista de mesas posibles así como también un listado hipotético de platos a servir.

Los scripts para realizar ésto están en la carpeta `scripts/` y se ejecutan de la siguiente manera:

```
$ node 01-load-tables.js #para precargar información de las mesas
$ node 02-load-products.js #para precargar información de los productos
```

Los scripts preguntarán previamente si se decide eliminar los posibles anteriores valores que puedan encontrarse
en cada colección (colección es el nombre que usa mongo para lo que en un ambiente SQL sería tabla), de ésta forma
se evita que se duplique información.

Si se quiere modificar el contenido de lo que se precarga, esto está en el directorio `scripts/data`, siendo `tables.json`
el que es leído e insertado por el script `01-load-tables.js` y `dishes.json` usado por `02-load-products.js`.
Es fundamental no tocar los nombres de los campos, pero si hay total libertad en agregar más entradas o modificar los valores
de los campos.

### Dependencias y ejecución

Es necesario tener corriendo una instancia de Mongo

```
$ npm i
$ npm run dev
```
