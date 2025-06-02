// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar")
  const navLinks = document.querySelectorAll(".nav-link")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const sections = document.querySelectorAll("section")

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Scroll spy functionality
  function updateActiveNavLink() {
    let current = ""
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    // Update active nav link
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("data-section") === current) {
        link.classList.add("active")
      }
    })
  }

  // Navbar background on scroll
  function updateNavbarBackground() {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "none"
    }
  }

  // Scroll event listener
  window.addEventListener("scroll", () => {
    updateActiveNavLink()
    updateNavbarBackground()
    revealOnScroll()
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Hero Counter Animation
  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    function updateCounter() {
      start += increment
      if (start < target) {
        element.textContent = Math.floor(start)
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target
      }
    }

    updateCounter()
  }

  // Start hero counters animation
  function startHeroCounters() {
    const counter = document.querySelector(".hero-counter .counter-number")
    if (counter) {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      animateCounter(counter, target, 2500)
    }
  }

  // Start counters after page load
  setTimeout(startHeroCounters, 1000)

  // Scroll Reveal Animation
  function revealOnScroll() {
    const reveals = document.querySelectorAll(
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale",
    )

    reveals.forEach((element) => {
      const windowHeight = window.innerHeight
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("revealed")
      }
    })
  }

  // Add scroll reveal classes to elements
  function addScrollRevealClasses() {
    // Services cards
    document.querySelectorAll(".service-card").forEach((card, index) => {
      card.classList.add("scroll-reveal")
      card.style.transitionDelay = `${index * 0.1}s`
    })

    // Project cards
    document.querySelectorAll(".project-card").forEach((card, index) => {
      card.classList.add("scroll-reveal-scale")
      card.style.transitionDelay = `${index * 0.15}s`
    })

    // Engineer cards
    document.querySelectorAll(".engineer-card").forEach((card, index) => {
      card.classList.add("scroll-reveal")
      card.style.transitionDelay = `${index * 0.1}s`
    })

    // Section headers
    document.querySelectorAll(".section-header").forEach((header) => {
      header.classList.add("scroll-reveal")
    })

    // About content
    const aboutText = document.querySelector(".about-text")
    const aboutImage = document.querySelector(".about-image")
    if (aboutText) aboutText.classList.add("scroll-reveal-left")
    if (aboutImage) aboutImage.classList.add("scroll-reveal-right")

    // Stats
    document.querySelectorAll(".stat").forEach((stat, index) => {
      stat.classList.add("scroll-reveal")
      stat.style.transitionDelay = `${index * 0.1}s`
    })

    // Contact sections
    const contactInfo = document.querySelector(".contact-info")
    const contactForm = document.querySelector(".contact-form")
    if (contactInfo) contactInfo.classList.add("scroll-reveal-left")
    if (contactForm) contactForm.classList.add("scroll-reveal-right")

    // Contact items
    document.querySelectorAll(".contact-item").forEach((item, index) => {
      item.classList.add("scroll-reveal")
      item.style.transitionDelay = `${index * 0.1}s`
    })
  }

  // Contact form handling
  const contactForm = document.getElementById("contactForm")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    // Simple validation
    if (!data.name || !data.email || !data.service || !data.message) {
      alert("Por favor, completa todos los campos requeridos.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      alert("Por favor, ingresa un email válido.")
      return
    }

    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent

    submitButton.textContent = "Enviando..."
    submitButton.disabled = true

    // Simulate API call
    setTimeout(() => {
      alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.")
      contactForm.reset()
      submitButton.textContent = originalText
      submitButton.disabled = false
    }, 2000)
  })

  // Counter animation for stats section
  function animateStatsCounters() {
    const counters = document.querySelectorAll(".stat h3")

    counters.forEach((counter) => {
      const text = counter.textContent
      const target = Number.parseInt(text)
      const hasPlus = text.includes("+")
      const hasPercent = text.includes("%")

      let start = 0
      const increment = target / 100

      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          counter.textContent = target + (hasPlus ? "+" : "") + (hasPercent ? "%" : "")
          clearInterval(timer)
        } else {
          counter.textContent = Math.floor(start) + (hasPlus ? "+" : "") + (hasPercent ? "%" : "")
        }
      }, 30)
    })
  }

  // Trigger stats counter animation when stats section is visible
  const statsSection = document.querySelector(".stats")
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStatsCounters()
            statsObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    statsObserver.observe(statsSection)
  }

  // Projects Carousel functionality
  function initProjectsCarousel() {
    const track = document.querySelector(".projects-track")
    const slides = document.querySelectorAll(".project-slide")
    const prevButton = document.querySelector(".carousel-arrow-left")
    const nextButton = document.querySelector(".carousel-arrow-right")

    if (!track || slides.length === 0) return

    let currentIndex = 0
    const totalSlides = slides.length

    // Function to get slides to show based on screen width
    function getSlidesToShow() {
      if (window.innerWidth <= 768) {
        return 1 // Show 1 slide on mobile
      } else if (window.innerWidth <= 1024) {
        return 2 // Show 2 slides on tablet
      }
      return 3 // Show 3 slides on desktop
    }

    let slidesToShow = getSlidesToShow()

    // Set initial position
    updateCarousel()

    // Event listeners
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides
      updateCarousel()
      resetInterval()
    })

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalSlides
      updateCarousel()
      resetInterval()
    })

    // Auto advance carousel
    let interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides
      updateCarousel()
    }, 4000)

    // Function to reset interval
    function resetInterval() {
      clearInterval(interval)
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides
        updateCarousel()
      }, 4000)
    }

    // Pause on hover
    track.addEventListener("mouseenter", () => clearInterval(interval))
    track.addEventListener("mouseleave", () => {
      resetInterval()
    })

    // Update carousel position
    function updateCarousel() {
      const slideWidth = 100 / slidesToShow
      track.style.transform = `translateX(-${currentIndex * slideWidth}%)`
    }

    // Handle window resize
    let resizeTimeout
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const newSlidesToShow = getSlidesToShow()
        if (newSlidesToShow !== slidesToShow) {
          slidesToShow = newSlidesToShow
          // Reset to first slide on resize to avoid layout issues
          currentIndex = 0
          updateCarousel()
        }
      }, 250)
    })
  }

  // Project data
  const projectsData = {
    0: {
      title: "Residencial Vista Verde",
      location: "Zona Norte, Ciudad de México",
      area: "15,000 m²",
      year: "2023",
      investment: "$25 millones USD",
      duration: "18 meses",
      certifications: "LEED Gold, BREEAM",
      description:
        "Complejo residencial sustentable de 120 unidades habitacionales con amplias áreas verdes, amenidades modernas y tecnología inteligente. El proyecto incluye espacios comunitarios, gimnasio, alberca, área de juegos infantiles y estacionamiento subterráneo. Diseñado con criterios de eficiencia energética y uso responsable del agua.",
      images: ["gallery-slide-1", "gallery-slide-2", "gallery-slide-3"],
    },
    1: {
      title: "Centro Comercial Plaza Norte",
      location: "Av. Principal 1234, Monterrey",
      area: "45,000 m²",
      year: "2022",
      investment: "$80 millones USD",
      duration: "24 meses",
      certifications: "LEED Platinum, EDGE",
      description:
        "Moderno centro comercial con diseño arquitectónico vanguardista que integra espacios comerciales, entretenimiento y gastronomía. Cuenta con más de 200 locales comerciales, cines, área de comidas, estacionamiento para 2,000 vehículos y sistemas de climatización eficientes. El diseño incorpora iluminación natural y espacios verdes.",
      images: ["gallery-slide-2", "gallery-slide-3", "gallery-slide-1"],
    },
    2: {
      title: "Torre Corporativa Alterno",
      location: "Distrito Financiero, Guadalajara",
      area: "35,000 m²",
      year: "2021",
      investment: "$120 millones USD",
      duration: "30 meses",
      certifications: "LEED Gold, WELL Building",
      description:
        "Edificio corporativo de 25 pisos que redefine el skyline de la ciudad. Diseñado para albergar oficinas de clase A+ con tecnología de punta, sistemas inteligentes de gestión energética y espacios de trabajo colaborativo. Incluye helipuerto, centro de conferencias, gimnasio ejecutivo y restaurante panorámico en el último piso.",
      images: ["gallery-slide-3", "gallery-slide-1", "gallery-slide-2"],
    },
    3: {
      title: "Hospital Metropolitano",
      location: "Zona Médica, Puebla",
      area: "25,000 m²",
      year: "2023",
      investment: "$95 millones USD",
      duration: "36 meses",
      certifications: "LEED Healthcare, BREEAM Healthcare",
      description:
        "Centro médico de última generación con 200 camas, 12 quirófanos, unidad de cuidados intensivos, área de emergencias y helipuerto para ambulancias aéreas. El diseño prioriza la eficiencia operativa, la comodidad del paciente y la sostenibilidad ambiental. Incluye sistemas de purificación de aire, iluminación circadiana y jardines terapéuticos.",
      images: ["gallery-slide-1", "gallery-slide-3", "gallery-slide-2"],
    },
  }

  // Modal functionality
  function initModal() {
    const modal = document.getElementById("projectModal")
    const projectCards = document.querySelectorAll(".project-card")
    const closeBtn = document.querySelector(".modal-close")

    // Open modal when clicking on project card
    projectCards.forEach((card) => {
      card.addEventListener("click", () => {
        const projectId = card.getAttribute("data-project")
        openModal(projectId)
      })
    })

    // Close modal
    closeBtn.addEventListener("click", closeModal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal()
      }
    })

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "block") {
        closeModal()
      }
    })

    function openModal(projectId) {
      const project = projectsData[projectId]
      if (!project) return

      // Update modal content
      document.getElementById("modalTitle").textContent = project.title
      document.getElementById("modalLocation").textContent = project.location
      document.getElementById("modalArea").textContent = project.area
      document.getElementById("modalYear").textContent = project.year
      document.getElementById("modalInvestment").textContent = project.investment
      document.getElementById("modalDuration").textContent = project.duration
      document.getElementById("modalCertifications").textContent = project.certifications
      document.getElementById("modalDescription").textContent = project.description

      // Setup gallery
      setupGallery(project.images)

      // Show modal
      modal.style.display = "block"
      document.body.style.overflow = "hidden"
    }

    function closeModal() {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  }

  // Gallery functionality
  function setupGallery(images) {
    const galleryTrack = document.getElementById("galleryTrack")
    const galleryDots = document.getElementById("galleryDots")
    const prevBtn = document.querySelector(".gallery-prev")
    const nextBtn = document.querySelector(".gallery-next")

    let currentSlide = 0

    // Clear existing content
    galleryTrack.innerHTML = ""
    galleryDots.innerHTML = ""

    // Create slides
    images.forEach((imageClass, index) => {
      const slide = document.createElement("div")
      slide.className = `gallery-slide ${imageClass}`
      galleryTrack.appendChild(slide)

      // Create dot
      const dot = document.createElement("div")
      dot.className = `gallery-dot ${index === 0 ? "active" : ""}`
      dot.addEventListener("click", () => goToSlide(index))
      galleryDots.appendChild(dot)
    })

    const slides = galleryTrack.querySelectorAll(".gallery-slide")
    const dots = galleryDots.querySelectorAll(".gallery-dot")

    // Navigation
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length
      updateGallery()
    })

    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length
      updateGallery()
    })

    function goToSlide(index) {
      currentSlide = index
      updateGallery()
    }

    function updateGallery() {
      galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide)
      })
    }

    // Auto advance
    let galleryInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length
      updateGallery()
    }, 3000)

    // Pause on hover
    galleryTrack.addEventListener("mouseenter", () => clearInterval(galleryInterval))
    galleryTrack.addEventListener("mouseleave", () => {
      clearInterval(galleryInterval)
      galleryInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length
        updateGallery()
      }, 3000)
    })
  }

  // Initialize
  addScrollRevealClasses()
  updateActiveNavLink()
  updateNavbarBackground()
  revealOnScroll()
  initProjectsCarousel()
  initModal()

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.style.opacity = "1"
  })
})

// Add CSS for body loading
document.body.style.opacity = "0"
document.body.style.transition = "opacity 0.5s ease"

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroCounters = document.querySelectorAll(".hero-counter")

  heroCounters.forEach((counter) => {
    const rate = scrolled * -0.1
    counter.style.transform = `translateY(${rate}px)`
  })
})
