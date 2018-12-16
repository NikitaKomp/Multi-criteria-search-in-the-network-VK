import { app, BrowserWindow } from 'electron'
import open from 'open'
import normalizeUrl from 'normalize-url'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').
    join(__dirname, '/static').
    replace(/\\/g, '\\\\')
}

let mainWindow

const mainWinUrl = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

require('electron-debug')({ showDevTools: true })

function createMainWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 800,
    useContentSize: true,
    transparent: false,
    frame: true,
  })

  mainWindow.loadURL(mainWinUrl)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.openDevTools()

  // To open all links in external default application
  let handleRedirect = (e, url) => {
    if(url !== mainWindow.webContents.getURL()) {
      e.preventDefault()
      open(normalizeUrl(url, {sortQueryParameters: false}))
    }
  }
  mainWindow.webContents.on('will-navigate', handleRedirect)
  mainWindow.webContents.on('new-window', handleRedirect)
}

app.on('ready', () => {
  createMainWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

/**
 * Running background tasks here
 */