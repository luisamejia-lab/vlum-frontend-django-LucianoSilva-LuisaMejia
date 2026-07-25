# React: vlum

## Descripción General

---

## Integrantes :

- Luciano Silva
  -Luisa Mejia

### Requisitos previos

- Node.js y npm instalados
- Editor de código (recomendado: VS Code)
- Navegador actualizado (recomendado: Chrome)
- React (usar Vite)

---

### Variables de entorno (.env)

```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_AUTH_BASE_URL=http://localhost:8000/o
VITE_MEDIA_URL=http://localhost:8000/media
VITE_API_CLIENT_ID=tu_client_id
VITE_API_CLIENT_SECRET=tu_client_secret
```

---

## Instalación del proyecto

1. **Clonar el repositorio**.
2. Abrir en VS Code la carpeta de tu repositorio clonado
3. Instalar las dependencias base:
   ```bash
   npm install
   ```
4. Instalar Material UI y sus dependencias:
   ```bash
   npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
   ```
5. Instalar Axios:
   ```bash
   npm install axios
   ```
6. Instalar React Router:
   ```bash
   npm install react-router-dom
   ```

### Comandos útiles

- Ejecutar el servidor de desarrollo
  ```bash
  npm run dev
  ```
- Comprobar versión de dependencias
  ```bash
  npm list
  ```
- Limpiar dependencias
  ```bash
  rm -rf node_modules
  npm install
  ```

### Comandos git

- Verificar los archivos modificados
  ```bash
  git status
  ```
- Agregar archivos al área de preparación
  ```bash
  git add .
  ```
- Realizar un commit
  ```bash
  git commit -m "descripción de cambios"
  ```
- Enviar los cambios a github
  ```bash
  git push origin main
  ```
