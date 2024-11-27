const { spawnSync, spawn } = require('child_process')
const { existsSync, writeFileSync } = require('fs')
const path = require('path')

const SESSION_ID = 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUMveU5hMzZuQ1Q0emlkdXhLMTcwRWJwblowUnVyczQ3eFpyNGloOEgwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidFhUWmdLMUFZTFg1UFB4a0tyWDN6dHJzY21FTFV6UUhrTjNzMHJQNDNXYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXRjkrZWJGOXNuTkFhTFpEanhzeDI3OUhFM210U2J1aFlVZDYvQ2k3SkdzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSTZWVmUzK1lHVTZYZDNLcUlkRmh3ZE5Xb2U1alBCdzhkMjhVdGtOaVZJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklFU2NmaEFpRFZYSk5YTjhydVlVdUxvN2NPMjBjS0tIY0tLYURjN0crblE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVoQW9VbEM1UGJaWEtQUkM1aXJUcVhNYjZzemZXSW93eTNSSnJmNXNrZ3M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0JndHhLWUhWclpRdVZTN2pnTXYxWC96YUtwUXRhaGtRN2tXT2VhZEIyZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaE9lTUFVK2V2Yk1Ec2JrMDA5dHFiSEx2TThnUjhkRXpGT2FzOHZQdXJtZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBkQXcrNXU5MDNuc1FaWXJlcjRYMzF3cWVSY0ZIK0Y5S3JwZ1RGN2g5Z01CeW53ZDU1cnlZQXFseTRBUHRkWWx1SzZ3YVQ3YXQvdlJ3QmUwZ3JpR2lBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzgsImFkdlNlY3JldEtleSI6IklJbDlWUTBPbTNZMlZ0U3hRcWNtNkRpdHc2dyt3azlCTnlwWUJvSm5nN0U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InR3aTJYc05fUjdDTXlpQmR5TENSdXciLCJwaG9uZUlkIjoiOWZjNWEyYTEtMWYzOC00MmRmLWI1YTgtNGU1MDdjNGZjNGE1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldtSGdONU1KSGZVeGMycEhkZDlnSnZTeCsvWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTcGg5cDFjV0Q3T0pCZmxsekdacWk5WjVtOVk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiOVBGNVZUVFEiLCJtZSI6eyJpZCI6IjUwOTMzOTA0MTc4OjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiY2hyc3RtYW5pbyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUDMrOE80R0VJTExucm9HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYkNSTWk5cjNJSk5sdGRjR2NIZEIvVW9vQ2NqM0pIQld6Umh6TWZ6UEZCYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoicTRkaTUvYU1iZ2NQL1pHc2RpWUFjS0Jub0EvQXRpenRwUm5nNEpsM25JdHBEbDBzVzQ2TTRaMDhkZFBnM0lEMnRXdGw1SkdGSzQ0ZmRYN2dlc1oyRHc9PSIsImRldmljZVNpZ25hdHVyZSI6Iit4bE13M2xSQ1JaY0FEcmRMQlBkK2ZXay9qTGJiK0VnNldBOVN2SHVqamxZSGRyWVJXdTBnOThmbXZaTk5zRFk5WkZYMG9rUW9aWXlFbHBDSUpRd2dnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5MzM5MDQxNzg6N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXd2tUSXZhOXlDVFpiWFhCbkIzUWYxS0tBbkk5eVJ3VnMwWWN6SDh6eFFYIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMyNzQ4Njg3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUYzbCJ9' // Edit this line only, don't remove ' <- this symbol

function startNode() {
  const child = spawn('node', ['index.js'], { cwd: 'levanter', stdio: 'inherit' })

  child.on('exit', (code) => {
    if (code === 102) {
      console.log('restarting...')
      startNode()
    }
  })
}

function startPm2() {
  const pm2 = spawn('pm2', ['start', 'index.js', '--name', 'levanter', '--attach'], {
    cwd: 'levanter',
    stdio: ['pipe', 'pipe', 'pipe'],
  })

  let restartCount = 0
  const maxRestarts = 5 // Adjust this value as needed

  pm2.on('exit', (code) => {
    if (code !== 0) {
      // console.log('pm2 failed to start, falling back to node...')
      startNode()
    }
  })

  pm2.on('error', (error) => {
    // console.error(`pm2 error: ${error.message}`)
    startNode()
  })

  // Check for infinite restarts
  if (pm2.stderr) {
    pm2.stderr.on('data', (data) => {
      const output = data.toString()
      if (output.includes('restart')) {
        restartCount++
        if (restartCount > maxRestarts) {
          // console.log('pm2 is restarting indefinitely, stopping pm2 and starting node...')
          spawnSync('pm2', ['delete', 'levanter'], { cwd: 'levanter', stdio: 'inherit' })
          startNode()
        }
      }
    })
  }

  if (pm2.stdout) {
    pm2.stdout.on('data', (data) => {
      const output = data.toString()
      console.log(output)
      if (output.includes('online')) {
        // console.log('Application is online.')
        restartCount = 0
      }
    })
  }
}

function installDependencies() {
  console.log('Installing dependencies...')
  const installResult = spawnSync(
    'yarn',
    ['install', '--force', '--non-interactive', '--network-concurrency', '3'],
    {
      cwd: 'levanter',
      stdio: 'inherit',
    }
  )

  if (installResult.error) {
    throw new Error(`Failed to install dependencies: ${installResult.error.message}`)
  }
}

function checkDependencies() {
  if (!existsSync(path.resolve('levanter/package.json'))) {
    console.error('package.json not found!')
    process.exit(1)
  }

  const result = spawnSync('yarn', ['check', '--verify-tree'], { cwd: 'levanter', stdio: 'inherit' })

  // Check the exit code to determine if there was an error
  if (result.status !== 0) {
    // console.error('Some dependencies are missing or incorrectly installed.')
    installDependencies()
  } else {
    // console.log('All dependencies are installed properly.')
  }
}

function installDependencies() {
  // console.log('Installing missing dependencies...')
  const result = spawnSync('yarn', ['install'], { cwd: 'levanter', stdio: 'inherit' });

  if (result.status === 0) {
    // console.log('Dependencies installed successfully.')
  } else {
    console.error('Failed to install dependencies.')
    process.exit(1);
  }
}

function cloneRepository() {
  console.log('Cloning the repository...')
  const cloneResult = spawnSync(
    'git',
    ['clone', 'https://github.com/lyfe00011/levanter.git', 'levanter'],
    {
      stdio: 'inherit',
    }
  )

  if (cloneResult.error) {
    throw new Error(`Failed to clone the repository: ${cloneResult.error.message}`)
  }

  const configPath = 'levanter/config.env'
  try {
    console.log('Writing to config.env...')
    writeFileSync(configPath, `VPS=true\nSESSION_ID=${SESSION_ID}`)
  } catch (err) {
    throw new Error(`Failed to write to config.env: ${err.message}`)
  }

  installDependencies()
}

if (!existsSync('levanter')) {
  cloneRepository()
  checkDependencies()
} else {
  checkDependencies()
}

startPm2()
