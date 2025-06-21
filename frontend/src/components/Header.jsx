import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import logoImg from '../assets/logo.png'


function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("Inicio")
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { id: "Inicio", label: "Inicio" },
    { id: "Prediccion", label: "Prediccion"},
  ]

  // Maneja el scroll para sombrear header y detectar sección activa
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      for (const item of navItems) {
        const section = document.getElementById(item.id)
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id) => {
    setIsMenuOpen(false)
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#66021f] shadow-md py-2" : "bg-[#66021f]/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <img src={logoImg} alt="Logo" className="h-14 w-auto" />

        {/* Navegación escritorio */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`text-sm font-medium transition-colors ${
                activeSection === id
                  ? "text-[#E8C0C9] font-semibold border-b-2 border-secondary"
                  : "text-gray-200 hover:text-[#E8C0C9]"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Menú móvil: ícono */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-800 hover:text-black" />
          ) : (
            <Menu className="h-6 w-6 text-gray-800 hover:text-black" />
          )}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#E8C0C9] shadow-lg">
          <nav className="flex flex-col py-4">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`py-3 px-6 text-left text-sm font-medium ${
                  activeSection === id
                    ? "text-[#66021f] border-l-4 border-[#66021f] font-semibold"
                    : "text-gray-700 hover:text-[#66021f]"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export { Header }
