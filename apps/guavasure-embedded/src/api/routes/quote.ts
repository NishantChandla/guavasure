/**
 * Insurance Quote API
 * Calculates premium based on pet details
 */

import express from 'express';

const router = express.Router();

// Mock premium calculation logic
const calculatePremium = (petDetails: any): number => {
  let basePremium = 500; // Base premium in currency units

  // Age factor
  if (petDetails.age > 7) basePremium *= 1.5;
  else if (petDetails.age > 3) basePremium *= 1.2;

  // Pre-existing diseases factor
  if (petDetails.preExistingDiseases?.length > 0) {
    basePremium *= 1.3;
  }

  // Health status
  if (!petDetails.isHealthyNow) {
    basePremium *= 1.4;
  }

  // Vaccination status
  if (petDetails.isVaccinated) {
    basePremium *= 0.9; // 10% discount
  }

  return Math.round(basePremium);
};

/**
 * Get Insurance Quote
 * POST /api/quote
 * Body: { petName, breed, age, weight, isVaccinated, preExistingDiseases, isHealthyNow }
 */
router.post('/', async (req, res) => {
  try {
    const {
      petName,
      breed,
      age,
      weight,
      isVaccinated,
      preExistingDiseases,
      isHealthyNow,
    } = req.body;

    // Validate required fields
    if (!petName || !breed || !age || !weight) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['petName', 'breed', 'age', 'weight'],
      });
    }

    // Calculate premium
    const premium = calculatePremium({
      age,
      preExistingDiseases,
      isHealthyNow,
      isVaccinated,
    });

    // Mock quote response
    const quote = {
      quoteId: `QUOTE-${Date.now()}`,
      petDetails: {
        petName,
        breed,
        age,
        weight,
        isVaccinated,
        preExistingDiseases,
        isHealthyNow,
      },
      premium: {
        monthly: premium,
        yearly: Math.round(premium * 12 * 0.9), // 10% discount on yearly
        currency: 'USD',
      },
      coverage: {
        accidentCoverage: '$50,000',
        illnessCoverage: '$30,000',
        wellnessCoverage: '$2,000',
        emergencyCare: 'Included',
      },
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Valid for 7 days
      timestamp: new Date().toISOString(),
    };

    console.log(
      `📋 Quote generated for ${petName} (${breed}) - $${premium}/month`
    );

    return res.json(quote);
  } catch (error: any) {
    console.error('Quote generation error:', error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Get Quote by ID
 * GET /api/quote/:quoteId
 */
router.get('/:quoteId', async (req, res) => {
  const { quoteId } = req.params;

  // Mock: In production, fetch from database
  return res.json({
    quoteId,
    message: 'Quote retrieval - implement database lookup',
    status: 'active',
  });
});

export default router;
