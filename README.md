# CatchEmAll

## Scripts

Here are the available scripts in this project:

- `dev`: Starts the development server using Vite.
- `build`: Builds the project using TypeScript and Vite.
- `test`: Runs the tests using Vitest.
- `test:coverage`: Runs the tests and generates a coverage report using Vitest.
- `format:all`: Formats the code using Prettier.
- `lint`: Lints the code using ESLint.
- `lint:style`: Lints the CSS files using Stylelint.
- `lint:all`: Runs all linting and formatting scripts.
- `prepare`: Prepares Husky for Git hooks.
- `pre-commit`: Runs lint-staged before committing.

## Development Resources

- [PokeAPi](https://pokeapi.co/)
- [Figma](<https://www.figma.com/design/cTEI3oft6wMcUiw4LRTulS/Pok%C3%A9Dex----A-PokeDex-Website-Design-(Community)?node-id=0-1&p=f&t=2NhPlvXCgFijNuz8-0>)

## Technical Resources

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Stylelint](https://stylelint.io/)
- [Vitest](https://vitest.dev/)

## Project tips and rules

### Folder structure example

```plaintext
├── public
│   └── asset1.svg
│   └── asset2.svg
└── src
    ├── components       # Reusable components
    │   ├── button
    │   │   ├── Button.tsx
    │   │   ├── Button.test.tsx
    │   │   └── Button.css
    │   └── header
    │       ├── Header.tsx
    │       ├── Header.test.tsx
    │       └── Header.css
    │
    ├── pages            # Application pages
    │   ├── home
    │   │   ├── Home.tsx
    │   │   ├── Home.test.tsx
    │   │   └── Home.css
    │   └── about
    │       ├── About.tsx
    │       ├── About.test.tsx
    │       └── About.css
    │
    ├── service          # Functional logic / api services / mapper ...
    │   └── api.ts
    │
    ├── App.tsx
    ├── main.tsx
    └── styles            # Global styles
        └── global.css
```

### Testing

- Each component should have its own unit test file.
- Use aria-role / text to identify elements in the test. Avoid using classes, ids or data-testid.
- You can use screen (from testing-library) to query elements or using container provided by the render method (from testing-library) to navigate into your DOM element rendered.

### Styling

- Use BEM nomenclature for CSS classes.
- Try as possible to fit functional in CSS class naming.

### Components

- Each component should be a folder with the component file, test file and CSS file.
- Avoid using inline styles.
- Each component should be well typed following this pattern: `FC<Readonly<ComponentProps>>`.
- Thinks reusability when creating components. Each component should be a small piece of the application that can be parameterized.

**Note**:

- `FC`: This is an alias for FunctionComponent, a generic type provided by React for typing functional components.
- `Readonly<ComponentProps>`: This means that the component properties (`ComponentProps`) are read-only, which prevents them from being modified after they have been initialised.

- Together, `FC<Readonly<ComponentProps>>` indicates that the component is a functional component that accepts read-only properties of type `ComponentProps`.
