# React JS - Vite

### INSTALACION NECESARIA
- Node JS
- Visual Studio
- Simple React Snippets
- ES7+ React/Redux/React-Native snippets

> **React + Vite**
- npm create vite@latest
- npm install (descargar dependency)
> **SWC**

- Durante el desarrollo, cuando ejecutas npm run dev, Vite utiliza SWC de la siguiente manera:

- Compilación de TypeScript:

SWC se encarga de compilar tu código TypeScript a JavaScript mientras desarrollas. Esto incluye transformar todas las características de TypeScript, como tipos estáticos, interfaces, clases, y demás, a un formato compatible con JavaScript que pueda ser interpretado por el navegador.

- Compilación para producción (npm run build):
Al preparar tu aplicación para producción con npm run build, SWC se utiliza de la siguiente manera: SWC optimiza y minifica tu código TypeScript compilado a JavaScript. Esto incluye eliminar espacios en blanco innecesarios, reducir nombres de variables y funciones a formas más cortas (si está configurado así), y eliminar código muerto para reducir el tamaño del archivo final.

### PRETIER y ESLINT
- **Eslint**: encontrar y corregir problemas en el código JavaScript, según reglas especificadas.

- **Pretier**: El formateador de codigo.

> **1) Intalar Prettier**
- npm install --save-dev --save-exact prettier

Una ves instalado, en el .eslintrc.cjs, poner la config, la adición de "prettier" en la sección extends de tu archivo de configuración de ESLint sirve para integrar Prettier con ESLint.
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    /*add */
    "prettier"
  ]
}
```
> **2) eslint-config-prettier**
> 
es una configuración para ESLint que desactiva todas las reglas de ESLint que podrían entrar en conflicto con Prettier. Esto es especialmente útil cuando usas ambos, ESLint para el análisis del código y Prettier para el formateo, porque algunas reglas de ESLint pueden chocar con las reglas de formateo de Prettier.

- npm install -D eslint-config-prettier 

> **3) Crea un archivo .prettierrc**

en la raíz de tu proyecto para definir las reglas de Prettier (formateador):

```json
module.exports = {
  printWidth: 100,
  useTabs: true,
  singleQuote: true,
  arrowParens: "avoid",
  endOfLine: "auto",
};

```

***Comandos***: Para eslint y prettier
- npm run lint
 
- npm run format

### .Vs CODE
> crear carpeta .vscode: 

estos archivos de configuración te permiten establecer las extensiones recomendadas y configurar el formateo automático del código en Visual Studio Code para tu proyecto de React, lo que ayuda a mantener un código limpio y consistente.

- **intalar  extencion** : prettier, eslint
- **extensions.json** : Este archivo se utiliza para recomendar extensiones específicas de Visual Studio Code para tu proyecto.

- **settings.json** : Este archivo contiene la configuración específica de Visual Studio Code para tu proyecto

### INSTALAR BOOTSTRAP
 Bootstrap 5 depende de Popper.js para posicionar sus tooltips y popovers de manera adecuada. Por lo tanto, al instalar Bootstrap, también es común instalar Popper.js como su dependencia.
- npm i bootstrap

- npm install @popperjs/core

***React-Boostrap* :** está diseñado específicamente para funcionar bien con React. Proporciona componentes Reactizados que se integran perfectamente con el flujo de trabajo y la sintaxis de React, lo que facilita la creación de aplicaciones React con estilos de Bootstrap.
- npm install react-bootstrap 

### REACT ROUTER
 React Router es una biblioteca de enrutamiento diseñada específicamente para aplicaciones web construidas con React. Permite que las aplicaciones React tengan múltiples vistas y gestionen la navegación entre ellas de manera fácil y declarativa
 
- npm install react-router-dom

### INSTALAR AXIOS
 Axios es una opción popular para realizar solicitudes HTTP en aplicaciones JavaScript debido a su facilidad de uso, compatibilidad universal, flexibilidad y soporte para promesas
 
- npm i axios

Si estás trabajando con solicitudes HTTP y necesitas serializar y deserializar objetos JavaScript en cadenas de consulta (query strings), qs es una excelente biblioteca para esa tarea. Es especialmente útil cuando estás trabajando con APIs que esperan parámetros en forma de cadenas de consulta.
- npm i qs

> PONERLE ALIAS ALA HORA DE IMPORTAR

- Ubicarse en : vite.config.ts 
- poner importacion: import * as path from 'path'
- ejutar el comando : npm i @types/node
- luego indicar a : tsconfig.json
```json
 "paths": {
      "@/*":["./src/*"]
    }
```

### INSTALAR FORMIK
Formik es una librería de gestión de formularios para React que simplifica y mejora la experiencia de trabajo con formularios en aplicaciones React. Proporciona una forma más intuitiva y declarativa de manejar la lógica de los formularios, lo que facilita la validación, el envío de datos y el control del estado del formulario.

- npm i formik

- npm i yup (para validaciones)

### INSTALAR REACT QUERY(tanStack) 

- npm install @tanstack/react-query

- npm install @tanstack/react-query-devtools

- npm install @tanstack/react-table

> **Ubicarse en el main del proyecto.**

> **const queryClient = new QueryClient(); =>** Aquí estás creando una instancia de QueryClient, que es el objeto principal que utilizas para interactuar con React Query en tu aplicación. Esta instancia de QueryClient se utiliza para configurar y administrar la caché de datos, realizar consultas y mutaciones, y mucho más.


> **QueryClientProvider client={queryClient}> =>** Estás envolviendo tu aplicación dentro de un componente QueryClientProvider proporcionado por React Query. Este componente provee el contexto necesario para que todos los componentes de tu aplicación accedan al queryClient que creaste anteriormente. Básicamente, establece el queryClient como el cliente de React Query para tu aplicación.


> **RouterProvider router={router} /> =>**  Este componente RouterProvider está configurando el enrutador que usarás en tu aplicación. Estás pasando el objeto router como prop al componente. Esto es común en aplicaciones React que utilizan enrutadores para manejar la navegación entre diferentes vistas o páginas.


> **ReactQueryDevtools initialIsOpen={false} /> =>** Este componente ReactQueryDevtools es opcional y se utiliza para proporcionar herramientas de desarrollo para depurar y monitorear el estado de React Query en tu aplicación. Al configurarlo con initialIsOpen={false}, estás indicando que las herramientas de desarrollo estarán cerradas por defecto cuando se cargue tu aplicación.
### VARIABLES DE ENTORNO
Las variables de entorno son variables que se utilizan para configurar y controlar el comportamiento de programas y aplicaciones en un sistema operativo.
Las variables de entorno pueden contener información como rutas de directorio, ubicaciones de archivos, configuraciones de red, configuraciones de seguridad, información de usuario, etc. 

- Crear archivo: .env.example
- Colocar tu URL base de la api 
- Para poder usarlo: crear archivo env.ts y poner =
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

### EXTRA

- npm install sweetalert2
- npm install react-spinners
- npm i moment
- npm i react-toastify
