import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveClass(className: string): R
      toHaveStyle(style: string | Record<string, unknown>): R
      toHaveTextContent(text: string | RegExp): R
      toBeVisible(): R
      toBeChecked(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toBeEmpty(): R
      toBeEmptyDOMElement(): R
      toBeInvalid(): R
      toBeRequired(): R
      toBeValid(): R
      toContainElement(element: HTMLElement): R
      toContainHTML(html: string): R
      toHaveAccessibleDescription(description?: string | RegExp): R
      toHaveAccessibleName(name?: string | RegExp): R
      toHaveDescription(description?: string | RegExp): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toHaveErrorMessage(message?: string | RegExp): R
      toHaveFocus(): R
      toHaveFormValues(values: Record<string, unknown>): R
      toHaveValue(value?: string | number | string[]): R
      toHaveRole(role: string): R
    }
  }
}