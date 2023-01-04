import os from 'os'
import fs from 'fs'

import inquirer from 'inquirer'

const passPath = './lib/password.txt'

function loginFunction() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'option',
      message: `Choose from the option below:
1: Monitor the CPU usage
2: Monitor the Memory usage
3: Monitor Percentage consume in Storage
4: Free Storage in Megabyte
5: Total Storage in Gegabyte
`,
    },
  ]).then((answers) => {
    switch (answers.option) {
    case '1': {
      const usage = process.cpuUsage()
      console.log(`CPU usage: user = ${usage.user}, system = ${usage.system}`)
      const threshold = 100000
      if (usage.user > threshold || usage.system > threshold) {
        console.log('CPU usage exceeded threshold')
      } else {
        console.log('CPU usage is within threshold')
      }
      break
    }
    case '2': {
      // do something for option 2
      break
    }
    case '3': {
      // do something for option 3
      break
    }
    case '4': {
      // do something for option 4
      break
    }
    case '5': {
      // do something for option 5
      break
    }
    default: {
      console.log('Invalid option')
    }
    }
  })
}

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
    // Check if the username and password are correct
      const hostName = os.hostname().split('-', 1)[0].split('.').join(' ')
      if (answers.username === hostName) {
        if (!fs.existsSync(passPath)) {
          const { password } = answers
          fs.writeFileSync(passPath, password, { flag: 'w' })
          console.log('Login succesfully 1')
          loginFunction()
        } else {
          const savePassword = fs.readFileSync(passPath).toString()
          if (answers.password === savePassword) {
            console.log('Login succesfully 2')
            loginFunction()
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
