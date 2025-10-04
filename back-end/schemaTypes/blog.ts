import { type SchemaTypeDefinition, defineType, defineField } from "sanity";

const blog = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
    }),
    defineField({
      name: "techs",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "date",
      title: "Published Date",
      type: "datetime",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
        },
        {
          type: "code",
          title: "Code Block",
          options: {
            language: "javascript",
            withFilename: true,
          },
        },
      ],
    }),
  ],
});

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog], 
};

export default blog;
