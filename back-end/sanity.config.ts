import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { codeInput } from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'portfolio-backend',

  projectId: '4cja3wup',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    codeInput()   
  ],

  schema: {
    types: schemaTypes,
  },
})
