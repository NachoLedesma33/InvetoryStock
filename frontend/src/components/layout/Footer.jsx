export default function Footer() {
  return (
    <footer className="text-white bg-gray-800">
      <div className="container flex flex-col items-center justify-between px-4 py-6 mx-auto md:flex-row">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Fake Store. Todos los derechos reservados.
        </p>
        <div className="flex mt-4 space-x-4 md:mt-0">
          <a
            href="#"
            className="text-sm text-gray-400 transition duration-300 hover:text-white"
          >
            Política de privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
