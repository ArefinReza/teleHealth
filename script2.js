(() => {
  'use strict';

  /** 
   * Initialize Chatbot Button
   */
  const initChatbot = () => {
    const chatbotBtn = document.getElementById("chatbotBtn");
    if (chatbotBtn) {
      chatbotBtn.addEventListener("click", () => {
        alert("Live chat coming soon!");
      });
    }
  };

  /**
   * Initialize Symptom Form Submission
   */
  const initSymptomForm = () => {
    const symptomForm = document.getElementById("symptomForm");
    if (!symptomForm) return;

    symptomForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const symptoms = [];
      if (document.getElementById("symptomFever")?.checked) symptoms.push("Fever");
      if (document.getElementById("symptomCough")?.checked) symptoms.push("Cough");
      if (document.getElementById("symptomHeadache")?.checked) symptoms.push("Headache");
      if (document.getElementById("symptomFatigue")?.checked) symptoms.push("Fatigue");
      if (document.getElementById("symptomSoreThroat")?.checked) symptoms.push("Sore Throat");

      let advice = "";
      if (symptoms.length === 0) {
        advice = "<p>Please select at least one symptom.</p>";
      } else if (symptoms.includes("Fever") && symptoms.includes("Cough")) {
        advice = `<p><strong>Advice:</strong> Your symptoms indicate a possibility of flu or COVID-19. We recommend you get tested and consult with a doctor as soon as possible.</p>`;
      } else if (symptoms.includes("Headache") && symptoms.includes("Fatigue")) {
        advice = `<p><strong>Advice:</strong> These symptoms might be due to dehydration or stress. Consider taking rest, hydrating, and if symptoms persist, consult a physician.</p>`;
      } else {
        advice = `<p><strong>Advice:</strong> Based on your selected symptoms (${symptoms.join(", ")}), please monitor your condition closely and consider booking an appointment for further evaluation.</p>`;
      }
      const symptomResult = document.getElementById("symptomResult");
      if (symptomResult) {
        symptomResult.innerHTML = advice;
      }
    });
  };

  /**
   * Initialize Doctor Section (Modal)
   */
  const initDoctorSection = () => {
    const doctorCards = document.querySelectorAll('.doctor-card');
    doctorCards.forEach(card => {
      card.addEventListener('click', function () {
        const name = this.getAttribute('data-name');
        const speciality = this.getAttribute('data-speciality');
        const bio = this.getAttribute('data-bio');
        const image = this.getAttribute('data-image');

        document.getElementById('modalDoctorName').textContent = name;
        document.getElementById('modalDoctorSpeciality').textContent = speciality;
        document.getElementById('modalDoctorBio').textContent = bio;
        document.getElementById('modalDoctorImage').setAttribute('src', image);

        // Show the modal using Bootstrap's Modal API
        const doctorModalEl = document.getElementById('doctorModal');
        if (doctorModalEl) {
          const doctorModal = new bootstrap.Modal(doctorModalEl);
          doctorModal.show();
        }
      });
    });
  };

  /**
   * Initialize Telehealth Goal Section
   */
  const initTelehealthGoal = () => {
    const goals = {
      expert: {
        title: "Expert Care",
        description: "Our doctors provide expert care to ensure you receive the best treatment."
      },
      digital: {
        title: "Digital Health",
        description: "Embrace the future with our innovative digital health and telemedicine services."
      },
      compassionate: {
        title: "Compassionate Service",
        description: "We are committed to offering compassionate service that always puts your needs first."
      }
    };

    const iconItems = document.querySelectorAll('#telehealth-goal .icon-item');
    const goalTitle = document.getElementById('goalTitle');
    const goalDescription = document.getElementById('goalDescription');

    iconItems.forEach(item => {
      item.addEventListener('click', () => {
        // Remove active class from all icons
        iconItems.forEach(i => i.classList.remove('active'));
        // Set active class on the clicked icon
        item.classList.add('active');
        // Update the goal content
        const goalKey = item.getAttribute('data-goal');
        const goalData = goals[goalKey];
        if (goalData && goalTitle && goalDescription) {
          goalTitle.textContent = goalData.title;
          goalDescription.textContent = goalData.description;
        }
      });
    });

    // Set the first icon active by default
    if (iconItems.length > 0) {
      iconItems[0].classList.add('active');
    }
  };

  /**
   * Initialize Quiz Section
   */
  const initQuizSection = () => {
    // Step 1: Appointment Urgency
    const urgencyRadios = document.getElementsByName('urgency');
    const nextStep1Btn = document.getElementById('nextStep1');
    urgencyRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        nextStep1Btn.disabled = false;
      });
    });
    nextStep1Btn.addEventListener('click', () => {
      document.getElementById('quizStep1').style.display = 'none';
      document.getElementById('quizStep2').style.display = 'block';
    });

    // Step 2: Seriousness
    const seriousRadios = document.getElementsByName('serious');
    const nextStep2Btn = document.getElementById('nextStep2');
    seriousRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        nextStep2Btn.disabled = false;
      });
    });
    nextStep2Btn.addEventListener('click', () => {
      document.getElementById('quizStep2').style.display = 'none';
      document.getElementById('quizStep3').style.display = 'block';
    });

    // Step 3: Contact Number
    const contactInput = document.getElementById('contactNumber');
    const submitQuizBtn = document.getElementById('submitQuiz');
    contactInput.addEventListener('input', () => {
      submitQuizBtn.disabled = (contactInput.value.trim() === '');
    });
    submitQuizBtn.addEventListener('click', () => {
      const urgency = document.querySelector('input[name="urgency"]:checked').value;
      const seriousness = document.querySelector('input[name="serious"]:checked').value;
      const contact = contactInput.value.trim();
      const summaryHTML = `
        <strong>Urgency:</strong> ${urgency} <br>
        <strong>Seriousness:</strong> ${seriousness} <br>
        <strong>Contact:</strong> ${contact}
      `;
      document.getElementById('summaryText').innerHTML = summaryHTML;
      document.getElementById('quizForm').style.display = 'none';
      document.getElementById('quizSummary').style.display = 'block';
    });

    // Restart Quiz
    const restartQuizBtn = document.getElementById('restartQuiz');
    restartQuizBtn.addEventListener('click', () => {
      const quizForm = document.getElementById('quizForm');
      if (quizForm) quizForm.reset();
      document.getElementById('quizStep1').style.display = 'block';
      document.getElementById('quizStep2').style.display = 'none';
      document.getElementById('quizStep3').style.display = 'none';
      document.getElementById('quizSummary').style.display = 'none';
      nextStep1Btn.disabled = true;
      nextStep2Btn.disabled = true;
      submitQuizBtn.disabled = true;
      document.getElementById('quizForm').style.display = 'block';
    });
  };

  /**
   * Initialize Pricing Calculator (with Chart.js)
   */
  const initPricingCalculator = () => {
    const testCheckboxes = document.querySelectorAll('.test-checkbox');
    const totalPriceEl = document.getElementById('totalPrice');
    const resetPricingBtn = document.getElementById('resetPricing');

    const ctx = document.getElementById('pricingChart')?.getContext('2d');
    if (!ctx) return;

    const pricingChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });

    const updatePricing = () => {
      let total = 0;
      const labels = [];
      const data = [];
      testCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
          const labelText = checkbox.nextElementSibling.innerText;
          labels.push(labelText);
          const cost = parseInt(checkbox.value, 10);
          data.push(cost);
          total += cost;
        }
      });
      if (totalPriceEl) totalPriceEl.innerText = total;
      pricingChart.data.labels = labels;
      pricingChart.data.datasets[0].data = data;
      pricingChart.update();
    };

    testCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updatePricing);
    });

    if (resetPricingBtn) {
      resetPricingBtn.addEventListener('click', () => {
        testCheckboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
        updatePricing();
      });
    }
  };

  /**
   * Initialize Gallery Auto-Slide
   */
  const initGallerySlider = () => {
    const sets = document.querySelectorAll('.gallery-set');
    if (sets.length === 0) return;
    let currentIndex = 0;
    sets[currentIndex].classList.add('active');

    setInterval(() => {
      sets[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % sets.length;
      sets[currentIndex].classList.add('active');
    }, 4000);
  };

  /**
   * Initialize Navbar Scroll Listener (for toggling 'scrolled' class)
   */
  const initNavbarScrollListener = () => {
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  };

  /**
   * Initialize Dark Mode Toggle and preserve user preference
   */
  const initDarkModeToggle = () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for stored preference
    if (localStorage.getItem('dark-mode') === 'enabled') {
      body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem('dark-mode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  };

  // Initialize all components once DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    initChatbot();
    initSymptomForm();
    initDoctorSection();
    initTelehealthGoal();
    initQuizSection();
    initPricingCalculator();
    initGallerySlider();
    initNavbarScrollListener();
    initDarkModeToggle();
  });
})();
