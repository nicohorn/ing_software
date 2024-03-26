# _Project structure_

Following the App router convention to define routes, each page is inside its corresponding folder, which is the actual name of the page we'll be accessing through the url path.

For this particular project, inside each page folder I always include at least one more folder, this folder will contain all of the components that are used inside such page.

> The folder **components** that's at the root level will contain components that are used throughout the whole app (mostly UI stuff).

So the general project structure will be the following:

Italics represent folders.

- ## _src_
  `Root folder`
  - ## page.tsx
    `Index page (/)`
  - ## layout.tsx
    `This layout will be applied to the whole app. Useful for navbars and footers, among other things.`
  - ## _components_
    `General components used throughout the whole app.`
    - ## component_example.tsx
      `Component example.`
  - ## _about_me_
    `Page example.`
    - ## page.tsx
      `About me page (/about_me)`
    - ## _components_
      `Components used only in the about me page`
