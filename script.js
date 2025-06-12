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

    // Project cards - Updated for new carousel
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
  if (contactForm) {
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
  }

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

  // NEW: Card Carousel 2D Class - Updated Projects Carousel functionality
  class CardCarousel {
    constructor() {
      this.track = document.querySelector('.projects-track');
      this.slides = document.querySelectorAll('.project-slide');
      this.leftArrow = document.querySelector('.carousel-arrow-left');
      this.rightArrow = document.querySelector('.carousel-arrow-right');
      this.progressDots = document.querySelectorAll('.progress-dot');
      
      // Only initialize if elements exist
      if (!this.track || !this.slides.length) return;
      
      this.currentSlide = 0;
      this.totalSlides = this.slides.length;
      this.autoPlayInterval = null;
      this.autoPlayDelay = 4000; // 4 segundos
      this.isAutoPlaying = true;
      
      this.init();
    }
    
    init() {
      this.setupEventListeners();
      this.startAutoPlay();
      this.updateCarousel();
    }
    
    setupEventListeners() {
      // Botones de navegación
      if (this.leftArrow) {
        this.leftArrow.addEventListener('click', () => {
          this.pauseAutoPlay();
          this.prevSlide();
          this.resumeAutoPlay();
        });
      }
      
      if (this.rightArrow) {
        this.rightArrow.addEventListener('click', () => {
          this.pauseAutoPlay();
          this.nextSlide();
          this.resumeAutoPlay();
        });
      }
      
      // Indicadores de progreso
      this.progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          this.pauseAutoPlay();
          this.goToSlide(index);
          this.resumeAutoPlay();
        });
      });
      
      // Pausar autoplay al hacer hover
      const carousel = document.querySelector('.projects-carousel-container');
      if (carousel) {
        carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
        carousel.addEventListener('mouseleave', () => this.resumeAutoPlay());
      }
      
      // Soporte para gestos táctiles
      this.setupTouchEvents();
      
      // Pausar autoplay cuando la pestaña no está visible
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.pauseAutoPlay();
        } else if (this.isAutoPlaying) {
          this.resumeAutoPlay();
        }
      });
    }
    
    setupTouchEvents() {
      let startX = 0;
      let currentX = 0;
      let isDragging = false;
      
      this.track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        this.pauseAutoPlay();
      });
      
      this.track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
      });
      
      this.track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
          if (diffX > 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
        }
        
        this.resumeAutoPlay();
      });
    }
    
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      this.updateCarousel();
    }
    
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
      this.updateCarousel();
    }
    
    goToSlide(index) {
      this.currentSlide = index;
      this.updateCarousel();
    }
    
    updateCarousel() {
      // Mover el track
      const translateX = -this.currentSlide * 100;
      this.track.style.transform = `translateX(${translateX}%)`;
      
      // Actualizar indicadores de progreso
      this.progressDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentSlide);
      });
      
      // Actualizar escala de las tarjetas para efecto 2D
      this.slides.forEach((slide, index) => {
        const card = slide.querySelector('.project-card');
        if (card) {
          if (index === this.currentSlide) {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
          } else {
            card.style.transform = 'scale(0.95)';
            card.style.opacity = '0.8';
          }
        }
      });
    }
    
    startAutoPlay() {
      if (this.autoPlayInterval) return;
      
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    }
    
    resumeAutoPlay() {
      if (this.isAutoPlaying) {
        setTimeout(() => {
          this.startAutoPlay();
        }, 1000); // Esperar 1 segundo antes de reanudar
      }
    }
    
    toggleAutoPlay() {
      this.isAutoPlaying = !this.isAutoPlaying;
      if (this.isAutoPlaying) {
        this.startAutoPlay();
      } else {
        this.pauseAutoPlay();
      }
    }
  }

  // Initialize new carousel
  function initProjectsCarousel() {
    new CardCarousel();
  }

  // Project data - Maintained for modal functionality
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

  // Modal functionality - Maintained for project details
  function initModal() {
    const modal = document.getElementById("projectModal")
    const projectCards = document.querySelectorAll(".project-card")
    const closeBtn = document.querySelector(".modal-close")

    if (!modal) return; // Exit if modal doesn't exist

    // Open modal when clicking on project card
    projectCards.forEach((card) => {
      card.addEventListener("click", () => {
        const projectId = card.getAttribute("data-project")
        openModal(projectId)
      })
    })

    // Close modal
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal)
    }
    
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
      const modalTitle = document.getElementById("modalTitle")
      const modalLocation = document.getElementById("modalLocation")
      const modalArea = document.getElementById("modalArea")
      const modalYear = document.getElementById("modalYear")
      const modalInvestment = document.getElementById("modalInvestment")
      const modalDuration = document.getElementById("modalDuration")
      const modalCertifications = document.getElementById("modalCertifications")
      const modalDescription = document.getElementById("modalDescription")

      if (modalTitle) modalTitle.textContent = project.title
      if (modalLocation) modalLocation.textContent = project.location
      if (modalArea) modalArea.textContent = project.area
      if (modalYear) modalYear.textContent = project.year
      if (modalInvestment) modalInvestment.textContent = project.investment
      if (modalDuration) modalDuration.textContent = project.duration
      if (modalCertifications) modalCertifications.textContent = project.certifications
      if (modalDescription) modalDescription.textContent = project.description

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

  // Gallery functionality - Maintained for modal gallery
  function setupGallery(images) {
    const galleryTrack = document.getElementById("galleryTrack")
    const galleryDots = document.getElementById("galleryDots")
    const prevBtn = document.querySelector(".gallery-prev")
    const nextBtn = document.querySelector(".gallery-next")

    if (!galleryTrack || !galleryDots) return; // Exit if elements don't exist

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
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length
        updateGallery()
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length
        updateGallery()
      })
    }

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

  // Initialize all functionality
  addScrollRevealClasses()
  updateActiveNavLink()
  updateNavbarBackground()
  revealOnScroll()
  initProjectsCarousel() // Now uses the new CardCarousel class
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