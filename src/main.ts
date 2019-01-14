import { app, BrowserWindow } from 'electron';
import installExtension, {
    REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer';

let mainWindow: BrowserWindow|null = null;

const createMainWindow = async () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    const index_path = 'build/ui/index.html';
    mainWindow.loadFile(index_path);

    await installExtension(REACT_DEVELOPER_TOOLS);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', onClosed);
}

const onClosed = () => {
    mainWindow = null;
}

app.on('ready', createMainWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createMainWindow()
    }
});
