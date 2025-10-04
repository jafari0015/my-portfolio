export default {
  name: "iconPlatform",
  type: "document",
  title: "Icon Information",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "text",
      type: "string",
      title: "Text"
    },
    {
      name: "link",
      type: "url",
      title: "Link",
      description: "Optional: add a URL if applicable"
    },
    {
      name: "icon",
      type: "string",
      title: "Icon",
      description: "Use the icon name to render in frontend"
    },
    {
      name: "target",
      type: "string",
      title: "Target",
      description: "Use '_blank' if it should open in new tab"
    }
  ]
};
