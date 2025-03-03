export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Fake Store. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  }
  