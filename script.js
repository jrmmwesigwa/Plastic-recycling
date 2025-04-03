
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      const spans = mobileMenuToggle.querySelectorAll('span');
      
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
  
  // Mobile Money Dialog
  const mobileMoneyBtns = document.querySelectorAll('#mobileMoneyBtn');
  const mobileMoneyDialog = document.getElementById('mobileMoneyDialog');
  const closeButton = document.querySelector('.close-button');
  const cancelButton = document.querySelector('.cancel-button');
  const mobileMoneyForm = document.getElementById('mobileMoneyForm');
  
  function openMobileMoneyDialog() {
    if (mobileMoneyDialog) {
      mobileMoneyDialog.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  }
  
  function closeMobileMoneyDialog() {
    if (mobileMoneyDialog) {
      mobileMoneyDialog.style.display = 'none';
      document.body.style.overflow = 'auto'; // Enable scrolling
    }
  }
  
  mobileMoneyBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', openMobileMoneyDialog);
    }
  });
  
  if (closeButton) {
    closeButton.addEventListener('click', closeMobileMoneyDialog);
  }
  
  if (cancelButton) {
    cancelButton.addEventListener('click', closeMobileMoneyDialog);
  }
  
  // Close dialog when clicking outside
  if (mobileMoneyDialog) {
    mobileMoneyDialog.addEventListener('click', function(event) {
      if (event.target === mobileMoneyDialog) {
        closeMobileMoneyDialog();
      }
    });
  }
  
  // Form submission
  if (mobileMoneyForm) {
    mobileMoneyForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const phoneNumber = document.getElementById('phoneNumber').value;
      const service = document.getElementById('service').value;
      
      if (!phoneNumber || !service) {
        alert('Please fill in all fields');
        return;
      }
      
      // Simulate payment processing
      alert(`Payment initiated for ${service} using ${phoneNumber}. You'll receive a prompt on your phone.`);
      
      // Close the dialog after submission
      closeMobileMoneyDialog();
    });
  }
  
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });
  
  // FAQ Category Tabs
  const categoryBtns = document.querySelectorAll('.faq-category-btn');
  const categories = document.querySelectorAll('.faq-category');
  
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      
      // Remove active class from all buttons and categories
      categoryBtns.forEach(btn => btn.classList.remove('active'));
      categories.forEach(cat => cat.classList.remove('active'));
      
      // Add active class to clicked button and corresponding category
      btn.classList.add('active');
      document.getElementById(category)?.classList.add('active');
    });
  });
  
  // Product Filtering
  const filterButton = document.getElementById('filter-button');
  const resetButton = document.getElementById('reset-button');
  const categoryFilter = document.getElementById('category-filter');
  const plasticTypeFilter = document.getElementById('plastic-type-filter');
  const priceFilter = document.getElementById('price-filter');
  const productCards = document.querySelectorAll('.product-card');
  
  function applyFilters() {
    const categoryValue = categoryFilter?.value || 'all';
    const typeValue = plasticTypeFilter?.value || 'all';
    const priceValue = priceFilter?.value || 'all';
    
    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardType = card.getAttribute('data-type');
      const cardPrice = card.getAttribute('data-price');
      
      const categoryMatch = categoryValue === 'all' || cardCategory === categoryValue;
      const typeMatch = typeValue === 'all' || cardType === typeValue;
      const priceMatch = priceValue === 'all' || cardPrice === priceValue;
      
      if (categoryMatch && typeMatch && priceMatch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  function resetFilters() {
    if (categoryFilter) categoryFilter.value = 'all';
    if (plasticTypeFilter) plasticTypeFilter.value = 'all';
    if (priceFilter) priceFilter.value = 'all';
    
    productCards.forEach(card => {
      card.style.display = 'block';
    });
  }
  
  if (filterButton) {
    filterButton.addEventListener('click', applyFilters);
  }
  
  if (resetButton) {
    resetButton.addEventListener('click', resetFilters);
  }
  
  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Simulate form submission
      alert('Thank you for your message. We will get back to you soon!');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Add to Cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      
      alert(`${productName} added to cart`);
    });
  });
  
  // Service CTA buttons
  const serviceCTAButtons = document.querySelectorAll('.service-cta');
  
  serviceCTAButtons.forEach(button => {
    button.addEventListener('click', function() {
      openMobileMoneyDialog();
    });
  });
  
  // Add animation to elements when they come into view
  const animateElements = document.querySelectorAll('.animate-fade-in, .animate-slide-in, .animate-scale-up');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      observer.observe(el);
    });
  }
});
