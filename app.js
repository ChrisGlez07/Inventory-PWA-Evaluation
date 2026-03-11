if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW: Registrado', reg))
            .catch(err => console.warn('SW: Error', err));
    });
}

const form = document.getElementById('form-inventario');
const inputNombre = document.getElementById('nombreProducto');
const inputCantidad = document.getElementById('cantidadProducto');
const statusDiv = document.getElementById('status');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = inputNombre.value.trim();
    const cantidad = inputCantidad.value.trim();

    if (nombre !== '' && cantidad !== '') {
        guardarEnDB(nombre, cantidad);
        
        form.reset();
        inputNombre.focus();
    }
});

window.addEventListener('online', () => {
    statusDiv.textContent = 'Online';
    statusDiv.className = 'status online';
});

window.addEventListener('offline', () => {
    statusDiv.textContent = 'Offline Mode';
    statusDiv.className = 'status offline';
});
