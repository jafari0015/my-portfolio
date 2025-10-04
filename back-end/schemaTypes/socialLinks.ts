export default {
  name: "socialLink",
  type: "document",
  title: "Social Link",
  fields: [
    {
      name: "icon",
      type: "string",
      title: "Icon",
    },
    {
      name: "url",
      type: "url",
      title: "URL",
    },
    {
      name: "color",
      type: "string",
      title: "Color (Tailwind class or hex)",
    },
    {
      name: "bgColor",
      type: "string",
      title: "Background Color (Tailwind class or hex)",
    },
  ],
};
