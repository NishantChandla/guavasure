/**
 * Guavasure Pet Insurance Modal - Conversational AI Experience with Mila
 * AI-powered insurance agent that guides users through the insurance process
 */

(function () {
  'use strict';

  // Configuration
  const API_BASE_URL = 'http://localhost:3000';
  const SHOP_DOMAIN = window.Shopify?.shop || '';

  // Conversation states
  const ConversationState = {
    WELCOME: 'welcome',
    PET_NAME: 'pet_name',
    PET_TYPE: 'pet_type',
    PET_BREED: 'pet_breed',
    PET_BREED_CUSTOM: 'pet_breed_custom',
    PET_AGE: 'pet_age',
    PET_WEIGHT: 'pet_weight',
    PIN_CODE: 'pin_code',
    PET_HEALTH: 'pet_health',
    VACCINATIONS: 'vaccinations',
    GENERATING_QUOTE: 'generating_quote',
    QUOTE_DISPLAY: 'quote_display',
    CHECKOUT_INFO: 'checkout_info',
    CHECKOUT_NAME: 'checkout_name',
    CHECKOUT_ADDRESS: 'checkout_address',
    CHECKOUT_PAN: 'checkout_pan',
    PROCESSING_PAYMENT: 'processing_payment',
    POLICY_COMPLETE: 'policy_complete',
  };

  // Dog breeds list
  const dogBreeds = [
    'Labrador Retriever',
    'German Shepherd',
    'Golden Retriever',
    'French Bulldog',
    'Bulldog',
    'Poodle',
    'Beagle',
    'Rottweiler',
    'German Shorthaired Pointer',
    'Yorkshire Terrier',
    'Boxer',
    'Dachshund',
    'Siberian Husky',
    'Great Dane',
    'Doberman Pinscher',
    'Australian Shepherd',
    'Miniature Schnauzer',
    'Cavalier King Charles Spaniel',
    'Shih Tzu',
    'Boston Terrier',
    'Pomeranian',
    'Havanese',
    'English Springer Spaniel',
    'Shetland Sheepdog',
    'Brittany',
    'Cocker Spaniel',
    'Border Collie',
    'Other',
  ];

  // Cat breeds list
  const catBreeds = [
    'Persian',
    'Maine Coon',
    'British Shorthair',
    'Ragdoll',
    'Bengal',
    'Siamese',
    'Abyssinian',
    'American Shorthair',
    'Scottish Fold',
    'Sphynx',
    'Devon Rex',
    'Russian Blue',
    'Exotic Shorthair',
    'Norwegian Forest Cat',
    'Birman',
    'Oriental',
    'Burmese',
    'Siberian',
    'Cornish Rex',
    'Domestic Shorthair',
    'Domestic Longhair',
    'Other',
  ];

  // State management
  let currentState = ConversationState.WELCOME;
  let conversationHistory = [];
  let userData = {
    petName: null,
    petType: null,
    petBreed: null,
    petAge: null,
    weight: null,
    pinCode: null,
    isHealthy: null,
    isVaccinated: null,
    selectedPlan: null,
    customerName: null,
    customerEmail: null,
    customerPhone: null,
    customerAddress: null,
    customerPan: null,
  };
  let quoteData = null;
  let policyData = null;

  // Main GuavasureInsurance object
  window.GuavasureInsurance = {
    openModal: function () {
      const modal = document.getElementById('guavasure-insurance-modal');
      if (modal) {
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.initializeChat();
      }
    },

    closeModal: function () {
      const modal = document.getElementById('guavasure-insurance-modal');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        this.resetChat();
      }
    },

    initializeChat: function () {
      const modalBody = document.getElementById('guavasure-modal-body');
      if (!modalBody) return;

      // Clear existing content
      modalBody.innerHTML = '';
      conversationHistory = [];
      currentState = ConversationState.WELCOME;

      // Add welcome message
      setTimeout(() => {
        this.addMilaMessage(
          "Hi there! 👋 I'm Mila, your pet insurance assistant. I'm here to help you find the perfect insurance plan for your furry friend!"
        );
        setTimeout(() => {
          this.addMilaMessage(
            "Let's get started! First, I'd love to know your pet's name."
          );
          setTimeout(() => {
            this.askPetName();
          }, 1000);
        }, 1500);
      }, 500);
    },

    resetChat: function () {
      currentState = ConversationState.WELCOME;
      conversationHistory = [];
      userData = {
        petName: null,
        petType: null,
        petBreed: null,
        petAge: null,
        weight: null,
        pinCode: null,
        isHealthy: null,
        isVaccinated: null,
        selectedPlan: null,
        customerName: null,
        customerEmail: null,
        customerPhone: null,
        customerAddress: null,
        customerPan: null,
      };
      quoteData = null;
      policyData = null;
    },

    addMilaMessage: function (text, options = {}) {
      const modalBody = document.getElementById('guavasure-modal-body');
      if (!modalBody) return;

      const messageDiv = document.createElement('div');
      messageDiv.className = 'chat-message mila-message';

      const avatar = document.createElement('div');
      avatar.className = 'message-avatar';
      avatar.textContent = '🐾';

      const content = document.createElement('div');
      content.className = 'message-content';

      const bubble = document.createElement('div');
      bubble.className = 'message-bubble';
      bubble.innerHTML = text;

      content.appendChild(bubble);
      messageDiv.appendChild(avatar);
      messageDiv.appendChild(content);

      modalBody.appendChild(messageDiv);
      this.scrollToBottom();

      conversationHistory.push({ role: 'mila', text });
    },

    addUserMessage: function (text) {
      const modalBody = document.getElementById('guavasure-modal-body');
      if (!modalBody) return;

      const messageDiv = document.createElement('div');
      messageDiv.className = 'chat-message user-message';

      const avatar = document.createElement('div');
      avatar.className = 'message-avatar';
      avatar.textContent = '👤';

      const content = document.createElement('div');
      content.className = 'message-content';

      const bubble = document.createElement('div');
      bubble.className = 'message-bubble';
      bubble.textContent = text;

      content.appendChild(bubble);
      messageDiv.appendChild(avatar);
      messageDiv.appendChild(content);

      modalBody.appendChild(messageDiv);
      this.scrollToBottom();

      conversationHistory.push({ role: 'user', text });
    },

    showTypingIndicator: function () {
      const modalBody = document.getElementById('guavasure-modal-body');
      if (!modalBody) return;

      const typingDiv = document.createElement('div');
      typingDiv.className = 'chat-message mila-message typing-indicator';
      typingDiv.id = 'typing-indicator';

      const avatar = document.createElement('div');
      avatar.className = 'message-avatar';
      avatar.textContent = '🐾';

      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'typing-dots';

      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        dotsContainer.appendChild(dot);
      }

      typingDiv.appendChild(avatar);
      typingDiv.appendChild(dotsContainer);
      modalBody.appendChild(typingDiv);
      this.scrollToBottom();
    },

    hideTypingIndicator: function () {
      const typingIndicator = document.getElementById('typing-indicator');
      if (typingIndicator) {
        typingIndicator.remove();
      }
    },

    scrollToBottom: function () {
      const modalBody = document.getElementById('guavasure-modal-body');
      if (modalBody) {
        setTimeout(() => {
          modalBody.scrollTop = modalBody.scrollHeight;
        }, 100);
      }
    },

    // Question: Pet Name
    askPetName: function () {
      currentState = ConversationState.PET_NAME;
      this.addMilaMessage("What's your pet's name?");

      const modalBody = document.getElementById('guavasure-modal-body');
      const inputDiv = document.createElement('div');
      inputDiv.className = 'chat-input-container';

      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'pet-name-input';
      input.placeholder = "Enter your pet's name";
      inputDiv.appendChild(input);

      modalBody.appendChild(inputDiv);

      const submitButton = document.createElement('button');
      submitButton.className = 'chat-submit-button';
      submitButton.textContent = 'Continue';
      submitButton.onclick = () => {
        const petName = input.value.trim();
        if (!petName) {
          alert("Please enter your pet's name");
          return;
        }
        this.handlePetNameSelection(petName);
      };
      modalBody.appendChild(submitButton);

      this.scrollToBottom();
      input.focus();
    },

    handlePetNameSelection: function (petName) {
      userData.petName = petName;
      this.addUserMessage(petName);

      // Remove input elements
      document.querySelector('.chat-input-container')?.remove();
      document.querySelector('.chat-submit-button')?.remove();

      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMilaMessage(
          `What a lovely name! ${petName} is lucky to have you! 💕`
        );
        setTimeout(() => {
          this.addMilaMessage(
            "Now, I'll ask you a few questions to create a personalized quote."
          );
          setTimeout(() => {
            this.askPetType();
          }, 1000);
        }, 1500);
      }, 1000);
    },

    // Question: Pet Type
    askPetType: function () {
      currentState = ConversationState.PET_TYPE;
      this.addMilaMessage(`What type of pet is ${userData.petName}?`);

      const modalBody = document.getElementById('guavasure-modal-body');
      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'chat-options';

      ['🐕 Dog', '🐈 Cat'].forEach((option) => {
        const button = document.createElement('button');
        button.className = 'chat-option-button';
        button.textContent = option;
        button.onclick = () => {
          const petType = option.includes('Dog') ? 'dog' : 'cat';
          this.handlePetTypeSelection(petType);
        };
        optionsDiv.appendChild(button);
      });

      modalBody.appendChild(optionsDiv);
      this.scrollToBottom();
    },

    handlePetTypeSelection: function (petType) {
      userData.petType = petType;
      this.addUserMessage(petType === 'dog' ? '🐕 Dog' : '🐈 Cat');

      // Remove options
      const options = document.querySelector('.chat-options');
      if (options) options.remove();

      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMilaMessage(
          `Great! ${
            petType === 'dog' ? 'Dogs' : 'Cats'
          } are wonderful companions! 🎉`
        );
        setTimeout(() => {
          this.askPetBreed();
        }, 1000);
      }, 1500);
    },

    // Question: Pet Breed
    askPetBreed: function () {
      currentState = ConversationState.PET_BREED;
      this.addMilaMessage(`What breed is ${userData.petName}?`);

      const modalBody = document.getElementById('guavasure-modal-body');
      const breedDiv = document.createElement('div');
      breedDiv.className = 'chat-input-container';

      const select = document.createElement('select');
      select.id = 'breed-select';

      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Select breed...';
      select.appendChild(placeholder);

      const breeds = userData.petType === 'dog' ? dogBreeds : catBreeds;
      breeds.forEach((breed) => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed;
        select.appendChild(option);
      });

      select.addEventListener('change', (e) => {
        if (e.target.value === 'Other') {
          this.showCustomBreedInput();
        }
      });

      breedDiv.appendChild(select);
      modalBody.appendChild(breedDiv);

      const submitButton = document.createElement('button');
      submitButton.className = 'chat-submit-button';
      submitButton.textContent = 'Continue';
      submitButton.onclick = () => {
        const selectedBreed = select.value;
        if (!selectedBreed) {
          alert('Please select a breed');
          return;
        }
        if (selectedBreed === 'Other') {
          this.showCustomBreedInput();
        } else {
          this.handleBreedSelection(selectedBreed);
        }
      };
      modalBody.appendChild(submitButton);

      this.scrollToBottom();
    },

    showCustomBreedInput: function () {
      // Remove select and button
      document.querySelector('.chat-input-container')?.remove();
      document.querySelector('.chat-submit-button')?.remove();

      currentState = ConversationState.PET_BREED_CUSTOM;
      this.addMilaMessage(`Please type ${userData.petName}'s breed:`);

      const modalBody = document.getElementById('guavasure-modal-body');
      const inputDiv = document.createElement('div');
      inputDiv.className = 'breed-input-wrapper';

      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'custom-breed-input';
      input.placeholder = 'Enter breed name...';
      inputDiv.appendChild(input);

      modalBody.appendChild(inputDiv);

      const submitButton = document.createElement('button');
      submitButton.className = 'chat-submit-button';
      submitButton.textContent = 'Continue';
      submitButton.onclick = () => {
        const breed = input.value.trim();
        if (!breed) {
          alert('Please enter a breed');
          return;
        }
        this.handleBreedSelection(breed);
      };
      modalBody.appendChild(submitButton);

      this.scrollToBottom();
      input.focus();
    },

    handleBreedSelection: function (breed) {
      userData.petBreed = breed;
      this.addUserMessage(breed);

      // Remove input elements
      document.querySelector('.chat-input-container')?.remove();
      document.querySelector('.breed-input-wrapper')?.remove();
      document.querySelector('.chat-submit-button')?.remove();

      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMilaMessage(`Lovely! ${breed}s are amazing! 🌟`);
        setTimeout(() => {
          this.askPetAge();
        }, 1000);
      }, 1500);
    },

    // Question: Pet Age
    askPetAge: function () {
      currentState = ConversationState.PET_AGE;
      this.addMilaMessage(`How old is ${userData.petName}?`);

      const modalBody = document.getElementById('guavasure-modal-body');
      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'chat-options';

      const ageOptions = [
        '6 months - 1 year',
        '2 years',
        '3 years',
        '4 years',
        '5 years',
      ];

      ageOptions.forEach((age) => {
        const button = document.createElement('button');
        button.className = 'chat-option-button';
        button.textContent = age;
        button.onclick = () => {
          this.handleAgeSelection(age);
        };
        optionsDiv.appendChild(button);
      });

      modalBody.appendChild(optionsDiv);
      this.scrollToBottom();
    },

    handleAgeSelection: function (age) {
      userData.petAge = age;
      this.addUserMessage(age);

      // Remove options
      document.querySelector('.chat-options')?.remove();

      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMilaMessage(
          'Great! Now let me know about their weight. Approximate is fine.'
        );
        setTimeout(() => {
          this.askPetWeight();
        }, 1000);
      }, 1000);
    },

    // Question: Pet Weight
    askPetWeight: function () {
      currentState = ConversationState.PET_WEIGHT;
      this.addMilaMessage(`What is ${userData.petName}'s weight in kilograms?`);

      const modalBody = document.getElementById('guavasure-modal-body');
      const inputDiv = document.createElement('div');
      inputDiv.className = 'chat-input-container';

      const input = document.createElement('input');
      input.type = 'number';
      input.id = 'weight-input';
      input.placeholder = 'Enter weight in kg';
      input.min = '0';
      input.step = '0.1';
      inputDiv.appendChild(input);

      modalBody.appendChild(inputDiv);

      const submitButton = document.createElement('button');
      submitButton.className = 'chat-submit-button';
      submitButton.textContent = 'Continue';
      submitButton.onclick = () => {
        const weight = input.value.trim();
        if (!weight || parseFloat(weight) <= 0) {
          alert('Please enter a valid weight');
          return;
        }
        this.handleWeightSelection(weight);
      };
      modalBody.appendChild(submitButton);

      this.scrollToBottom();
      input.focus();
    },

    handleWeightSelection: function (weight) {
      userData.weight = weight;
      this.addUserMessage(`${weight} kg`);

      // Remove input elements
      document.querySelector('.chat-input-container')?.remove();
      document.querySelector('.chat-submit-button')?.remove();

      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMilaMessage('Perfect! Now I need your location.');
        setTimeout(() => {
          this.askPinCode();
        }, 1000);
      }, 1000);
    },

    // Question: Pin Code
    askPinCode: function () {
      currentState = ConversationState.PIN_CODE;
      this.addMilaMessage("What's your PIN code?");

      const modalBody = document.getElementById('guavasure-modal-body');
      const inputDiv = document.createElement('div');
      inputDiv.className = 'chat-input-container';

      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'pin-code-input';
      input.placeholder = 'Enter 6-digit PIN code';
      input.maxLength = 6;
      input.pattern = '[0-9]{6}';
      inputDiv.appendChild(input);

      modalBody.appendChild(inputDiv);

      const submitButton = document.createElement('button');
      submitButton.className = 'chat-submit-button';
      submitButton.textContent = 'Continue';
      submitButton.onclick = () => {
        const pinCode = input.value.trim();
        if (!pinCode || pinCode.length !== 6 || !/^\d{6}$/.test(pinCode)) {
          alert('Please enter a valid 6-digit PIN code');
          return;
        }
        this.handlePinCodeSubmit(pinCode);
      };
      modalBody.appendChild(submitButton);

      this.scrollToBottom();
      input.focus();
    },

    handlePinCodeSubmit: function (pinCode) {
      userData.pinCode = pinCode;
      this.addUserMessage(pinCode);

      // Remove input elements
      document.querySelector('.chat-input-container')?.remove();
      document.querySelector('.chat-submit-button')?.remove();

      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMilaMessage("Got it! Now, let me ask about your pet's health.");
        setTimeout(() => {
          this.askPetHealth();
        }, 1000);
      }, 1000);
    },

    // Question: Pet Health
    askPetHealth: function () {
      currentState = ConversationState.PET_HEALTH;
      this.addMilaMessage(`Is ${userData.petName} sound and healthy?`);

      const modalBody = document.getElementById('guavasure-modal-body');
      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'chat-options';

      [
        `✅ Yes, ${userData.petName} is healthy`,
        '⚠️ No, there are some issues',
      ].forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'chat-option-button';
        button.textContent = option;
        button.onclick = () => {
          this.handleHealthSelection(index === 0);
        };
        optionsDiv.appendChild(button);
      });

      modalBody.appendChild(optionsDiv);
      this.scrollToBottom();
    },

    handleHealthSelection: function (isHealthy) {
      userData.isHealthy = isHealthy;
      this.addUserMessage(
        isHealthy
          ? `✅ Yes, ${userData.petName} is healthy`
          : '⚠️ No, there are some issues'
      );

      // Remove options
      document.querySelector('.chat-options')?.remove();

      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        if (!isHealthy) {
          this.addMilaMessage(
            "I understand. We'll take that into consideration for your quote."
          );
        } else {
          this.addMilaMessage("That's wonderful to hear! 🎉");
        }
        setTimeout(() => {
          this.askVaccinations();
        }, 1000);
      }, 1000);
    },

    // Question: Vaccinations
    askVaccinations: function () {
      currentState = ConversationState.VACCINATIONS;
      this.addMilaMessage(
        `Is ${userData.petName} vaccinated for the following diseases?`
      );

      const modalBody = document.getElementById('guavasure-modal-body');
      const vaccinationList = document.createElement('div');
      vaccinationList.className = 'vaccination-list';
      vaccinationList.innerHTML = `
        • Rabies<br>
        • Distemper<br>
        • Hepatitis<br>
        • Adenovirus<br>
        • Leptospirosis<br>
        • Parainfluenza<br>
        • Coronavirus<br>
        • Parvovirus
      `;
      modalBody.appendChild(vaccinationList);

      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'chat-options';

      [
        '✅ Yes, all vaccinations are up to date',
        '❌ No, not all are complete',
      ].forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'chat-option-button';
        button.textContent = option;
        button.onclick = () => {
          this.handleVaccinationSelection(index === 0);
        };
        optionsDiv.appendChild(button);
      });

      modalBody.appendChild(optionsDiv);
      this.scrollToBottom();
    },

    handleVaccinationSelection: function (isVaccinated) {
      userData.isVaccinated = isVaccinated;
      this.addUserMessage(
        isVaccinated
          ? '✅ Yes, all vaccinations are up to date'
          : '❌ No, not all are complete'
      );

      // Remove options and vaccination list
      document.querySelector('.chat-options')?.remove();
      document.querySelector('.vaccination-list')?.remove();

      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMilaMessage(
          'Perfect! I have all the information I need. Let me generate a personalized quote for you! 🎯'
        );
        setTimeout(() => {
          this.generateQuote();
        }, 1500);
      }, 1000);
    },

    // Generate Quote
    generateQuote: async function () {
      currentState = ConversationState.GENERATING_QUOTE;

      this.showTypingIndicator();

      try {
        // Prepare quote request data
        const quoteRequest = {
          petName: userData.petName,
          petType: userData.petType,
          breed: userData.petBreed,
          age: userData.petAge,
          weight: userData.weight,
          pinCode: userData.pinCode,
          isHealthy: userData.isHealthy,
          isVaccinated: userData.isVaccinated,
        };

        // Call quote API
        const response = await fetch(`${API_BASE_URL}/api/quote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(quoteRequest),
        });

        if (!response.ok) throw new Error('Failed to generate quote');

        quoteData = await response.json();

        this.hideTypingIndicator();
        this.displayQuote();
      } catch (error) {
        console.error('Quote generation error:', error);
        this.hideTypingIndicator();
        this.addMilaMessage(
          "I'm sorry, I couldn't generate a quote right now. Please try again later."
        );
      }
    },

    // Display Quote
    displayQuote: function () {
      currentState = ConversationState.QUOTE_DISPLAY;

      this.addMilaMessage(
        `Great news! I've created personalized insurance plans for ${userData.petName}. Here are your options:`
      );

      const modalBody = document.getElementById('guavasure-modal-body');

      // Monthly Plan
      const monthlyCard = this.createQuoteCard({
        type: 'Monthly Plan',
        price: quoteData.premium.monthly,
        period: '/month',
        badge: null,
        planType: 'monthly',
      });
      modalBody.appendChild(monthlyCard);

      // Annual Plan
      const savings = (
        quoteData.premium.monthly * 12 -
        quoteData.premium.yearly
      ).toFixed(0);
      const annualCard = this.createQuoteCard({
        type: 'Annual Plan',
        price: quoteData.premium.yearly,
        period: '/year',
        badge: '💰 Best Value',
        savings: `Save ₹${savings}/year`,
        planType: 'yearly',
      });
      modalBody.appendChild(annualCard);

      this.scrollToBottom();
    },

    createQuoteCard: function (options) {
      const card = document.createElement('div');
      card.className = 'quote-card';

      const header = document.createElement('div');
      header.className = 'quote-card-header';

      const planType = document.createElement('div');
      planType.className = 'quote-plan-type';
      planType.textContent = options.type;
      header.appendChild(planType);

      if (options.badge) {
        const badge = document.createElement('div');
        badge.className = 'quote-badge';
        badge.textContent = options.badge;
        header.appendChild(badge);
      }

      card.appendChild(header);

      const price = document.createElement('div');
      price.className = 'quote-price';
      price.innerHTML = `₹${options.price}<span>${options.period}</span>`;
      card.appendChild(price);

      if (options.savings) {
        const savings = document.createElement('div');
        savings.className = 'quote-savings';
        savings.textContent = options.savings;
        card.appendChild(savings);
      }

      const features = document.createElement('ul');
      features.className = 'quote-features';
      features.innerHTML = `
        <li>Accident Coverage: ${quoteData.coverage.accidentCoverage}</li>
        <li>Illness Coverage: ${quoteData.coverage.illnessCoverage}</li>
        <li>Wellness Care: ${quoteData.coverage.wellnessCoverage}</li>
        <li>Emergency Care: ${quoteData.coverage.emergencyCare}</li>
      `;
      card.appendChild(features);

      const selectButton = document.createElement('button');
      selectButton.className = 'quote-select-button';
      selectButton.textContent = 'Select This Plan';
      selectButton.onclick = () => {
        this.handlePlanSelection(options.planType);
      };
      card.appendChild(selectButton);

      return card;
    },

    handlePlanSelection: function (planType) {
      userData.selectedPlan = planType;
      const planName = planType === 'monthly' ? 'Monthly Plan' : 'Annual Plan';
      const price =
        planType === 'monthly'
          ? quoteData.premium.monthly
          : quoteData.premium.yearly;

      this.addUserMessage(`Selected: ${planName} - ₹${price}`);

      // Remove quote cards
      document.querySelectorAll('.quote-card').forEach((card) => card.remove());

      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMilaMessage(
          `Excellent choice! 🎉 The ${planName} is a great option. Now let's complete your purchase.`
        );
        setTimeout(() => {
          this.addMilaMessage(
            "I'll need a few more details to finalize everything."
          );
          setTimeout(() => {
            this.askCheckoutName();
          }, 1000);
        }, 1500);
      }, 1000);
    },

    // Checkout: Name
    askCheckoutName: function () {
      currentState = ConversationState.CHECKOUT_NAME;
      this.addMilaMessage("What's the pet parent's full name?");

      const modalBody = document.getElementById('guavasure-modal-body');
      const inputDiv = document.createElement('div');
      inputDiv.className = 'chat-input-container';

      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'name-input';
      input.placeholder = 'Enter full name';
      inputDiv.appendChild(input);

      modalBody.appendChild(inputDiv);

      const submitButton = document.createElement('button');
      submitButton.className = 'chat-submit-button';
      submitButton.textContent = 'Continue';
      submitButton.onclick = () => {
        const name = input.value.trim();
        if (!name) {
          alert('Please enter your name');
          return;
        }
        this.handleNameSubmit(name);
      };
      modalBody.appendChild(submitButton);

      this.scrollToBottom();
      input.focus();
    },

    handleNameSubmit: function (name) {
      userData.customerName = name;
      this.addUserMessage(name);

      // Remove input elements
      document.querySelector('.chat-input-container')?.remove();
      document.querySelector('.chat-submit-button')?.remove();

      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMilaMessage(`Nice to meet you, ${name}! 👋`);
        setTimeout(() => {
          this.askCheckoutAddress();
        }, 1000);
      }, 800);
    },

    // Checkout: Address
    askCheckoutAddress: function () {
      currentState = ConversationState.CHECKOUT_ADDRESS;
      this.addMilaMessage("What's your complete address?");

      const modalBody = document.getElementById('guavasure-modal-body');
      const inputDiv = document.createElement('div');
      inputDiv.className = 'chat-input-container';

      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'address-input';
      input.placeholder = 'Enter your complete address';
      inputDiv.appendChild(input);

      modalBody.appendChild(inputDiv);

      const submitButton = document.createElement('button');
      submitButton.className = 'chat-submit-button';
      submitButton.textContent = 'Continue';
      submitButton.onclick = () => {
        const address = input.value.trim();
        if (!address) {
          alert('Please enter your address');
          return;
        }
        this.handleAddressSubmit(address);
      };
      modalBody.appendChild(submitButton);

      this.scrollToBottom();
      input.focus();
    },

    handleAddressSubmit: function (address) {
      userData.customerAddress = address;
      this.addUserMessage(address);

      // Remove input elements
      document.querySelector('.chat-input-container')?.remove();
      document.querySelector('.chat-submit-button')?.remove();

      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMilaMessage('Thank you! One more thing...');
        setTimeout(() => {
          this.askCheckoutPAN();
        }, 1000);
      }, 800);
    },

    // Checkout: PAN Card
    askCheckoutPAN: function () {
      currentState = ConversationState.CHECKOUT_PAN;
      this.addMilaMessage(
        'Please provide your PAN card number for verification.'
      );

      const modalBody = document.getElementById('guavasure-modal-body');
      const inputDiv = document.createElement('div');
      inputDiv.className = 'chat-input-container';

      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'pan-input';
      input.placeholder = 'Enter PAN number (e.g., ABCDE1234F)';
      input.maxLength = 10;
      input.style.textTransform = 'uppercase';
      inputDiv.appendChild(input);

      modalBody.appendChild(inputDiv);

      const submitButton = document.createElement('button');
      submitButton.className = 'chat-submit-button';
      submitButton.textContent = 'Complete Purchase';
      submitButton.onclick = () => {
        const pan = input.value.trim().toUpperCase();
        if (!pan || pan.length !== 10) {
          alert('Please enter a valid 10-character PAN number');
          return;
        }
        this.handlePANSubmit(pan);
      };
      modalBody.appendChild(submitButton);

      this.scrollToBottom();
      input.focus();
    },

    handlePANSubmit: function (pan) {
      userData.customerPan = pan;
      this.addUserMessage(pan);

      // Remove input elements
      document.querySelector('.chat-input-container')?.remove();
      document.querySelector('.chat-submit-button')?.remove();

      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addMilaMessage(
          'Perfect! I have everything I need. Let me process your purchase now... 🎉'
        );
        setTimeout(() => {
          this.processPayment();
        }, 1500);
      }, 1000);
    },

    // Process Payment
    processPayment: async function () {
      currentState = ConversationState.PROCESSING_PAYMENT;
      this.showTypingIndicator();

      try {
        // Create checkout session
        const checkoutResponse = await fetch(`${API_BASE_URL}/api/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quoteId: quoteData.quoteId,
            paymentMethod: 'card',
            billingCycle: userData.selectedPlan,
            shop: SHOP_DOMAIN,
            customerName: userData.customerName,
            customerAddress: userData.customerAddress,
            customerPan: userData.customerPan,
          }),
        });

        if (!checkoutResponse.ok) throw new Error('Failed to create checkout');

        const checkoutSession = await checkoutResponse.json();

        // Simulate payment processing
        const paymentToken = 'tok_' + Math.random().toString(36).substr(2, 9);

        const paymentResponse = await fetch(
          `${API_BASE_URL}/api/checkout/complete`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId: checkoutSession.sessionId,
              paymentToken: paymentToken,
              customerEmail: userData.customerEmail || 'customer@example.com',
            }),
          }
        );

        if (!paymentResponse.ok) throw new Error('Payment failed');

        policyData = await paymentResponse.json();

        this.hideTypingIndicator();
        this.displayPolicySuccess();
      } catch (error) {
        console.error('Payment error:', error);
        this.hideTypingIndicator();
        this.addMilaMessage(
          "I'm sorry, there was an issue processing your payment. Please try again."
        );
      }
    },

    // Display Policy Success
    displayPolicySuccess: function () {
      currentState = ConversationState.POLICY_COMPLETE;

      this.addMilaMessage(
        `🎉 Congratulations! ${userData.petName}'s insurance policy is now active!`
      );

      const modalBody = document.getElementById('guavasure-modal-body');

      const successDiv = document.createElement('div');
      successDiv.className = 'success-message';
      successDiv.innerHTML = `
        <div class="success-icon">✅</div>
        <div class="success-title">Policy Activated!</div>
        <div class="success-subtitle">${userData.petName} is now protected</div>
      `;
      modalBody.appendChild(successDiv);

      const policyCard = document.createElement('div');
      policyCard.className = 'policy-card';
      policyCard.innerHTML = `
        <div class="policy-row">
          <span class="policy-label">Policy Number</span>
          <span class="policy-value">${policyData.policyId}</span>
        </div>
        <div class="policy-row">
          <span class="policy-label">Coverage Start</span>
          <span class="policy-value">${new Date(
            policyData.policyStartDate
          ).toLocaleDateString()}</span>
        </div>
        <div class="policy-row">
          <span class="policy-label">Coverage End</span>
          <span class="policy-value">${new Date(
            policyData.policyEndDate
          ).toLocaleDateString()}</span>
        </div>
        <div class="policy-row">
          <span class="policy-label">Amount Paid</span>
          <span class="policy-value">₹${policyData.paidAmount} ${
        policyData.currency
      }</span>
        </div>
      `;
      modalBody.appendChild(policyCard);

      setTimeout(() => {
        this.addMilaMessage(
          '📧 Policy documents have been sent to your email. You can also download them anytime from your dashboard.'
        );
        setTimeout(() => {
          this.addMilaMessage(
            "Thank you for choosing Guavasure! If you need any help, I'm always here. 💚"
          );
        }, 1500);
      }, 1500);

      this.scrollToBottom();
    },
  };

  // Close modal on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      GuavasureInsurance.closeModal();
    }
  });

  console.log('🛡️ Guavasure Insurance Modal with Mila loaded');
})();
