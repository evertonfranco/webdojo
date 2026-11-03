import { defineConfig } from 'cypress'
import { deleteUserByEmail } from './cypress/support/database.js'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      on('task', {
        deleteUser(email) {
          return deleteUserByEmail(email)
        }
      })
    },
    baseUrl: 'http://localhost:3333'
  },
})