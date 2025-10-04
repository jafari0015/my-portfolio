export default {
  name: "work",
  type: "document",
  title: "Work / Project",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Project Title",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "image",
      type: "image",
      title: "Project Image",
      options: { hotspot: true },
    },
    {
      name: "link",
      type: "url",
      title: "Live Project URL",
    },
    {
      name: "github",
      type: "url",
      title: "Github Repository (optional)",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "Web Development", value: "web" },
          { title: "Mobile App", value: "mobile" },
          { title: "UI/UX", value: "uiux" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
    },
    {
      name: "date",
      type: "date",
      title: "Project Date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    },
    {
      name: "techStack",
      type: "array",
      title: "Tech Stack",
      of: [{ type: "string" }],
    },
  ],
};
