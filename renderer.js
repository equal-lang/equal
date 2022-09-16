const information = document.getElementById("info");
information.innerText = `Chrome: ${versions.chrome()}\nNode.js: ${versions.node()}\nElectron: ${versions.electron()}`

window.versions.ping()
.then((res) => console.log(res))
.catch((err) => console.error(err))
