import ReactDom from "react-dom/client";
import SimpleFeedbackWidget from "./components/WidgetFaces";

export const normalizeAttributes = (attribute) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

class WidgetFacesWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes();
    const root = ReactDom.createRoot(this.shadowRoot);
    root.render(<SimpleFeedbackWidget {...props} />);
  }

  getPropsFromAttributes() {
    const props = {};
    for (const { name, value } of this.attributes) {
      const normalizedName = normalizeAttributes(name);
      if (normalizedName === "allowedRoutes") {
        // Parse the allowedRoutes string into an array
        props[normalizedName] = value.split(",").map((route) => route.trim());
      } else if (normalizedName === "displayAfter") {
        // Parse displayAfter as a number
        props[normalizedName] = parseInt(value, 10);
      } else {
        props[normalizedName] = value;
      }
    }
    return props;
  }
}

export default WidgetFacesWebComponent;
