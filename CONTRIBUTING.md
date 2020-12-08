# Contribution Guide

## Required Learning

- [TailwindCSS](https://tailwindcss.com)
- [Next.js](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website)

## Recommended Learning

- [React Context, Hooks, and State Management](https://kentcdodds.com/blog/application-state-management-with-react/)

## Documentation Guideline

### React Components and Props

All components and their props should be documented in the format expected by [React Docgen Typescript](https://kentcdodds.com/blog/application-state-management-with-react/). This auto-generates docs for our Storybook.

A well-documented component might look like:

```tsx
type Props = {
	/** The button's content */
	children: ReactNode

	/** Whether the button should show a loading spinner */
	loading?: Boolean
}

/**
 *	A really special button that orders pizza when you click on it.
 */
function SuperCoolButton({ children, loading }: Props) {
	return <button>...</button>
}
```

### Everything else

Should be well-typed with Typescript and documented according to JSDoc standards.a
