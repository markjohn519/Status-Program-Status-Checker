import os from 'os'

import inquirer from 'inquirer'

export default function loginFunction() {
  function promptUser() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'option',
        message: `Choose one number from the option below:
1: Monitor the CPU usage
2: Monitor the Memory usage
3: Monitor Percentage consume in Storage
4: Free Storage in Megabyte
5: Total Storage in Gegabyte
6: Exit
`,
      },
    ]).then((answers) => {
      switch (answers.option) {
      case '1': {
        const usage = process.cpuUsage()
        const threshold = 100000
        console.log(`CPU usage: user = ${usage.user} / system = ${usage.system} / threshold = ${threshold}`)
        if (usage.user > threshold || usage.system > threshold) {
          console.log(`CPU usage exceeded threshold
          `)
        } else {
          console.log(`CPU usage is within threshold
        `)
        }
        promptUser()
        break
      }
      case '2': {
        const memory = process.memoryUsage()
        const threshold = 1000000000
        console.log(`Memory usage: rss = ${memory.rss} / heapTotal = ${memory.heapTotal} / heapUsed = ${memory.heapUsed} / external = ${memory.external} / threshold = ${threshold}`)
        if (memory.heapUsed > threshold) {
          console.log(`Memory usage exceeded threshold
          `)
        } else {
          console.log(`Memory usage is within threshold
`)
        }
        promptUser()
        break
      }
      case '3': {
        const totalMemory = os.totalmem()
        const usedMemory = totalMemory - os.freemem()
        const percentageConsumed = Math.round((usedMemory / totalMemory) * 100)

        console.log(`Percentage of memory consumed: ${percentageConsumed}%
        `)

        promptUser()
        break
      }
      case '4': {
        const freeMemoryInMB = os.freemem() / 1024 / 1024
        const roundedFreeMemory = Math.round(freeMemoryInMB * 100) / 100

        console.log(`Total Free Storage: ${roundedFreeMemory}mb
      `)
        promptUser()
        break
      }
      case '5': {
        console.log(`Total Storage Capacity: ${os.totalmem() / 1024 / 1024 / 1024}gb
        `)
        promptUser()
        break
      }
      case '6': {
        console.log('You exit the program')
        return
      }
      default: {
        console.log('Invalid Option try again')
        promptUser()
      }
      }
    })
  }

  promptUser()
}
