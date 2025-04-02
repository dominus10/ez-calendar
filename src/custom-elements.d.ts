declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["ez-datepicker"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
  interface HTMLElement {
    connectedCallback(): void;
  }
}
