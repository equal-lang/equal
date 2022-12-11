## Build Equal & CLI
### Build
```
npm run build-cli
```
### Test
#### Equal only
```
npm run test
```
#### CLI too
```
npm run start-cli
```
- First 15 fib numbers should be printed to the console
- Pressing ```F5``` in VSCode does the same thing

## Build exe
### Build
```
npm run build-gui
npm run dist-gui
```
### Test
#### Electron app only
```
npm run start-gui
```
#### Exe too
- Open dist/equal 0.0.1.exe

## Build website
### Build
```
npm run build-cli
npm run build-website
```
### Test
#### Start once
```
npm run start-website
```
#### Watch for changes
```
npm run watch-website
```
- ```npm run build-website``` to rebuild and restart server automatically

## Build API
### Build
```
npm run setup-api
```

## Build All
```
npm run make
```