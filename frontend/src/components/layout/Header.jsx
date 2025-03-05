export default function Header() {
    return (
      <header className="shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="container flex items-center justify-between px-4 py-4 mx-auto">
          <h1 className="text-2xl font-bold text-white">Store App(From fake Store api)</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="text-white transition duration-300 hover:text-gray-200"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/Products"
                  className="text-white transition duration-300 hover:text-gray-200"
                >
                  Productos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white transition duration-300 hover:text-gray-200"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  
