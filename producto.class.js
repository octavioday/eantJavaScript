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

		this.vDOM = document.createElement("article") // <article></article>

		this.state = { // Para hacerle un seguimiento al producto
			anexado : false,
			version : 0
		}
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

		let accion = value ? "habilitar" : "deshabilitar"

		if(confirm(`Desea ${accion} el producto "${this.nombre}"`))	this.disponible = value
	}


	// METODOS DE INSTANCIA

	Mostrar(selector){ // Ejemplo "#productos-destacados"

/*	let ficha = document.querySelector(".producto").cloneNode(true)

			ficha.querySelector(".card-title a").innerText = this.nombre
			ficha.querySelector(".card-body h5").innerText = this.Precio // Con mayúscula uso el geter
			ficha.querySelector(".card-img-top").src = this.imagen

			ficha.classList.remove("d-none")

		document.querySelector("#productos-destacados").appendChild( ficha )
*/

		let estilo = this.disponible ? "bg-white text-dark" : "bg-dark text-light"

		// Manipulación de estructura
		this.vDOM.classList.add("col-lg-4","col-md-6","mb-4","producto",) // <article class="col-lg-4 col-md-6 mb-4 producto"></article>


		// Manipulación de contenido
		this.vDOM.innerHTML = 					
			`<div class="card h-100 ${estilo}">
				<a href="#">
					<img class="card-img-top" src="${this.imagen}" alt="${this.nombre}">
	  			</a>
				<div class="card-body">
					<h4 class="card-title">
	  					<a href="#">${this.nombre}</a>
					</h4>
					<h5 class="btn btn-warning m-0">${this.Precio}</h5>
					<button class="btn btn-danger">${ this.disponible ? "Desactivar" : "Activar"}</button>
					<p class="card-text">${this.stock} unid.</p>
				</div>
			</div>`

		// Manipulación de comportamiento
		this.vDOM.querySelector("button").onclick = (e) => { // si uso function, el this es el button no el producto (superior)

		/*
			let accion = this.disponible ? "deshabilitar" : "habilitar"

			let pregunta = `Esta seguro que desea ${accion} el producto ${this.nombre}?`

			if ( confirm(pregunta) ) this.disponible = !this.disponible // no hace falta el == true ni las llaves pq es la unica validacion que hace
		*/

			this.Disponible = !this.disponible // usamos el seter

			this.Precio = prompt("Ingrese nuvo precio")

			this.Mostrar() // this es el objeto padre "El producto"

			console.log( e.target) // el objeto que provocó el evento
			
			}

		if(this.state.anexado == false){
	        // Anexarlo en la interfaz
			document.querySelector( selector ).appendChild( this.vDOM )	
			this.state.anexado = true		
		}

	}

	aplicarDescuento(valor){
		let importe = (this.precio * valor) / 100

		this.precio = this.precio - importe
	}


	// METODOS DE CLASE (estáticos)

	static parse(json){
		
		// let datos = JSON.parse(json) --- No haxce falta parsearlo pq lo estoy haciendo con el método fetch

		let datos = (typeof json == "string") ? JSON.parse(json) : json // Método ternario

		if( datos instanceof Array ){ 

			return datos.map( item => new Producto(item.Nombre, item.Stock, item.Precio, item.Imagen) ) // Esto simplifica el proceso de la clase 3.

		} else if ( datos instanceof Object){ // En el caso que la API me diera los datos de un solo producto
			let producto = new Producto(datos.Nombre, datos.Stock, datos.Precio, datos.disponible, datos.Imagen)
			console.error("No convierto nada en Producto")
		}
	}
}