# Git and Conventional Commits Instructions

This project uses **Conventional Commits** specification enforced by `@commitlint/config-conventional`. All commit
messages must follow this format:

## Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Required Types

- **`feat:`** - A new feature for the user
- **`fix:`** - A bug fix for the user
- **`docs:`** - Documentation only changes
- **`style:`** - Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **`refactor:`** - A code change that neither fixes a bug nor adds a feature
- **`perf:`** - A code change that improves performance
- **`test:`** - Adding missing tests or correcting existing tests
- **`build:`** - Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **`ci:`** - Changes to CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **`chore:`** - Other changes that don't modify src or test files
- **`revert:`** - Reverts a previous commit

## Breaking Changes

- Add `!` after the type/scope to indicate a breaking change: `feat!:` or `feat(scope)!:`
- Include `BREAKING CHANGE:` in the footer with description

## Examples

**Feature commits:**

```
feat(XX-123): add user authentication
feat(auth/XX-456): implement JWT token refresh
feat(XX-789)!: change API response structure
```

```
feat: add user authentication
feat(auth): implement JWT token refresh
feat!: change API response structure
```

**Bug fix commits:**

```
fix(XX-123): resolve memory leak in image cache
fix(ui/XX-456): correct button alignment on mobile
fix(XX-789): prevent crash when user data is null
```

```
fix: resolve memory leak in image cache
fix(ui): correct button alignment on mobile
fix: prevent crash when user data is null
```

**Documentation commits:**

```
docs: update installation instructions
docs(api): add authentication examples
docs: fix typos in README
```

**Style/formatting commits:**

```
style: format code with prettier
style(components): fix eslint warnings
style: remove trailing whitespaces
```

**Refactoring commits:**

```
refactor(XX-123): extract validation logic to utils
refactor(hooks/XX-456): simplify useAuth implementation
refactor(XX-789): rename useTheme to useStyles
```

```
refactor: extract validation logic to utils
refactor(hooks): simplify useAuth implementation
refactor: rename useTheme to useStyles
```

**Performance commits:**

```
perf: optimize image loading performance
perf(list): implement virtual scrolling
perf: reduce bundle size by lazy loading
```

**Test commits:**

```
test(XX-123): add unit tests for auth service
test(components/XX-456): increase Button test coverage
test(XX-789): fix flaky integration tests
```

**Build/CI commits:**

```
build(XX-123): update expo to version 51
build(XX-456): bump react-native to 0.74
ci(XX-789): add automated testing workflow
ci(XX-321): fix deployment pipeline
```

**Chore commits:**

```
chore: update dependencies
chore(config): update eslint rules
chore: clean up unused imports
```

## Task/Issue Number Convention

**Recommended practice**: Include task or issue numbers in the scope parameter for better tracking and traceability.

### Format Examples

```
<type>(<issue-number>): <description>
<type>(<area>/<issue-number>): <description>
<type>(<issue-number>)!: <description>  # for breaking changes
```

### Pattern Examples

```
feat(XX-123): add user authentication
fix(ui/XX-456): correct button alignment
build(XX-789): update dependencies
chore(config/XX-321): update eslint rules
```

### Benefits

- **Traceability**: Links commits directly to project management tools
- **Context**: Provides immediate context about the work being done
- **Automation**: Enables automated workflows and reporting
- **History**: Makes git history more informative and searchable

## Rules and Best Practices

1. **Type is mandatory** - Every commit must start with a valid type
2. **Lowercase only** - Use lowercase for type, scope, and description
3. **No period** - Don't end the description with a period
4. **Imperative mood** - Use imperative present tense ("add" not "added" or "adds")
5. **Limit length** - Keep the first line under 100 characters
6. **Scope conventions** - Use scope to specify:
   - **Area of change**: `auth`, `ui`, `api`, `components`, etc.
   - **Task/Issue number**: `XX-123`, `PROJ-456`, etc. (recommended for tracking)
   - **Dependencies**: `deps` for dependency updates
7. **Reference issues** - Include issue numbers in scope (preferred) or body/footer when applicable

## Multi-line Commit Examples

```
feat(auth/XX-123): implement social login

Add support for Google and Facebook authentication
using OAuth 2.0 flow. This includes:

- Google Sign-In integration
- Facebook Login SDK setup
- Unified user profile handling
- Automatic account linking

Closes issue `#123`
```

```
fix(api/XX-456)!: change user ID format from number to string

BREAKING CHANGE: User IDs are now strings instead of numbers.
This affects all API endpoints that accept user IDs as parameters.

Migration guide:
- Update client code to handle string IDs
- Run database migration script
- Update API documentation

Fixes issue `#456`
```

## Validation

The project uses `@commitlint/config-conventional` to automatically validate commit messages. Invalid commits will be
rejected. Common validation errors:

- Missing type: `❌ "update readme"` → `✅ "docs: update readme"`
- Wrong case: `❌ "Feat: add login"` → `✅ "feat: add login"`
- Period in description: `❌ "fix: resolve bug."` → `✅ "fix: resolve bug"`
- Past tense: `❌ "feat: added login"` → `✅ "feat: add login"`
