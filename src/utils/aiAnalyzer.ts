import Anthropic from '@anthropic-ai/sdk';
import type { BiomarkerData, CalculationResult } from './biologicalAgeCalculator';

interface AIAnalysisResponse {
  biologicalAge: number;
  biomarkerImpacts: {
    telomere: number;
    epigenetic: number;
    crp: number;
    metabolic: number;
    cardiovascular: number;
    mitochondrial: number;
  };
  healthIssues: Array<{
    category: string;
    severity: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    impact: number;
  }>;
  protocolRecommendation: {
    intensity: 'intensive' | 'standard' | 'conservative';
    dosesCount: number;
    durationWeeks: number;
    primaryTargets: string[];
  };
  expectedImprovement: {
    biologicalAgeReduction: number;
    confidence: number;
  };
  reasoning: string;
}

const ANALYSIS_PROMPT = (age: number, biomarkers: BiomarkerData) => `You are an expert longevity scientist analyzing biomarker data to determine biological age.

PATIENT DATA:
- Chronological Age: ${age} years
- Telomere Length: ${biomarkers.telomereLength} kb (optimal for age ${age}: ${(10.5 - age * 0.05).toFixed(1)} kb)
- Epigenetic Age: ${biomarkers.epigeneticAge} years
- C-Reactive Protein (CRP): ${biomarkers.crp} mg/L (optimal: <1.0 mg/L)
- HbA1c: ${biomarkers.hba1c}% (optimal: 4.5-5.6%)
- Fasting Glucose: ${biomarkers.fastingGlucose} mg/dL (optimal: 70-99 mg/dL)
- Total Cholesterol: ${biomarkers.totalCholesterol} mg/dL
- HDL Cholesterol: ${biomarkers.hdl} mg/dL (optimal: >60 mg/dL)
- LDL Cholesterol: ${biomarkers.ldl} mg/dL (optimal: <100 mg/dL)
- White Blood Cells: ${biomarkers.wbc} cells/μL (normal: 4,000-11,000)
- Mitochondrial DNA: ${biomarkers.mitochondrialDNA} copies (optimal: 1,400-1,800)

Based on peer-reviewed research on biological aging (Horvath clocks, PhenoAge, GrimAge models), inflammation studies, telomere research, and metabolic aging literature:

1. Calculate the patient's BIOLOGICAL AGE considering:
   - Epigenetic age is the most direct measure (1:1 correlation)
   - Telomere attrition (research shows ~0.1-0.2 years per 1% deviation from optimal)
   - Chronic inflammation (CRP elevation accelerates cellular aging)
   - Metabolic dysfunction (HbA1c, glucose impact insulin sensitivity and aging)
   - Cardiovascular markers (HDL/LDL ratios affect vascular aging)
   - Mitochondrial function (mtDNA copy number indicates cellular energy capacity)

2. For EACH biomarker, estimate its SPECIFIC CONTRIBUTION to biological age in years (can be 0 if optimal).

3. Identify TOP health issues by severity (high/medium/low).

4. Recommend mRNA telomerase therapy PROTOCOL INTENSITY:
   - Intensive: 10-14 doses, 24-32 weeks (for 2+ high severity issues)
   - Standard: 6-9 doses, 16-24 weeks (for 1 high or 3+ medium issues)
   - Conservative: 4-7 doses, 12-18 weeks (for mild issues only)

5. Estimate realistic IMPROVEMENT POTENTIAL:
   - Maximum 70-85% reversal of total age gap
   - Cap at 5 years maximum improvement
   - Consider that baseline epigenetic variation of 1-2 years is normal

6. Provide your REASONING explaining the key drivers of aging in this patient.

Return ONLY valid JSON in this EXACT format (no markdown, no extra text):
{
  "biologicalAge": <number>,
  "biomarkerImpacts": {
    "telomere": <number in years>,
    "epigenetic": <number in years>,
    "crp": <number in years>,
    "metabolic": <number in years (HbA1c + glucose combined)>,
    "cardiovascular": <number in years (HDL/LDL combined)>,
    "mitochondrial": <number in years>
  },
  "healthIssues": [
    {
      "category": "<string>",
      "severity": "<high|medium|low>",
      "title": "<string>",
      "description": "<string>",
      "impact": <number in years>
    }
  ],
  "protocolRecommendation": {
    "intensity": "<intensive|standard|conservative>",
    "dosesCount": <number>,
    "durationWeeks": <number>,
    "primaryTargets": [<array of strings>]
  },
  "expectedImprovement": {
    "biologicalAgeReduction": <number in years>,
    "confidence": <number 0-100>
  },
  "reasoning": "<string explaining the analysis>"
}`;

export async function analyzeWithAI(
  age: number,
  biomarkers: BiomarkerData,
  apiKey?: string
): Promise<AIAnalysisResponse | null> {
  if (!apiKey) {
    console.warn('No API key provided for AI analysis, falling back to formula-based calculation');
    return null;
  }

  try {
    const anthropic = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true,
    });

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: 2000,
      temperature: 0.3, // Lower temperature for more consistent scientific analysis
      messages: [
        {
          role: 'user',
          content: ANALYSIS_PROMPT(age, biomarkers),
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    // Parse the JSON response
    const analysis: AIAnalysisResponse = JSON.parse(content.text);

    // Validate the response
    if (!analysis.biologicalAge || !analysis.biomarkerImpacts || !analysis.expectedImprovement) {
      throw new Error('Invalid response structure from AI');
    }

    console.log('AI Analysis successful:', analysis);
    return analysis;
  } catch (error) {
    console.error('AI analysis failed:', error);
    return null;
  }
}

export function convertAIAnalysisToResult(
  age: number,
  _biomarkers: BiomarkerData,
  aiAnalysis: AIAnalysisResponse
): Partial<CalculationResult> {
  const biologicalAge = Math.round(aiAnalysis.biologicalAge * 10) / 10;
  const ageGap = biologicalAge - age;
  const improvementPotential = Math.round(aiAnalysis.expectedImprovement.biologicalAgeReduction * 10) / 10;
  const optimizedAge = Math.round((biologicalAge - improvementPotential) * 10) / 10;

  return {
    chronologicalAge: age,
    biologicalAge,
    optimizedAge,
    healthspanGain: improvementPotential,
    ageGap,
    confidenceLevel: aiAnalysis.expectedImprovement.confidence,
    dataSource: 'biomarkers',
  };
}

