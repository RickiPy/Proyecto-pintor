import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import PortfolioBanner from './components/PortfolioBanner'

/**
 * Componente principal de la aplicación
 * Gestiona el layout principal y el enrutamiento de la aplicación
 * @returns {JSX.Element} Aplicación completa
 */
function App() {
  // Estados para la gestión de la interfaz
  const [isMenuOpen, setIsMenuOpen] = useState(false) // Control del menú móvil
  const [selectedImage, setSelectedImage] = useState(null) // Control del modal de imagen
  const [showBudgetModal, setShowBudgetModal] = useState(false) // Control del modal de presupuesto
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  
  // Estado para el formulario de contacto y presupuesto
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: 'Pintura de Interiores',
    area: '',
    walls: '1-4',
    urgency: 'normal'
  })

  // Estado para el formulario de reseñas
  const [reviewData, setReviewData] = useState({
    name: '',
    role: '',
    rating: 5,
    comment: ''
  })

  // Datos de los servicios ofrecidos
  const services = [
    {
      title: "Pintura de Interiores",
      description: "Transformamos cualquier espacio interior con las últimas tendencias en color y acabados premium que duran años.",
      icon: "https://cdn-icons-png.flaticon.com/512/1186/1186715.png",
      features: ["Pintura antimanchas", "Acabados mate o brillante", "Colores personalizados"],
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000"
    },
    {
      title: "Pintura de Exteriores",
      description: "Protegemos y embellecemos la fachada de tu hogar con pinturas resistentes a la intemperie y rayos UV.",
      icon: "https://cdn-icons-png.flaticon.com/512/1186/1186714.png",
      features: ["Impermeabilización", "Protección UV", "Durabilidad garantizada"],
      image: "https://images.unsplash.com/photo-1595844730298-b960ff98fee0?q=80&w=1000"
    },
    {
      title: "Efectos Decorativos",
      description: "Creamos ambientes únicos con técnicas especiales y acabados artísticos que dan personalidad a tus espacios.",
      icon: "https://cdn-icons-png.flaticon.com/512/1186/1186716.png",
      features: ["Texturas personalizadas", "Efectos metalizados", "Diseños únicos"],
      image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?q=80&w=1000"
    },
    {
      title: "Restauración",
      description: "Devolvemos la vida a superficies dañadas con técnicas profesionales de restauración y reparación.",
      icon: "https://cdn-icons-png.flaticon.com/512/1186/1186717.png",
      features: ["Reparación de grietas", "Tratamiento de humedades", "Renovación completa"],
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000"
    }
  ]

  // Datos de la galería de imágenes
  const galleryImages = [
    {
      id: 1,
      title: "Renovación Sala Principal",
      category: "Interiores",
      before: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1000",
      after: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000"
    },
    {
      id: 2,
      title: "Fachada Moderna",
      category: "Exteriores",
      before: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1000",
      after: "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?q=80&w=1000"
    },
    {
      id: 3,
      title: "Dormitorio Principal",
      category: "Interiores",
      before: "https://images.unsplash.com/photo-1536349788264-1b816db3cc13?q=80&w=1000",
      after: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1000"
    },
    {
      id: 4,
      title: "Cocina Moderna",
      category: "Interiores",
      before: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1000",
      after: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000"
    }
  ]

  // Datos de testimonios
  const testimonials = [
    {
      id: 1,
      name: "Ana García",
      role: "Propietaria",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000",
      text: "Quedé impresionada con la calidad del trabajo. El equipo fue muy profesional y limpio, y el resultado final superó mis expectativas.",
      rating: 5
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Arquitecto",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000",
      text: "Como arquitecto, valoro mucho la atención al detalle. Su trabajo es impecable y siempre cumplen con los plazos establecidos.",
      rating: 5
    },
    {
      id: 3,
      name: "María Torres",
      role: "Diseñadora de Interiores",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000",
      text: "He trabajado con ellos en varios proyectos y siempre entregan un trabajo excepcional. Su experiencia en efectos decorativos es notable.",
      rating: 5
    }
  ]

  /**
   * Maneja el envío del formulario de contacto y presupuesto
   * @param {Event} e - Evento del formulario
   */
  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
    setShowBudgetModal(false)
    setSuccessMessage('¡Gracias por solicitar un presupuesto! Nos pondremos en contacto contigo pronto.')
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      service: 'Pintura de Interiores',
      area: '',
      walls: '1-4',
      urgency: 'normal'
    })
  }

  /**
   * Maneja el envío del formulario de reseñas
   * @param {Event} e - Evento del formulario
   */
  const handleReviewSubmit = (e) => {
    e.preventDefault()
    console.log('Reseña enviada:', reviewData)
    setShowReviewModal(false)
    setSuccessMessage('¡Gracias por compartir tu experiencia! Tu opinión es muy importante para nosotros.')
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
    setReviewData({
      name: '',
      role: '',
      rating: 5,
      comment: ''
    })
  }

  /**
   * Actualiza el estado del formulario cuando cambian los inputs
   * @param {Event} e - Evento del input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /**
   * Actualiza el estado del formulario de reseñas
   * @param {Event} e - Evento del input
   */
  const handleReviewInputChange = (e) => {
    const { name, value } = e.target
    setReviewData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
        {/* Header Fijo */}
        <div className="fixed top-0 left-0 right-0 z-50">
          {/* Banner de Portafolio */}
          <PortfolioBanner />

          {/* Barra de Navegación */}
          <nav className="bg-white/80 backdrop-blur-lg shadow-soft">
            <div className="container mx-auto py-4">
              {/* Contenedor de navegación */}
              <div className="flex items-center justify-between">
                {/* Logo */}
                <h1 className="text-2xl font-bold gradient-text">Pintor Profesional</h1>
                
                {/* Menú de Escritorio */}
                <div className="hidden md:flex space-x-8">
                  <a href="#inicio" className="nav-link">Inicio</a>
                  <a href="#servicios" className="nav-link">Servicios</a>
                  <a href="#galeria" className="nav-link">Galería</a>
                  <a href="#testimonios" className="nav-link">Testimonios</a>
                  <a href="#contacto" className="nav-link">Contacto</a>
                </div>

                {/* Botón de Menú Móvil */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-secondary-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* Botón de Contacto */}
                <button 
                  className="hidden md:flex btn btn-primary"
                  onClick={() => setShowBudgetModal(true)}
                >
                  Solicitar Presupuesto
                </button>
              </div>

              {/* Menú Móvil */}
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-secondary-100 shadow-soft"
                >
                  <div className="container py-4 flex flex-col space-y-4">
                    <a href="#inicio" className="nav-link">Inicio</a>
                    <a href="#servicios" className="nav-link">Servicios</a>
                    <a href="#galeria" className="nav-link">Galería</a>
                    <a href="#testimonios" className="nav-link">Testimonios</a>
                    <a href="#contacto" className="nav-link">Contacto</a>
                    <button className="btn btn-primary w-full">
                      Solicitar Presupuesto
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </nav>
        </div>

        {/* Contenido Principal */}
        <main className="pt-32">
          <Routes>
            <Route path="/" element={
              <div>
                {/* Sección Hero */}
                <section id="inicio" className="section-padding overflow-hidden">
                  <div className="container">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center md:text-left"
                      >
                        <h1 className="heading-1 mb-6">
                          <span className="gradient-text">Transformamos</span> tus espacios con color y profesionalismo
                        </h1>
                        <p className="text-xl text-secondary-600 mb-8">
                          Más de 10 años de experiencia transformando hogares y negocios con acabados de primera calidad
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                          <button 
                            className="btn btn-primary"
                            onClick={() => setShowBudgetModal(true)}
                          >
                            Solicitar Presupuesto
                          </button>
                          <a 
                            href="#galeria" 
                            className="btn btn-secondary"
                            onClick={(e) => {
                              e.preventDefault();
                              document.querySelector('#galeria').scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                              });
                            }}
                          >
                            Ver Proyectos
                          </a>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                      >
                        <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-elegant transform rotate-3"></div>
                        <div className="absolute inset-0 transform -rotate-3">
                          <img 
                            src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1000" 
                            alt="Pintor profesional trabajando" 
                            className="w-full h-full object-cover rounded-3xl shadow-soft"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </section>

                {/* Sección de Estadísticas */}
                <section className="py-12 bg-white/50 backdrop-blur-lg">
                  <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div className="text-center">
                        <h3 className="text-4xl font-bold text-primary-600">+500</h3>
                        <p className="text-secondary-600">Proyectos Completados</p>
                      </div>
                      <div className="text-center">
                        <h3 className="text-4xl font-bold text-primary-600">10+</h3>
                        <p className="text-secondary-600">Años de Experiencia</p>
                      </div>
                      <div className="text-center">
                        <h3 className="text-4xl font-bold text-primary-600">100%</h3>
                        <p className="text-secondary-600">Clientes Satisfechos</p>
                      </div>
                      <div className="text-center">
                        <h3 className="text-4xl font-bold text-primary-600">48h</h3>
                        <p className="text-secondary-600">Tiempo de Respuesta</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Sección de Servicios */}
                <section id="servicios" className="section-padding bg-white">
                  <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="heading-2 mb-6"
                      >
                        Nuestros <span className="gradient-text">Servicios</span>
                      </motion.h2>
                      <p className="text-xl text-secondary-600">
                        Ofrecemos soluciones profesionales para todo tipo de proyectos de pintura, 
                        desde pequeñas renovaciones hasta grandes transformaciones.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {services.map((service, index) => (
                        <motion.div
                          key={service.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 }}
                          className="group"
                        >
                          <div className="card overflow-hidden">
                            <div className="relative h-64">
                              <img 
                                src={service.image} 
                                alt={service.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                              <img 
                                src={service.icon} 
                                alt={`${service.title} icon`}
                                className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-xl p-2"
                              />
                            </div>
                            <div className="p-6">
                              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                              <p className="text-secondary-600 mb-4">{service.description}</p>
                              <ul className="space-y-2">
                                {service.features.map((feature, i) => (
                                  <li key={i} className="flex items-center text-secondary-600">
                                    <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <button className="btn btn-primary w-full mt-6">
                                Solicitar Información
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mt-20 text-center"
                    >
                      <div className="card bg-gradient-to-r from-primary-500 to-accent-500 p-12">
                        <h3 className="heading-3 text-white mb-6">
                          ¿Listo para transformar tu espacio?
                        </h3>
                        <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
                          Obtén un presupuesto personalizado para tu proyecto. 
                          Nuestro equipo está listo para ayudarte.
                        </p>
                        <button 
                          className="btn bg-white text-primary-600 hover:bg-white/90"
                          onClick={() => setShowBudgetModal(true)}
                        >
                          Contactar Ahora
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </section>

                {/* Sección de Galería */}
                <section id="galeria" className="section-padding bg-secondary-50">
                  <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="heading-2 mb-6"
                      >
                        Nuestra <span className="gradient-text">Galería</span>
                      </motion.h2>
                      <p className="text-xl text-secondary-600">
                        Explora nuestros proyectos más destacados y descubre cómo transformamos espacios.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {galleryImages.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 }}
                          className="group cursor-pointer"
                          onClick={() => setSelectedImage(item)}
                        >
                          <div className="card overflow-hidden">
                            <div className="relative h-80">
                              <div className="absolute inset-0 w-1/2">
                                <img 
                                  src={item.before} 
                                  alt={`${item.title} - Antes`}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                                  Antes
                                </div>
                              </div>
                              <div className="absolute inset-0 left-1/2 w-1/2">
                                <img 
                                  src={item.after} 
                                  alt={`${item.title} - Después`}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
                                  Después
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                  <h3 className="text-xl font-bold">{item.title}</h3>
                                  <p className="text-white/80">{item.category}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Sección de Testimonios */}
                <section id="testimonios" className="section-padding bg-white">
                  <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="heading-2 mb-6"
                      >
                        Lo que dicen nuestros <span className="gradient-text">Clientes</span>
                      </motion.h2>
                      <p className="text-xl text-secondary-600">
                        La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                      {testimonials.map((testimonial, index) => (
                        <motion.div
                          key={testimonial.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 }}
                          className="group"
                        >
                          <div className="card p-8 h-full flex flex-col">
                            <div className="flex items-center gap-4 mb-6">
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div>
                                <h3 className="font-bold text-lg">{testimonial.name}</h3>
                                <p className="text-secondary-600">{testimonial.role}</p>
                              </div>
                            </div>
                            <div className="mb-6 flex-grow">
                              <p className="text-secondary-600 italic">"{testimonial.text}"</p>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonios CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mt-16 text-center"
                    >
                      <p className="text-xl text-secondary-600 mb-8">
                        ¿Has trabajado con nosotros? Comparte tu experiencia
                      </p>
                      <button 
                        className="btn btn-primary"
                        onClick={() => setShowReviewModal(true)}
                      >
                        Dejar una Reseña
                      </button>
                    </motion.div>
                  </div>
                </section>

                {/* Sección de Contacto */}
                <section id="contacto" className="section-padding bg-white">
                  <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="heading-2 mb-6"
                      >
                        Ponte en <span className="gradient-text">Contacto</span>
                      </motion.h2>
                      <p className="text-xl text-secondary-600">
                        Estamos aquí para ayudarte. Contáctanos para obtener un presupuesto gratuito o resolver cualquier duda.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      {/* Información de Contacto */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                      >
                        <div className="card p-8">
                          <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                          <div className="space-y-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-bold">Teléfono</h4>
                                <p className="text-secondary-600">(123) 456-7890</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-bold">Email</h4>
                                <p className="text-secondary-600">contacto@pintorprofesional.com</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-bold">Ubicación</h4>
                                <p className="text-secondary-600">Madrid, España</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card p-8 bg-gradient-to-r from-primary-500 to-accent-500">
                          <h3 className="text-2xl font-bold text-white mb-4">Horario de Atención</h3>
                          <div className="space-y-2 text-white/90">
                            <p>Lunes a Viernes: 8:00 - 18:00</p>
                            <p>Sábados: 9:00 - 14:00</p>
                            <p>Domingos: Cerrado</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Formulario de Contacto */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                      >
                        <form onSubmit={handleFormSubmit} className="card p-8 space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-secondary-600 mb-2">
                              Nombre Completo
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-secondary-600 mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-secondary-600 mb-2">
                              Teléfono
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-secondary-600 mb-2">
                              Mensaje
                            </label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              rows="4"
                              className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                              required
                            ></textarea>
                          </div>
                          <button type="submit" className="btn btn-primary w-full">
                            Enviar Mensaje
                          </button>
                        </form>
                      </motion.div>
                    </div>
                  </div>
                </section>

                {/* Modal de Presupuesto */}
                {showBudgetModal && (
                  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="p-8">
                        <button 
                          className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600"
                          onClick={() => setShowBudgetModal(false)}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <h3 className="text-2xl font-bold mb-6">Solicitar Presupuesto</h3>
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-secondary-600 mb-2">
                              Tipo de Servicio
                            </label>
                            <select
                              name="service"
                              value={formData.service}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            >
                              <option value="Pintura de Interiores">Pintura de Interiores</option>
                              <option value="Pintura de Exteriores">Pintura de Exteriores</option>
                              <option value="Efectos Decorativos">Efectos Decorativos</option>
                              <option value="Restauración">Restauración</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-secondary-600 mb-2">
                              Área aproximada (m²)
                            </label>
                            <input
                              type="number"
                              name="area"
                              value={formData.area}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                              placeholder="Ej: 50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-secondary-600 mb-2">
                              Número de paredes
                            </label>
                            <select
                              name="walls"
                              value={formData.walls}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            >
                              <option value="1-4">1-4 paredes</option>
                              <option value="5-8">5-8 paredes</option>
                              <option value="9+">9 o más paredes</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-secondary-600 mb-2">
                              Urgencia
                            </label>
                            <select
                              name="urgency"
                              value={formData.urgency}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            >
                              <option value="normal">Normal</option>
                              <option value="urgente">Urgente</option>
                              <option value="muy-urgente">Muy Urgente</option>
                            </select>
                          </div>
                          <button type="submit" className="btn btn-primary w-full">
                            Solicitar Presupuesto
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Modal de Imagen */}
                {selectedImage && (
                  <div 
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                  >
                    <div 
                      className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden"
                      onClick={e => e.stopPropagation()}
                    >
                      <button 
                        className="fixed top-4 right-4 text-white z-[60] hover:text-primary-400 bg-black/50 rounded-full p-2 backdrop-blur-sm border border-white/20"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Cerrar modal"
                      >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="grid md:grid-cols-2">
                        <div className="relative h-96">
                          <img 
                            src={selectedImage.before} 
                            alt="Antes"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full">
                            Antes
                          </div>
                        </div>
                        <div className="relative h-96">
                          <img 
                            src={selectedImage.after} 
                            alt="Después"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full">
                            Después
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-white">
                        <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                        <p className="text-secondary-600">{selectedImage.category}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal de Reseña */}
                {showReviewModal && (
                  <div 
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowReviewModal(false)}
                  >
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="p-8">
                        <button 
                          className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600"
                          onClick={() => setShowReviewModal(false)}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <h3 className="text-2xl font-bold mb-6">Compartir tu Experiencia</h3>
                        <form onSubmit={handleReviewSubmit} className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-secondary-600 mb-2">
                              Nombre
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={reviewData.name}
                              onChange={handleReviewInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-secondary-600 mb-2">
                              Rol (ej. Propietario, Arquitecto)
                            </label>
                            <input
                              type="text"
                              name="role"
                              value={reviewData.role}
                              onChange={handleReviewInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-secondary-600 mb-2">
                              Valoración
                            </label>
                            <select
                              name="rating"
                              value={reviewData.rating}
                              onChange={handleReviewInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            >
                              {[5,4,3,2,1].map(num => (
                                <option key={num} value={num}>{num} estrellas</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-secondary-600 mb-2">
                              Tu Experiencia
                            </label>
                            <textarea
                              name="comment"
                              value={reviewData.comment}
                              onChange={handleReviewInputChange}
                              rows="4"
                              className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                              required
                            ></textarea>
                          </div>
                          <button type="submit" className="btn btn-primary w-full">
                            Enviar Reseña
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Mensaje de éxito */}
                {showSuccessMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
                  >
                    <p className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {successMessage}
                    </p>
                  </motion.div>
                )}
              </div>
            } />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-secondary-900 text-white py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold gradient-text">Pintor Profesional</h3>
                <p className="text-secondary-300">
                  Transformando espacios con calidad y profesionalismo desde hace más de una década.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Servicios</h3>
                <ul className="space-y-2 text-secondary-300">
                  <li>Pintura de interiores</li>
                  <li>Pintura de exteriores</li>
                  <li>Reparación de paredes</li>
                  <li>Efectos decorativos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Contacto</h3>
                <ul className="space-y-2 text-secondary-300">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    (123) 456-7890
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    contacto@pintorprofesional.com
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-secondary-800 text-center text-secondary-400">
              <p>
                &copy; 2024 Pintor Profesional | Diseñado y Desarrollado por{" "}
                <a 
                  href="https://ricki.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
                >
                  Ricki
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
