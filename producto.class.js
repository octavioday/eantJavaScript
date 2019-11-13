class Producto {

	// CONSTRUCTOR

	constructor(id, n, s, p, i, d = true){
		// Atributos
		this.ID = id
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

	  set Precio(value){

	    if( isNaN(value) != true ){
	      this.precio = value
	    } else {
	      console.error("ERROR: Valor ingresado NO válido")
	    }

	  }

	set Disponible (value){ // Se usan las mayúsculas para los metodos de uso público y con minúscula los privados (como el constructor)

		let accion = value ? "habilitar" : "deshabilitar"

		if(confirm(`Desea ${accion} el producto "${this.nombre}"`))	this.disponible = value

		this.sincronizar()
	}


	// METODOS DE INSTANCIA

	Mostrar(selector){ 

		let estilo = this.disponible ? "bg-white text-dark" : "bg-dark text-light"

		// Manipulación de estructura
		this.vDOM.classList.add("col-lg-4","col-md-6","mb-4","producto",) // <article class="col-lg-4 col-md-6 mb-4 producto"></article>

		this.vDOM.id = `prod-${this.ID}`

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
					<button class="btn btn-primary btn-descuento">Aplicar descuento</button>
					<p class="card-text">${this.stock} unid.</p>
				</div>
			</div>`

		// Manipulación de comportamiento
		this.vDOM.querySelector("button").onclick = (e) => { // si uso function, el this es el button no el producto (superior)

			this.Disponible = !this.disponible // usamos el seter

			this.Precio = prompt("Ingrese nuevo precio")

			this.Mostrar() // this es el objeto padre "El producto"

			console.log( e.target) // el objeto que provocó el evento
		}
/*
		this.vDOM.querySelector(".btn-descuento").onclick = () => {
			let valor = prompt(`Indique el porcentaje de descuento para ${this.nombre}`)
			this.aplicarDescuento(valor)
			this.Mostrar()
		}
*/

		this.vDOM.querySelector(".btn-descuento").onclick = this.aplicarDescuento.bind( this ) // "Enlazar" Para que cuando quiera ejecutar la isntancia apliarDescuento el this no sea el boton sino el objeto

		
		this.vDOM.querySelector("img").onclick = () => {
			this.imagen = prompt("Ingrese URL de imagen")
			this.Mostrar()
			this.sincronizar()

		}

		if(this.state.anexado == false){
	        // Anexarlo en la interfaz
			document.querySelector( selector ).appendChild( this.vDOM )	
			this.state.anexado = true		
		}

		//this.sincronizar() // Para enviarlo al local storage

	}

	aplicarDescuento(valor = false){

		// valor = valor == null ? prompt(`Indique el porcentaje de descuento para ${this.nombre}`) : valor

		valor = isNaN(valor) ? prompt(`Indique el porcentaje de descuento para ${this.nombre}`) : valor

		let importe = (this.precio * valor) / 100

		this.precio = this.precio - importe

		this.Mostrar()
		this.sincronizar()
	}


	sincronizar(){
	    //¿como?
	    let storage = JSON.parse( localStorage.getItem("PRODUCTOS") ) //<-- de JSON a Object

	    //let foundItem = storage.find(item => item.idProducto == this.ID)
	    let foundIndex = storage.findIndex(item => item.idProducto == this.ID)

	    //storage[foundIndex]. //<-- { idProducto:???,Nombre:"???",Precio:???,Marca:"???",Categoria:"???",Presentacion:"???",Stock:???,Imagen:"???",Disponible:???}

	    storage[foundIndex].Precio = this.precio
	    storage[foundIndex].Imagen = this.imagen
	    storage[foundIndex].Disponible = this.disponible

	    console.log( storage[foundIndex] )

	    localStorage.setItem("PRODUCTOS", JSON.stringify(storage) ) //<-- de Object a json
	}

	// METODOS DE CLASE (estáticos)

	static parse(json){
		
	    let datos = (typeof json == "string") ? JSON.parse(json) : json

	    if( datos instanceof Array ){

	      //1) Recorrer el Array de Object para instanciar objetos Producto y retornarlos
	      return datos.map(item => new Producto(item.idProducto, item.Nombre, item.Stock, item.Precio, item.Imagen, item.Disponible) ) //2) <-- Instanciar un objeto Producto con los datos de cada Object

	    } else if( datos instanceof Object ){

	      return new Producto(datos.idProducto, datos.Nombre, datos.Stock, datos.Precio, datos.Imagen, datos.Disponible)

	    } else {
	      console.error("Ya fue... no convierto nada en Producto")
	    }
	}
}