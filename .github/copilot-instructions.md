# GitHub Copilot Instructions

You are working on a **Expo Starter Boilerplate** project - a modern, production-ready Expo application foundation built
by The Software House.

## Project Overview

This is a carefully crafted Expo starter template featuring:

- **Expo** for fast development and building
- **TypeScript** for type safety
- **React Native Unistyles v3** for theming and responsive styling (accessed via custom `useStyles` hook)
- **Expo Router** for type-safe routing
- **TanStack Query** with custom abstraction layer
- **React Intl** for internationalization
- **Jest** and **React Native Testing Library** for unit testing
- **ESLint** and **Prettier** for code quality
- **React Native MMKV** for efficient local storage
- **React Native Reanimated** for smooth animations

## Key Architecture Principles

1. **Type Safety First**: All code should be fully typed with TypeScript
1. **Custom Abstractions**: Use project-specific abstractions (especially for API calls)
1. **Testing**: Write tests for all new functionality
1. **Documentation**: Keep docs updated when adding new patterns

## Specialized Instructions

For detailed guidance on specific areas, refer to these specialized instruction files:

- **[API Development](instructions/api.instructions.md)** - API patterns, React Query usage, data fetching
- **[Component Development](instructions/components.instructions.md)** - UI components, List usage, component patterns
- **[State Management](instructions/state.instructions.md)** - Context patterns, global state management
- **[Styling with Unistyles](instructions/styling.instructions.md)** - Theming, responsive design, component styling
- **[Git and Conventional Commits](instructions/git.instructions.md)** - Commit message format, conventional commits,
  validation

## Quick Reference

## Code Style and Structure

- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Ensure components are modular, reusable, and maintainable.
- Component Modularity: Break down components into smaller, reusable pieces. Keep components focused on a single
  responsibility and shouldn't be more than 80 lines of code.
- Components/folders should have an index.ts file that exports only the elements that should be available outside of the
  folder (components, types, utilities). This enables clean imports and encapsulation.
- To install new packages use `npx expo install <package-name>`
- **Never use hardcoded colors**: Always use theme colors (`theme.colors.*`) instead of hex codes, rgba, or color names
  like 'white', 'black'
- **Spacing**: Use `theme.spacing(n)` function where n \* 4px gives the final spacing value
- **Theme-first approach**: All styling should be theme-aware and support both light and dark modes
- **Use custom hooks**: Always use the project's custom `useStyles` hook instead of `useUnistyles` directly
- Structure repository files as follows:

```
src/
├── api/          # API layer with custom abstractions
├── app/          # Expo Router pages and components
├── hooks/        # Custom hooks (flat structure)
├── components/   # Shared components
│   ├── card.tsx
│   └── ui/       # Reusable UI components. button, input etc (flat structure)
├── context/      # Global contexts with controllers
├── utils/        # Utility functions
├── types/        # Global type definitions
└── i18n/         # Internationalization setup
└── styles/       # Styling utilities and theme definitions
```

## TypeScript Usage

- Use TypeScript for all code; prefer types over interfaces
- Avoid enums; use const objects with 'as const' assertion
- Use functional components with TypeScript interfaces
- Define strict types for message passing between different parts of the extension
- Use absolute imports for all files @/...
- Avoid try/catch blocks unless there's good reason to translate or handle error in that abstraction
- Use explicit return types for all functions
- **Zod imports**: Always use `from 'zod/v4'` instead of `from 'zod'` for schema validation
- **Constants naming**: Use SCREAMING_SNAKE_CASE for constants (e.g., `BASE_URL`, `REFRESH_TOKEN_URL`)

### Common Commands

- Run tests: `npm test`
- Run linter: `npm run lint`
- Run linter with auto-fix: `npm run lint -- --fix` (use this when checking generated code)
- Run type checks: `npm run typecheck`
- Start development server: `npm start`

## Testing

- Write unit tests using Jest and React Native Testing Library.
- Always import testing utilities from `@/tests` instead of directly from `@testing-library/react-native` (e.g.,
  `import { render, screen, fireEvent } from '@/tests';`)
- Write unit tests for utilities and complex components
- The test file should be named like the component file but with the .test.tsx extension (e.g., ComponentName.test.tsx)
- Do not write unit tests for simple components that only show data

## General Guidelines

1. **Always use existing patterns** - Check `/docs/` for project-specific patterns
1. **Follow naming conventions** - camelCase for files, PascalCase for components
1. **Import from correct locations** - Use project's custom hooks, not library directly
1. **Write tests** - Every new component/hook should have tests

## Documentation

- Maintain clear README with the following sections:
  - Setup ( how to install and run the project )
  - Usage ( listing all the commands and how to use them )
  - Stack ( the tech stack used in the project )
  - Folder Structure ( the folder structure of the project only the important ones inside src )
  - Contributing ( guidelines for contributing to the project )
  - License ( the license under which the project is released )
- Update docs when adding new patterns or abstractions
