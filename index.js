import os from 'os'
import fs from 'fs'

import inquirer from 'inquirer'
import loginFunction from './loginFunction.js'

const passPath = './lib/password.txt'

try {
  console.log(`---- WELCOME TO SYSTEM & PROGRAM STATUS CHECKER ----
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
      const hostName = os.hostname().split('-', 1)[0].split('.').join(' ')
      if (answers.username === hostName) {
        if (!fs.existsSync(passPath)) {
          const { password } = answers
          fs.writeFileSync(passPath, password, { flag: 'w' })
          console.log(`
            Login Succesfully
            `)
          loginFunction()
        } else {
          const savePassword = fs.readFileSync(passPath).toString()
          if (answers.password === savePassword) {
            console.log(`
            Login Succesfully
            `)
            loginFunction()
          }
        }
      } else {
        throw new Error('Invalid Host Name')
      }
    })
} catch (error) {
  console.error(error.message)
}
