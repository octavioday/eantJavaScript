// La clase es como un plano donde se define la arquitectura
class Producto {

	// CONSTRUCTOR

	constructor(n, s, p, d = true){  // En el caso de que d no este definido, asignale true
		// Atributos
		this.nombre = n
		this.stock	= s
		this.precio = p
		this.disponible = d		
	}


	// PROPIEDADES L/E (Lectura/Escritura - getters & setters)

	get Precio(){ // Si no tiene un value es un get
		return "$" + (this.precio * 1.21).toFixed(2) // Que muestre el dato con dos decimales unicamente
	}

	set Precio(value){ // Si tiene value es un set pq esta recibiendo un dato
		if( value == "" || value == null || value == undefined || isNaN(value) == true ) {
			console.error("ERROR. Valor ingresado no válido")
		} else {
			this.precio = value  // Puedo actualizar el precio
		}	
	}

	set Disponible (value){ // Se usan las mayúsculas para los metodos de uso público y con minúscula los privados (como el constructor)

		if( value == this.disponible ) {
			alert(`Ya esta en ${this.disponible}`)
			return
		}

		let estado = value ? "habilitar" : "deshabilitar"

		if(confirm(`Desea ${estado} el producto "${this.nombre}"`)){
			this.disponible = value
		}
	}


	// METODOS DE INSTANCIA

	Mostrar(){

		if(this.disponible){ 
			let color = "green" 
		} else {
			let color = "red"
		}

		// Como creamos la variable con let, quedo dentro del if y no llego al document.write. Para eso usamos la siguiente sentencia que reemplaza al if

		let color = ( this.disponible ) ? "green" : "red" // No hace falta especificar el if ni el else ni el == true
		document.write(`<p style="color:${color}">Hay <strong>${this.stock}</strong> uni. de <strong>${this.nombre}</strong> que valen <em>ARG ${this.precio}<em> c/u</p>`)
	}

	aplicarDescuento(valor){
		let importe = (this.precio * valor) / 100

		this.precio = this.precio - importe
	}


	// METODOS DE CLASE (estáticos)

	static parse(json){
		
		let datos = JSON.parse(json) // De JSON a object
		// console.log("Estos son los datos")
		// console.log( datos )

		if( datos instanceof Array ){ // Un array es un objeto que almacena objetos
			// debugger // puedo ejecutarlo para frenar el codigo e ir ejecutandolo paso por paso manualmente


			let productos = new Array() // Creo un array vacío para almacenar los objetos "producto"

			datos.forEach( (item) => { // Estoy usando la arrow function que reemplaza a la function. Recirri ek arra de Ibject para instanciar objetos Producto
				// console.log("El siguiente object deberá convertir	se en producto:")
				// console.log(item.nombre)

				let producto = new Producto(item.nombre, item.stock, item.precio, item.disponible) // Instanciar un objeto Producto con los datos de cada Object
				productos.push(producto) // Metodo de instancia push del objeto productos que es de tipo array. Guardar el objeto Producto instanciado en el Array nuevo

				// console.log(producto)

			})

			return (productos)  // Retornar el nuvo array una vez que se hayan instanciado todos los objetos Producto

		} else if ( datos instanceof Object){
			let producto = new Producto(datos.nombre, datos.stock, datos.precio, datos.disponible)
		} else {
			console.error("No convierto nada en Producto")
		}
	}
}