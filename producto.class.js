// La clase es como un plano donde se define la arquitectura
class Producto {

	// CONSTRUCTOR

	constructor(n, s, p, i, d = true){  // En el caso de que d no este definido, asignale true
		// Atributos
		this.nombre = n
		this.stock	= s
		this.precio = p
		this.imagen = i
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

		let ficha = document.querySelector(".producto").cloneNode(true)

			ficha.querySelector(".card-title a").innerText = this.nombre
			ficha.querySelector(".card-body h5").innerText = this.Precio // Con mayúscula uso el geter
			ficha.querySelector(".card-img-top").src = this.imagen

			ficha.classList.remove("d-none")

		document.querySelector("#productos-destacados").appendChild( ficha )
	}

	aplicarDescuento(valor){
		let importe = (this.precio * valor) / 100

		this.precio = this.precio - importe
	}


	// METODOS DE CLASE (estáticos)

	static parse(json){
		
		let datos = JSON.parse(json)

		if( datos instanceof Array ){ 

			return datos.map( item => new Producto(item.Nombre, item.Stock, item.Precio, item.Imagen) ) // Esto simplifica el proceso de la clase 3.

		} else if ( datos instanceof Object){ // En el caso que la API me diera los datos de un solo producto
			let producto = new Producto(datos.Nombre, datos.Stock, datos.Precio, datos.disponible, datos.Imagen)
			console.error("No convierto nada en Producto")
		}
	}
}