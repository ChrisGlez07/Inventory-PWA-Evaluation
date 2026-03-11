let db;
const request = indexedDB.open('InventarioDB', 1);


request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('productos')) {
        db.createObjectStore('productos', { keyPath: 'id', autoIncrement: true });
    }
};

request.onsuccess = (event) => {
    db = event.target.result;
    listarProductos();
};

function guardarEnDB(nombre, cantidad) {
    const transaction = db.transaction(['productos'], 'readwrite');
    const store = transaction.objectStore('productos');

    const nuevoProducto = {
        nombre: nombre,
        cantidad: parseInt(cantidad),
        fecha: new Date().toLocaleString()
    };

    const query = store.add(nuevoProducto);
    query.onsuccess = () => {
        listarProductos();
    };
}

function listarProductos() {
    const listaUl = document.getElementById('lista-inventario');
    if (!listaUl) return;
    
    listaUl.innerHTML = ''; 

    const transaction = db.transaction(['productos'], 'readonly');
    const store = transaction.objectStore('productos');
    const cursorRequest = store.openCursor();

    cursorRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${cursor.value.nombre}</strong> - Cantidad: ${cursor.value.cantidad}
                    <br><small>${cursor.value.fecha}</small>
                </div>
            `;
            listaUl.appendChild(li);
            cursor.continue();
        }
    };
}