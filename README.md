## Ejemplos para las cátedras de ingeniería de software I y II

Antes que nada, tenés que tener instalado git y node en tu computadora:

https://git-scm.com/

https://nodejs.org/

Cloná este repositorio en tu máquina usando el siguiente comando:

```bash 
git clone https://github.com/nicohorn/ing_software
```

Luego, instalá las dependencias del proyecto con el siguiente comando:

```bash
npm install
```

Para correr el servidor local, usá este comando:
```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.


Ejemplo de historia de usuario:

```js
/*
Como usuario registrado
Quiero iniciar sesión en el sistema
Para acceder a mi cuenta y utilizar las funcionalidades personalizadas

Criterios de aceptación:
1. El usuario debe poder ingresar su nombre de usuario y contraseña en la página de inicio de sesión.
2. El sistema debe validar las credenciales del usuario y permitir el acceso si son correctas.
3. Si las credenciales son incorrectas, el sistema debe mostrar un mensaje de error y permitir al usuario intentarlo nuevamente.
4. Después de iniciar sesión exitosamente, el usuario debe ser redirigido a su página de perfil o dashboard.
5. El sistema debe mantener la sesión del usuario activa hasta que cierre sesión o después de un período de inactividad predefinido.
6. El usuario debe tener la opción de seleccionar "Recordar mi cuenta" para que sus credenciales se almacenen de forma segura y se auto-completen en futuros inicios de sesión.
7. Si el usuario ha olvidado su contraseña, debe haber un enlace "¿Olvidaste tu contraseña?" que le permita restablecerla a través de su correo electrónico registrado.
*/
```
