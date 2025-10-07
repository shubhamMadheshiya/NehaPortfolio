// Theme management
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.setAttribute('data-theme', themeName);
}

// Function to toggle between light and dark themes
function toggleTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
  // Check for saved theme preference or respect OS preference
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
  
  // Add event listener to theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', toggleTheme);
  
  // Mobile menu toggle functionality
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
    
    // Close mobile menu when clicking on a link
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
  
  // Add subtle hover animations to nav links
  const allNavLinks = document.querySelectorAll('.nav-links a');
  allNavLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  // Intersection Observer for fade-in animation with staggered effect
  const sections = document.querySelectorAll(".section");
  
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add a slight delay for each section to create a staggered effect
          setTimeout(() => {
            entry.target.classList.add("show");
            
            // Animate children elements with staggered delay
            const children = entry.target.querySelectorAll('.skill, .experience-item, .project');
            children.forEach((child, i) => {
              setTimeout(() => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                child.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                  child.style.opacity = '1';
                  child.style.transform = 'translateY(0)';
                }, 100);
              }, i * 100); // Stagger each child by 100ms
            });
          }, index * 150); // Stagger each section by 150ms
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
  });
  
  // Add a subtle parallax effect to the hero section and interactive blob movement
  const hero = document.querySelector('.hero');
  const blob = document.querySelector('.blob');
  const profileImage = document.querySelector('.profile-image');
  
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });
    
    // Interactive blob movement with mouse
    if (blob && profileImage) {
      hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const rect = hero.getBoundingClientRect();
        const x = clientX - rect.left; // x position within the element
        const y = clientY - rect.top;  // y position within the element
        
        // Calculate movement based on mouse position (subtle effect)
        const moveX = (x - rect.width / 2) / 30;
        const moveY = (y - rect.height / 2) / 30;
        
        // Apply movement to blob and image with different intensities
        blob.style.transform = `translate(${moveX * 1.2}px, ${moveY * 1.2}px)`;
        profileImage.style.transform = `translate(${moveX * 0.8}px, ${moveY * 0.8}px)`;
      });
      
      // Reset position when mouse leaves
      hero.addEventListener('mouseleave', () => {
        blob.style.transform = 'translate(0, 0)';
        profileImage.style.transform = 'translate(0, 0)';
      });
    }
  }
  
  // Add typing animation to the hero title
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    setTimeout(typeWriter, 500);
  }
});