/**
 * Guavasure Pet Insurance Modal
 * Handles multi-step form, quote generation, payment, and policy display
 */

(function () {
  'use strict';

  // Configuration
  const API_BASE_URL = 'http://localhost:3000';
  const SHOP_DOMAIN = window.Shopify?.shop || '';

  // State management
  let currentStep = 1;
  let petData = {};
  let quoteData = null;
  let checkoutSession = null;
  let policyData = null;

  // Main GuavasureInsurance object
  window.GuavasureInsurance = {
    openModal: function () {
      const modal = document.getElementById('guavasure-insurance-modal');
      if (modal) {
        modal.style.display = 'none'; // Ensure modal is hidden initially
        document.body.appendChild(modal); // Move modal to the end of the body
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.showStep(1);
      }
      const modalContent = document.querySelector('.guavasure-modal-content');

      modalContent.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = modalContent;

        // If user is near the bottom (within 5px)
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          modalContent.classList.add('scrolled-to-bottom');
        } else {
          modalContent.classList.remove('scrolled-to-bottom');
        }
      });
    },

    closeModal: function () {
      const modal = document.getElementById('guavasure-insurance-modal');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        this.resetForm();
      }
    },

    showStep: function (step) {
      currentStep = step;
      this.updateProgressSteps(step);

      const modalBody = document.getElementById('guavasure-modal-body');
      if (!modalBody) return;

      switch (step) {
        case 1:
          modalBody.innerHTML = this.renderPetDetailsForm();
          break;
        case 2:
          modalBody.innerHTML = this.renderQuoteDisplay();
          break;
        case 3:
          modalBody.innerHTML = this.renderPaymentForm();
          break;
        case 4:
          modalBody.innerHTML = this.renderPolicyDisplay();
          break;
      }
    },

    updateProgressSteps: function (activeStep) {
      const steps = document.querySelectorAll('.guavasure-step');
      steps.forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber < activeStep) {
          step.classList.add('completed');
          step.classList.remove('active');
        } else if (stepNumber === activeStep) {
          step.classList.add('active');
          step.classList.remove('completed');
        } else {
          step.classList.remove('active', 'completed');
        }
      });
    },

    renderPetDetailsForm: function () {
      return `
        <div class="guavasure-form-container">
          <h2 class="guavasure-form-title">Tell Us About Your Pet</h2>
          <p class="guavasure-form-subtitle">We'll use this information to generate your personalized insurance quote</p>
          
          <form id="pet-details-form" class="guavasure-form">
            <div class="guavasure-form-group">
              <label for="petName">Pet's Name *</label>
              <input 
                type="text" 
                id="petName" 
                name="petName" 
                required 
                placeholder="e.g., Max, Bella"
                value="${petData.petName || ''}"
              />
            </div>

            <div class="guavasure-form-row">
              <div class="guavasure-form-group">
                <label for="petType">Pet Type *</label>
                <select id="petType" name="petType" required>
                  <option value="">Select type</option>
                  <option value="dog" ${
                    petData.petType === 'dog' ? 'selected' : ''
                  }>Dog</option>
                  <option value="cat" ${
                    petData.petType === 'cat' ? 'selected' : ''
                  }>Cat</option>
                  <option value="other" ${
                    petData.petType === 'other' ? 'selected' : ''
                  }>Other</option>
                </select>
              </div>

              <div class="guavasure-form-group">
                <label for="breed">Breed *</label>
                <input 
                  type="text" 
                  id="breed" 
                  name="breed" 
                  required 
                  placeholder="e.g., Golden Retriever"
                  value="${petData.breed || ''}"
                />
              </div>
            </div>

            <div class="guavasure-form-row">
              <div class="guavasure-form-group">
                <label for="age">Age (years) *</label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  required 
                  min="0" 
                  max="30" 
                  step="0.5"
                  placeholder="e.g., 3"
                  value="${petData.age || ''}"
                />
              </div>

              <div class="guavasure-form-group">
                <label for="weight">Weight (lbs) *</label>
                <input 
                  type="number" 
                  id="weight" 
                  name="weight" 
                  required 
                  min="1" 
                  max="300"
                  placeholder="e.g., 45"
                  value="${petData.weight || ''}"
                />
              </div>
            </div>

            <div class="guavasure-form-group">
              <label class="guavasure-checkbox-label">
                <input 
                  type="checkbox" 
                  id="isVaccinated" 
                  name="isVaccinated"
                  ${petData.isVaccinated ? 'checked' : ''}
                />
                <span>My pet is up-to-date with vaccinations</span>
              </label>
            </div>

            <div class="guavasure-form-group">
              <label class="guavasure-checkbox-label">
                <input 
                  type="checkbox" 
                  id="isHealthyNow" 
                  name="isHealthyNow"
                  ${petData.isHealthyNow ? 'checked' : ''}
                />
                <span>My pet is in sound health (no current illnesses or injuries)</span>
              </label>
            </div>

            <div class="guavasure-form-group">
              <label for="preExistingDiseases">Pre-existing Conditions (if any)</label>
              <textarea 
                id="preExistingDiseases" 
                name="preExistingDiseases" 
                rows="3"
                placeholder="List any pre-existing conditions, or leave blank if none"
              >${petData.preExistingDiseases || ''}</textarea>
              <small>Separate multiple conditions with commas</small>
            </div>

            <div class="guavasure-form-actions">
              <button type="button" class="guavasure-btn guavasure-btn-secondary" onclick="GuavasureInsurance.closeModal()">
                Cancel
              </button>
              <button type="submit" class="guavasure-btn guavasure-btn-primary">
                Get My Quote →
              </button>
            </div>
          </form>
        </div>
      `;
    },

    renderQuoteDisplay: function () {
      if (!quoteData) {
        return '<div class="guavasure-loading">Generating your quote...</div>';
      }

      return `
        <div class="guavasure-quote-container">
          <div class="guavasure-quote-header">
            <h2 class="guavasure-form-title">Your Personalized Quote</h2>
            <p class="guavasure-form-subtitle">Quote for ${petData.petName} (${
        petData.breed
      })</p>
          </div>

          <div class="guavasure-quote-card">
            <div class="guavasure-premium-section">
              <div class="guavasure-premium-option">
                <div class="premium-label">Monthly Premium</div>
                <div class="premium-price">$${
                  quoteData.premium.monthly
                }<span>/month</span></div>
                <button class="guavasure-btn guavasure-btn-primary" onclick="GuavasureInsurance.selectPlan('monthly')">
                  Choose Monthly
                </button>
              </div>
              
              <div class="guavasure-premium-option recommended">
                <div class="premium-badge">💰 Best Value</div>
                <div class="premium-label">Annual Premium</div>
                <div class="premium-price">$${
                  quoteData.premium.yearly
                }<span>/year</span></div>
                <div class="premium-savings">Save $${
                  quoteData.premium.monthly * 12 - quoteData.premium.yearly
                }/year</div>
                <button class="guavasure-btn guavasure-btn-primary" onclick="GuavasureInsurance.selectPlan('yearly')">
                  Choose Annual
                </button>
              </div>
            </div>

            <div class="guavasure-coverage-details">
              <h3>Coverage Includes:</h3>
              <ul class="coverage-list">
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z"/>
                  </svg>
                  <span><strong>Accident Coverage:</strong> ${
                    quoteData.coverage.accidentCoverage
                  }</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z"/>
                  </svg>
                  <span><strong>Illness Coverage:</strong> ${
                    quoteData.coverage.illnessCoverage
                  }</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z"/>
                  </svg>
                  <span><strong>Wellness Care:</strong> ${
                    quoteData.coverage.wellnessCoverage
                  }</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9z"/>
                  </svg>
                  <span><strong>Emergency Care:</strong> ${
                    quoteData.coverage.emergencyCare
                  }</span>
                </li>
              </ul>
            </div>

            <div class="guavasure-quote-info">
              <p><strong>Quote ID:</strong> ${quoteData.quoteId}</p>
              <p><strong>Valid Until:</strong> ${new Date(
                quoteData.validUntil
              ).toLocaleDateString()}</p>
            </div>
          </div>

          <div class="guavasure-form-actions">
            <button class="guavasure-btn guavasure-btn-secondary" onclick="GuavasureInsurance.showStep(1)">
              ← Back
            </button>
          </div>
        </div>
      `;
    },

    renderPaymentForm: function () {
      if (!checkoutSession) {
        return '<div class="guavasure-loading">Preparing payment...</div>';
      }

      return `
        <div class="guavasure-payment-container">
          <h2 class="guavasure-form-title">Complete Your Purchase</h2>
          <p class="guavasure-form-subtitle">Secure payment processing</p>

          <div class="guavasure-payment-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
              <span>Pet:</span>
              <span>${petData.petName} (${petData.breed})</span>
            </div>
            <div class="summary-row">
              <span>Plan:</span>
              <span>${
                checkoutSession.billingCycle === 'monthly'
                  ? 'Monthly'
                  : 'Annual'
              }</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span>$${checkoutSession.amount} ${
        checkoutSession.currency
      }</span>
            </div>
          </div>

          <form id="payment-form" class="guavasure-form">
            <div class="guavasure-form-group">
              <label for="customerEmail">Email Address *</label>
              <input 
                type="email" 
                id="customerEmail" 
                name="customerEmail" 
                required 
                placeholder="your@email.com"
              />
            </div>

            <div class="guavasure-form-group">
              <label for="cardNumber">Card Number *</label>
              <input 
                type="text" 
                id="cardNumber" 
                name="cardNumber" 
                required 
                placeholder="4242 4242 4242 4242"
                maxlength="19"
              />
            </div>

            <div class="guavasure-form-row">
              <div class="guavasure-form-group">
                <label for="expiryDate">Expiry Date *</label>
                <input 
                  type="text" 
                  id="expiryDate" 
                  name="expiryDate" 
                  required 
                  placeholder="MM/YY"
                  maxlength="5"
                />
              </div>

              <div class="guavasure-form-group">
                <label for="cvv">CVV *</label>
                <input 
                  type="text" 
                  id="cvv" 
                  name="cvv" 
                  required 
                  placeholder="123"
                  maxlength="4"
                />
              </div>
            </div>

            <div class="guavasure-form-group">
              <label class="guavasure-checkbox-label">
                <input 
                  type="checkbox" 
                  id="agreeTerms" 
                  name="agreeTerms"
                  required
                />
                <span>I agree to the <a href="#" target="_blank">terms and conditions</a></span>
              </label>
            </div>

            <div class="guavasure-secure-badge">
              🔒 Secure payment powered by Guavasure
            </div>

            <div class="guavasure-form-actions">
              <button type="button" class="guavasure-btn guavasure-btn-secondary" onclick="GuavasureInsurance.showStep(2)">
                ← Back
              </button>
              <button type="submit" class="guavasure-btn guavasure-btn-primary">
                Complete Purchase →
              </button>
            </div>
          </form>
        </div>
      `;
    },

    renderPolicyDisplay: function () {
      if (!policyData) {
        return '<div class="guavasure-loading">Processing your policy...</div>';
      }

      return `
        <div class="guavasure-success-container">
          <div class="guavasure-success-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" stroke="#10B981" stroke-width="4"/>
              <path d="M25 40L35 50L55 30" stroke="#10B981" stroke-width="4" stroke-linecap="round"/>
            </svg>
          </div>

          <h2 class="guavasure-form-title">Policy Activated! 🎉</h2>
          <p class="guavasure-form-subtitle">Your pet is now protected</p>

          <div class="guavasure-policy-card">
            <h3>Policy Details</h3>
            
            <div class="policy-info-grid">
              <div class="policy-info-item">
                <div class="policy-label">Policy Number</div>
                <div class="policy-value">${policyData.policyId}</div>
              </div>
              
              <div class="policy-info-item">
                <div class="policy-label">Pet</div>
                <div class="policy-value">${petData.petName}</div>
              </div>
              
              <div class="policy-info-item">
                <div class="policy-label">Coverage Start</div>
                <div class="policy-value">${new Date(
                  policyData.policyStartDate
                ).toLocaleDateString()}</div>
              </div>
              
              <div class="policy-info-item">
                <div class="policy-label">Coverage End</div>
                <div class="policy-value">${new Date(
                  policyData.policyEndDate
                ).toLocaleDateString()}</div>
              </div>
              
              <div class="policy-info-item">
                <div class="policy-label">Transaction ID</div>
                <div class="policy-value">${policyData.transactionId}</div>
              </div>
              
              <div class="policy-info-item">
                <div class="policy-label">Amount Paid</div>
                <div class="policy-value">$${policyData.paidAmount} ${
        policyData.currency
      }</div>
              </div>
            </div>

            <div class="guavasure-policy-actions">
              <button class="guavasure-btn guavasure-btn-primary" onclick="GuavasureInsurance.downloadPolicy()">
                📄 Download Policy Document
              </button>
              <button class="guavasure-btn guavasure-btn-secondary" onclick="GuavasureInsurance.emailPolicy()">
                📧 Email Policy
              </button>
            </div>
          </div>

          <div class="guavasure-next-steps">
            <h3>What's Next?</h3>
            <ul>
              <li>✅ Check your email for policy documents</li>
              <li>✅ Download the Guavasure mobile app</li>
              <li>✅ File claims easily anytime</li>
              <li>✅ 24/7 customer support available</li>
            </ul>
          </div>

          <div class="guavasure-form-actions">
            <button class="guavasure-btn guavasure-btn-primary" onclick="GuavasureInsurance.closeModal()">
              Done
            </button>
          </div>
        </div>
      `;
    },

    // Form handlers
    handlePetDetailsSubmit: async function (formData) {
      try {
        // Show loading
        const modalBody = document.getElementById('guavasure-modal-body');
        modalBody.innerHTML =
          '<div class="guavasure-loading">Generating your quote...</div>';

        // Store pet data
        petData = {
          petName: formData.get('petName'),
          petType: formData.get('petType'),
          breed: formData.get('breed'),
          age: parseFloat(formData.get('age')),
          weight: parseFloat(formData.get('weight')),
          isVaccinated: formData.get('isVaccinated') === 'on',
          isHealthyNow: formData.get('isHealthyNow') === 'on',
          preExistingDiseases:
            formData
              .get('preExistingDiseases')
              ?.split(',')
              .map((s) => s.trim())
              .filter(Boolean) || [],
        };

        // Call quote API
        const response = await fetch(`${API_BASE_URL}/api/quote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(petData),
        });

        if (!response.ok) throw new Error('Failed to generate quote');

        quoteData = await response.json();
        this.showStep(2);
      } catch (error) {
        console.error('Quote generation error:', error);
        alert('Failed to generate quote. Please try again.');
        this.showStep(1);
      }
    },

    selectPlan: async function (billingCycle) {
      try {
        const modalBody = document.getElementById('guavasure-modal-body');
        modalBody.innerHTML =
          '<div class="guavasure-loading">Preparing checkout...</div>';

        // Create checkout session
        const response = await fetch(`${API_BASE_URL}/api/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quoteId: quoteData.quoteId,
            paymentMethod: 'card',
            billingCycle: billingCycle,
            shop: SHOP_DOMAIN,
          }),
        });

        if (!response.ok) throw new Error('Failed to create checkout session');

        checkoutSession = await response.json();
        checkoutSession.billingCycle = billingCycle;
        this.showStep(3);
      } catch (error) {
        console.error('Checkout error:', error);
        alert('Failed to prepare checkout. Please try again.');
        this.showStep(2);
      }
    },

    handlePaymentSubmit: async function (formData) {
      try {
        const modalBody = document.getElementById('guavasure-modal-body');
        modalBody.innerHTML =
          '<div class="guavasure-loading">Processing payment...</div>';

        // Mock payment token (in production, use Stripe/PayPal)
        const paymentToken = 'tok_' + Math.random().toString(36).substr(2, 9);

        // Complete payment
        const response = await fetch(`${API_BASE_URL}/api/checkout/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: checkoutSession.sessionId,
            paymentToken: paymentToken,
            customerEmail: formData.get('customerEmail'),
          }),
        });

        if (!response.ok) throw new Error('Payment failed');

        policyData = await response.json();
        this.showStep(4);
      } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed. Please try again.');
        this.showStep(3);
      }
    },

    downloadPolicy: function () {
      alert('Policy document download will start shortly...');
      // In production: Generate PDF and trigger download
    },

    emailPolicy: function () {
      alert('Policy document has been sent to your email!');
      // In production: Send email via backend
    },

    resetForm: function () {
      currentStep = 1;
      petData = {};
      quoteData = null;
      checkoutSession = null;
      policyData = null;
    },
  };

  // Event delegation for form submissions
  document.addEventListener('submit', function (e) {
    if (e.target.id === 'pet-details-form') {
      e.preventDefault();
      const formData = new FormData(e.target);
      GuavasureInsurance.handlePetDetailsSubmit(formData);
    } else if (e.target.id === 'payment-form') {
      e.preventDefault();
      const formData = new FormData(e.target);
      GuavasureInsurance.handlePaymentSubmit(formData);
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      GuavasureInsurance.closeModal();
    }
  });

  console.log('🛡️ Guavasure Insurance Modal loaded');
})();
