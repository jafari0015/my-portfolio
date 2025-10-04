import { defineType, defineField, SchemaTypeDefinition } from "sanity";

const contact: SchemaTypeDefinition = defineType({
  name: "contact",
  title: "Contact Message",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime", readOnly: true }),
  ],
});

export default contact;
    