const form = document.getElementById("formCompra");
const btnComprar = document.getElementById("btnComprar");

form.addEventListener("submit", comprarEntradas);
        
// Conts para el formulario de compra
async function comprarEntradas(event) {

    event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    const nombre = document.getElementById('nombreUser').value;
    const apellido = document.getElementById('apellidoUser').value;
    const email = document.getElementById('emailUser').value;
    const cantidadSelect = document.getElementById('cantUser').value;

    // Validar que los campos no estén vacíos
    if (!nombre || !apellido || !email || !cantidadSelect) {
        alert('Por favor, completa todos los campos antes de proceder al pago.');
        return;
    }


    const cantidadEntradas = parseInt(cantidadSelect);
    
    
    const compraDTO = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        cantidadEntradas: cantidadEntradas
    };

    try {
        // Bloquear botón + feedback UX
        btnComprar.disabled = true;
        btnComprar.innerText = "Procesando pago...";
        const response = await fetch('https://nonmodal-abandonable-vanesa.ngrok-free.dev/api/compras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(compraDTO)
        });

    if (!response.ok) {
            throw new Error("Error en backend");
        }
    
    const data = await response.json();
    console.log(`Comra procesada: ${data}`);

    // Aquí puedes agregar la lógica para procesar la compra, como enviar los datos a un servidor o mostrar un mensaje de confirmación.
    alert(`¡Gracias por tu compra, ${nombre} ${apellido}! Has comprado ${cantidadEntradas}. Se enviará una confirmación a ${email}.`);

    // Redirección a Mercado Pago
    window.location.href = data.checkoutUrl;

    }catch(error){
        console.error('Error al procesar la compra:', error);
        alert("No se pudo procesar la compra");
        // Restaurar botón
        btnComprar.disabled = false;
        btnComprar.innerText = "Proceder al Pago";
    }
}