import os from 'os'
import fs from 'fs'

import inquirer from 'inquirer'

const passPath = '/lib/password.txt'

try {
  console.log(`----WELCOME TO STATUS & PROGRAM STATUS CHECKER----
Login:`)
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter your username:',
        name: 'username',
      },
      {
        type: 'password',
        message: 'Enter your password:',
        name: 'password',
      },
    ])
    .then((answers) => {
    // Check if the username and password are correct
      const hostName = os.hostname().split('-', 1)[0].split('.').join(' ')
      if (answers.username === hostName) {
        if (!fs.existsSync(passPath)) {
          const { password } = answers
          fs.writeFileSync(passPath, password, { flag: 'w' })
          console.log('Login succesfully 1')
        } else {
          const savePassword = fs.readFileSync(passPath)
          if (answers.password === savePassword) {
            console.log('Login succesfully 2')
          }
        }
      } else {
        console.log('Invalid Host Name')
        process.exit(1)
      }
    })
} catch (error) {
  console.error(error.message)
}
