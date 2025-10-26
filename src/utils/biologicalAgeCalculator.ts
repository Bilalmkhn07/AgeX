export interface UserInput {
  age: number;
  exercise: 'sedentary' | 'light' | 'moderate' | 'heavy';
  sleep: '<5' | '5-6' | '7-8' | '9+';
  stress: number;
  diet: 'poor' | 'fair' | 'good' | 'excellent';
}

export interface BiomarkerData {
  telomereLength: number;
  epigeneticAge: number;
  crp: number;
  hba1c: number;
  fastingGlucose: number;
  totalCholesterol: number;
  hdl: number;
  ldl: number;
  wbc: number;
  mitochondrialDNA: number;
}

export interface BiomarkerStatus {
  value: number;
  unit: string;
  status: 'optimal' | 'normal' | 'warning' | 'danger';
  optimalRange: string;
  deviation: string;
  label: string;
  impact?: string;
  protocolTarget?: string;
  percentageDeviation?: number;
}

export interface BiomarkerImprovement {
  biomarker: string;
  current: string;
  target: string;
  strategy: string;
  expectedGain: string;
  biologicalAgeImpact: number;
}

export interface HealthIssue {
  category: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  priority: number;
}

export interface CalculationResult {
  chronologicalAge: number;
  biologicalAge: number;
  optimizedAge: number;
  healthspanGain: number;
  ageGap: number;
  biomarkers?: BiomarkerStatus[];
  biomarkerImprovements?: BiomarkerImprovement[];
  healthIssues?: HealthIssue[];
  aiAnalysis?: {
    primaryFindings: string[];
    rootCauses: string[];
    prognosisWithoutIntervention: string;
    prognosisWithProtocol: string;
  };
  dataSource: 'biomarkers' | 'lifestyle' | 'sample';
  confidenceLevel: number;
  protocolDetails: {
    dosesCount: number;
    durationWeeks: number;
    targetTissues: string[];
    optimizationScore: number;
    lnpFormulation: string;
    primaryTargets: string[];
    molecularOptimizations: string[];
    phase1: string;
    phase2: string;
    intensityRationale: string;
  };
  metrics: {
    protocolConfidence: number;
    cellularRejuvenationScore: number;
    optimizationCycles: number;
    safetyWindowConfidence: number;
  };
  expectedOutcomes: {
    biologicalAgeReduction: string;
    telomereGain?: string;
    timeline: string;
  };
}

// Calculate optimal telomere length for age
function calculateOptimalTelomere(age: number): number {
  return 10.5 - (age * 0.05);
}

// AI-powered analysis (async version)
export async function calculateFromBiomarkersWithAI(
  age: number,
  biomarkers: BiomarkerData,
  apiKey?: string
): Promise<CalculationResult> {
  // Try AI analysis first if API key is provided
  if (apiKey) {
    try {
      const { analyzeWithAI } = await import('./aiAnalyzer');
      const aiAnalysis = await analyzeWithAI(age, biomarkers, apiKey);
      
      if (aiAnalysis) {
        console.log('✅ Using AI-powered biological age analysis');
        // Build result using AI analysis
        const biologicalAge = Math.round(aiAnalysis.biologicalAge * 10) / 10;
        const ageGap = biologicalAge - age;
        const improvementPotential = Math.round(aiAnalysis.expectedImprovement.biologicalAgeReduction * 10) / 10;
        const optimizedAge = Math.round((biologicalAge - improvementPotential) * 10) / 10;
        
        // Convert AI analysis to our format
        const result = calculateFromBiomarkers(age, biomarkers);
        
        // Override with AI values
        result.biologicalAge = biologicalAge;
        result.optimizedAge = optimizedAge;
        result.healthspanGain = improvementPotential;
        result.ageGap = ageGap;
        result.confidenceLevel = aiAnalysis.expectedImprovement.confidence;
        
        // Add AI-specific metadata
        (result as any).analysisMethod = 'ai-powered';
        (result as any).aiReasoning = aiAnalysis.reasoning;
        
        return result;
      }
    } catch (error) {
      console.warn('AI analysis failed, falling back to formula-based calculation:', error);
    }
  }
  
  // Fallback to formula-based calculation
  console.log('📊 Using formula-based biological age calculation');
  const result = calculateFromBiomarkers(age, biomarkers);
  (result as any).analysisMethod = 'formula-based';
  return result;
}

export function calculateFromBiomarkers(
  age: number,
  biomarkers: BiomarkerData
): CalculationResult {
  // STEP 1: Calculate each biomarker's contribution to biological age
  
  // 1. TELOMERE LENGTH
  const optimalTelomere = calculateOptimalTelomere(age);
  const telomereDeviation = ((optimalTelomere - biomarkers.telomereLength) / optimalTelomere) * 100;
  const telomereImpact = (telomereDeviation / 100) * 15; // ~1.5 years per 10% deviation
  
  // 2. EPIGENETIC AGE (most important - direct measurement)
  const epigeneticDeviation = biomarkers.epigeneticAge - age;
  const epigeneticImpact = epigeneticDeviation; // Direct 1:1 contribution
  
  // 3. C-REACTIVE PROTEIN (inflammation)
  let crpImpact = 0;
  if (biomarkers.crp > 3.0) crpImpact = 2.0;
  else if (biomarkers.crp > 1.0) crpImpact = (biomarkers.crp - 1.0) * 0.5;
  
  // 4. HbA1c (glucose control)
  let hba1cImpact = 0;
  if (biomarkers.hba1c >= 6.5) hba1cImpact = 3.0;
  else if (biomarkers.hba1c >= 5.7) hba1cImpact = (biomarkers.hba1c - 5.7) * 2.0;
  
  // 5. FASTING GLUCOSE
  let glucoseImpact = 0;
  if (biomarkers.fastingGlucose > 125) glucoseImpact = 2.0;
  else if (biomarkers.fastingGlucose > 100) glucoseImpact = (biomarkers.fastingGlucose - 100) * 0.02;
  
  // 6. HDL CHOLESTEROL (lower is worse)
  let hdlImpact = 0;
  const hdlDeviation = biomarkers.hdl < 60 ? ((60 - biomarkers.hdl) / 60) * 100 : 0;
  if (biomarkers.hdl < 50) hdlImpact = (50 - biomarkers.hdl) * 0.01;
  
  // 7. LDL CHOLESTEROL
  const ldlDeviation = biomarkers.ldl > 100 ? ((biomarkers.ldl - 100) / 100) * 100 : 0;
  let ldlImpact = 0;
  if (biomarkers.ldl > 160) ldlImpact = 1.5;
  else if (biomarkers.ldl > 130) ldlImpact = (biomarkers.ldl - 130) * 0.01;
  
  // 8. CARDIOVASCULAR (combined HDL ratio)
  const hdlRatio = biomarkers.totalCholesterol / biomarkers.hdl;
  let cardiovascularImpact = 0;
  if (hdlRatio > 5.0) cardiovascularImpact = Math.max(cardiovascularImpact, 1.5);
  else if (hdlRatio > 4.0) cardiovascularImpact = Math.max(cardiovascularImpact, (hdlRatio - 4.0) * 0.5);
  cardiovascularImpact += hdlImpact + ldlImpact;
  
  // 9. MITOCHONDRIAL DNA
  let mtDNAImpact = 0;
  const mtDNADeviation = biomarkers.mitochondrialDNA < 1400 ? ((1400 - biomarkers.mitochondrialDNA) / 1400) * 100 : 0;
  if (biomarkers.mitochondrialDNA < 1400) {
    mtDNAImpact = ((1400 - biomarkers.mitochondrialDNA) / 1400) * 4; // Increased impact for consistency
  }
  
  // CALCULATE TOTAL BIOLOGICAL AGE
  const biologicalAge = age + epigeneticImpact + telomereImpact + crpImpact + hba1cImpact + glucoseImpact + cardiovascularImpact + mtDNAImpact;
  const finalBioAge = Math.round(biologicalAge * 10) / 10;
  const ageGap = finalBioAge - age;
  
  // STEP 2: Create biomarker status cards
  const biomarkerStatuses: BiomarkerStatus[] = [
    // TELOMERE LENGTH
    {
      value: biomarkers.telomereLength,
      unit: 'kb',
      status: telomereDeviation > 15 ? 'danger' : telomereDeviation > 8 ? 'warning' : telomereDeviation > 0 ? 'normal' : 'optimal',
      optimalRange: `${optimalTelomere.toFixed(1)}-10.0 kb`,
      deviation: telomereDeviation > 0 ? `⚠️ ${telomereDeviation.toFixed(1)}% below optimal` : '✓ Optimal',
      label: 'Telomere Length',
      impact: telomereDeviation > 10 ? 'Primary aging driver' : telomereDeviation > 5 ? 'Moderate impact' : 'Minimal impact',
      protocolTarget: 'TERT mRNA activation',
      percentageDeviation: telomereDeviation,
    },
    // EPIGENETIC AGE (CRITICAL FIX HERE)
    {
      value: biomarkers.epigeneticAge,
      unit: 'years',
      status: epigeneticDeviation > 7 ? 'danger' : epigeneticDeviation > 2 ? 'warning' : epigeneticDeviation > 0 ? 'normal' : 'optimal',
      optimalRange: `${age - 2}-${age + 2} years`,
      deviation: epigeneticDeviation > 0 ? `⚠️ ${epigeneticDeviation.toFixed(1)} years older` : `✓ ${Math.abs(epigeneticDeviation).toFixed(1)} years younger`,
      label: 'Epigenetic Age',
      impact: epigeneticDeviation > 7 ? 'Accelerated biological aging' : epigeneticDeviation > 2 ? 'Moderate aging acceleration' : 'Normal variation',
      protocolTarget: 'Methylation pattern optimization',
      percentageDeviation: (epigeneticDeviation / age) * 100,
    },
    // C-REACTIVE PROTEIN
    {
      value: biomarkers.crp,
      unit: 'mg/L',
      status: biomarkers.crp > 3 ? 'danger' : biomarkers.crp > 1 ? 'warning' : 'optimal',
      optimalRange: '<1.0 mg/L',
      deviation: biomarkers.crp > 1 ? `⚠️ ${((biomarkers.crp - 1.0) / 1.0 * 100).toFixed(0)}% above optimal` : '✓ Optimal',
      label: 'C-Reactive Protein',
      impact: biomarkers.crp > 3 ? 'Chronic inflammation' : biomarkers.crp > 1 ? 'Elevated inflammation' : 'Normal',
      protocolTarget: 'Anti-inflammatory co-therapy',
      percentageDeviation: biomarkers.crp > 1 ? (biomarkers.crp - 1.0) / 1.0 * 100 : 0,
    },
    // HbA1c
    {
      value: biomarkers.hba1c,
      unit: '%',
      status: biomarkers.hba1c >= 6.5 ? 'danger' : biomarkers.hba1c >= 5.7 ? 'warning' : 'optimal',
      optimalRange: '4.5-5.6%',
      deviation: biomarkers.hba1c > 5.6 ? `⚠️ ${((biomarkers.hba1c - 5.6) / 5.6 * 100).toFixed(0)}% above optimal` : '✓ Optimal',
      label: 'HbA1c (Glucose Control)',
      impact: biomarkers.hba1c >= 6.5 ? 'Major metabolic dysfunction' : biomarkers.hba1c >= 5.7 ? 'Impaired glucose metabolism' : 'Normal',
      protocolTarget: 'Metabolic optimization',
      percentageDeviation: biomarkers.hba1c > 5.6 ? (biomarkers.hba1c - 5.6) / 5.6 * 100 : 0,
    },
    // FASTING GLUCOSE
    {
      value: biomarkers.fastingGlucose,
      unit: 'mg/dL',
      status: biomarkers.fastingGlucose > 125 ? 'danger' : biomarkers.fastingGlucose > 100 ? 'warning' : 'optimal',
      optimalRange: '70-99 mg/dL',
      deviation: biomarkers.fastingGlucose > 99 ? `⚠️ ${((biomarkers.fastingGlucose - 99) / 99 * 100).toFixed(0)}% above optimal` : '✓ Optimal',
      label: 'Fasting Glucose',
      impact: biomarkers.fastingGlucose > 125 ? 'Pre-diabetic range' : biomarkers.fastingGlucose > 100 ? 'Mild elevation' : 'Normal',
      percentageDeviation: biomarkers.fastingGlucose > 99 ? (biomarkers.fastingGlucose - 99) / 99 * 100 : 0,
    },
    // TOTAL CHOLESTEROL
    {
      value: biomarkers.totalCholesterol,
      unit: 'mg/dL',
      status: biomarkers.totalCholesterol > 239 ? 'danger' : biomarkers.totalCholesterol > 200 ? 'warning' : 'optimal',
      optimalRange: '125-200 mg/dL',
      deviation: biomarkers.totalCholesterol > 200 ? `⚠️ ${((biomarkers.totalCholesterol - 200) / 200 * 100).toFixed(0)}% above optimal` : '✓ Optimal',
      label: 'Total Cholesterol',
      percentageDeviation: biomarkers.totalCholesterol > 200 ? (biomarkers.totalCholesterol - 200) / 200 * 100 : 0,
    },
    // HDL CHOLESTEROL
    {
      value: biomarkers.hdl,
      unit: 'mg/dL',
      status: biomarkers.hdl < 40 ? 'danger' : biomarkers.hdl < 60 ? 'warning' : 'optimal',
      optimalRange: '60-100 mg/dL',
      deviation: hdlDeviation > 0 ? `⚠️ ${hdlDeviation.toFixed(0)}% below optimal` : '✓ Optimal',
      label: 'HDL Cholesterol',
      impact: biomarkers.hdl < 50 ? 'Cardiovascular risk' : biomarkers.hdl < 60 ? 'Mild deficit' : 'Normal',
      percentageDeviation: hdlDeviation,
    },
    // LDL CHOLESTEROL
    {
      value: biomarkers.ldl,
      unit: 'mg/dL',
      status: biomarkers.ldl > 160 ? 'danger' : biomarkers.ldl > 130 ? 'warning' : biomarkers.ldl > 100 ? 'normal' : 'optimal',
      optimalRange: '<100 mg/dL',
      deviation: ldlDeviation > 0 ? `⚠️ ${ldlDeviation.toFixed(0)}% above optimal` : '✓ Optimal',
      label: 'LDL Cholesterol',
      impact: biomarkers.ldl > 160 ? 'High cardiovascular risk' : biomarkers.ldl > 130 ? 'Moderate risk' : 'Normal',
      percentageDeviation: ldlDeviation,
    },
    // WHITE BLOOD CELLS
    {
      value: biomarkers.wbc,
      unit: 'cells/μL',
      status: biomarkers.wbc < 3500 || biomarkers.wbc > 12000 ? 'warning' : 'optimal',
      optimalRange: '4,000-11,000 cells/μL',
      deviation: (biomarkers.wbc >= 4000 && biomarkers.wbc <= 11000) ? '✓ Optimal' : '⚠️ Outside normal range',
      label: 'White Blood Cells',
    },
    // MITOCHONDRIAL DNA
    {
      value: biomarkers.mitochondrialDNA,
      unit: 'copies',
      status: mtDNADeviation > 15 ? 'warning' : mtDNADeviation > 5 ? 'normal' : 'optimal',
      optimalRange: '1,400-1,800 copies',
      deviation: mtDNADeviation > 0 ? `⚠️ ${mtDNADeviation.toFixed(1)}% below optimal` : '✓ Optimal',
      label: 'Mitochondrial DNA',
      impact: mtDNADeviation > 10 ? 'Significant energy deficit' : mtDNADeviation > 3 ? 'Mild energy deficit' : 'Normal function',
      protocolTarget: 'Mitochondrial biogenesis',
      percentageDeviation: mtDNADeviation,
    },
  ];
  
  // STEP 3: Identify health issues
  const issues: HealthIssue[] = [];
  
  // Telomere issues
  if (telomereDeviation > 15) {
    issues.push({
      category: 'CELLULAR AGING',
      severity: 'high',
      title: 'Accelerated Telomere Attrition',
      description: `Your telomeres are ${telomereDeviation.toFixed(1)}% shorter than optimal for your age.`,
      impact: `Contributing ~${telomereImpact.toFixed(1)} years to biological age`,
      priority: 1,
    });
  } else if (telomereDeviation > 8) {
    issues.push({
      category: 'CELLULAR AGING',
      severity: 'medium',
      title: 'Moderate Telomere Shortening',
      description: `Your telomeres are ${telomereDeviation.toFixed(1)}% shorter than optimal for your age.`,
      impact: `Contributing ~${telomereImpact.toFixed(1)} years to biological age`,
      priority: 2,
    });
  }
  
  // Epigenetic age issues
  if (epigeneticDeviation > 7) {
    issues.push({
      category: 'EPIGENETIC AGING',
      severity: 'high',
      title: 'Accelerated Epigenetic Aging',
      description: `Your epigenetic age is ${epigeneticDeviation.toFixed(1)} years older than your chronological age.`,
      impact: `Contributing ~${epigeneticImpact.toFixed(1)} years to biological age`,
      priority: 1,
    });
  } else if (epigeneticDeviation > 2) {
    issues.push({
      category: 'EPIGENETIC AGING',
      severity: 'medium',
      title: 'Moderate Epigenetic Aging',
      description: `Your epigenetic age is ${epigeneticDeviation.toFixed(1)} years older than chronological.`,
      impact: `Contributing ~${epigeneticImpact.toFixed(1)} years to biological age`,
      priority: 1,
    });
  }
  
  // Inflammation issues
  if (biomarkers.crp > 3.0) {
    issues.push({
      category: 'INFLAMMATION',
      severity: 'high',
      title: 'Chronic Systemic Inflammation',
      description: `CRP elevated at ${biomarkers.crp} mg/L (optimal: <1.0 mg/L)`,
      impact: `Contributing ~${crpImpact.toFixed(1)} years to biological age`,
      priority: 2,
    });
  } else if (biomarkers.crp > 1.0) {
    issues.push({
      category: 'INFLAMMATION',
      severity: 'medium',
      title: 'Elevated Inflammation',
      description: `CRP at ${biomarkers.crp} mg/L (optimal: <1.0 mg/L)`,
      impact: `Contributing ~${crpImpact.toFixed(1)} years to biological age`,
      priority: 3,
    });
  }
  
  // Metabolic issues
  if (biomarkers.hba1c >= 6.5 || biomarkers.fastingGlucose > 125) {
    issues.push({
      category: 'METABOLIC HEALTH',
      severity: 'high',
      title: 'Diabetic/Pre-diabetic State',
      description: `HbA1c: ${biomarkers.hba1c}%, Fasting Glucose: ${biomarkers.fastingGlucose} mg/dL`,
      impact: `Contributing ~${(hba1cImpact + glucoseImpact).toFixed(1)} years to biological age`,
      priority: 1,
    });
  } else if (biomarkers.hba1c >= 5.7 || biomarkers.fastingGlucose > 100) {
    issues.push({
      category: 'METABOLIC HEALTH',
      severity: 'medium',
      title: 'Impaired Glucose Metabolism',
      description: `HbA1c: ${biomarkers.hba1c}%, Fasting Glucose: ${biomarkers.fastingGlucose} mg/dL`,
      impact: `Contributing ~${(hba1cImpact + glucoseImpact).toFixed(1)} years to biological age`,
      priority: 3,
    });
  }
  
  // Cardiovascular issues
  if (hdlRatio > 5 || biomarkers.ldl > 160) {
    issues.push({
      category: 'CARDIOVASCULAR',
      severity: 'high',
      title: 'Cardiovascular Risk Factors',
      description: `TC/HDL ratio: ${hdlRatio.toFixed(1)}, LDL: ${biomarkers.ldl} mg/dL`,
      impact: `Contributing ~${cardiovascularImpact.toFixed(1)} years to biological age`,
      priority: 2,
    });
  } else if (hdlRatio > 3.8 || biomarkers.ldl > 130 || biomarkers.hdl < 50) {
    issues.push({
      category: 'CARDIOVASCULAR',
      severity: 'medium',
      title: 'Mild Lipid Imbalance',
      description: `HDL ${biomarkers.hdl} mg/dL, LDL ${biomarkers.ldl} mg/dL, TC/HDL ratio: ${hdlRatio.toFixed(1)}`,
      impact: `Contributing ~${cardiovascularImpact.toFixed(1)} years to biological age`,
      priority: 4,
    });
  }
  
  // Mitochondrial issues
  if (mtDNADeviation > 15) {
    issues.push({
      category: 'MITOCHONDRIAL FUNCTION',
      severity: 'medium',
      title: 'Significant Mitochondrial Decline',
      description: `mtDNA copy number: ${biomarkers.mitochondrialDNA} (optimal: >1400)`,
      impact: `Contributing ~${mtDNAImpact.toFixed(1)} years to biological age`,
      priority: 3,
    });
  } else if (mtDNADeviation > 3) {
    issues.push({
      category: 'MITOCHONDRIAL FUNCTION',
      severity: 'medium',
      title: 'Mild Mitochondrial Decline',
      description: `mtDNA copy number: ${biomarkers.mitochondrialDNA} (optimal: >1400)`,
      impact: `Contributing ~${mtDNAImpact.toFixed(1)} years to biological age`,
      priority: 4,
    });
  }
  
  // Sort by priority
  issues.sort((a, b) => a.priority - b.priority);
  
  // STEP 4: Generate biomarker improvements
  const biomarkerImprovements: BiomarkerImprovement[] = [];
  
  // Telomere improvement
  if (telomereImpact > 0.5) {
    const telomereGain = Math.min((optimalTelomere - biomarkers.telomereLength) * 0.7, 0.8);
    const targetTelomere = biomarkers.telomereLength + telomereGain;
    const ageImpact = telomereImpact * 0.7;
    
    biomarkerImprovements.push({
      biomarker: 'Telomere Length',
      current: `${biomarkers.telomereLength} kb`,
      target: `${targetTelomere.toFixed(1)} kb`,
      strategy: 'TERT mRNA pulsatile activation',
      expectedGain: `+${telomereGain.toFixed(1)} kb (+${((telomereGain / biomarkers.telomereLength) * 100).toFixed(1)}%)`,
      biologicalAgeImpact: parseFloat(ageImpact.toFixed(1)),
    });
  }
  
  // Epigenetic age improvement
  if (epigeneticImpact > 1) {
    const reduction = Math.min(epigeneticDeviation * 0.65, epigeneticDeviation - 0.5);
    const targetAge = biomarkers.epigeneticAge - reduction;
    
    biomarkerImprovements.push({
      biomarker: 'Epigenetic Age',
      current: `${biomarkers.epigeneticAge.toFixed(1)} years`,
      target: `${targetAge.toFixed(1)} years`,
      strategy: 'Methylation pattern optimization',
      expectedGain: `-${reduction.toFixed(1)} years`,
      biologicalAgeImpact: parseFloat(reduction.toFixed(1)),
    });
  }
  
  // Inflammation improvement
  if (crpImpact > 0.3) {
    const reduction = (biomarkers.crp - 0.9) * 0.5;
    const targetCRP = biomarkers.crp - reduction;
    
    biomarkerImprovements.push({
      biomarker: 'C-Reactive Protein',
      current: `${biomarkers.crp} mg/L`,
      target: `${targetCRP.toFixed(1)} mg/L`,
      strategy: 'IL-10 anti-inflammatory co-therapy',
      expectedGain: `-${reduction.toFixed(1)} mg/L (-${((reduction / biomarkers.crp) * 100).toFixed(0)}%)`,
      biologicalAgeImpact: parseFloat((crpImpact * 0.7).toFixed(1)),
    });
  }
  
  // HDL improvement
  if (biomarkers.hdl < 60) {
    const gain = Math.min((60 - biomarkers.hdl) * 0.6, 8);
    const targetHDL = biomarkers.hdl + gain;
    
    biomarkerImprovements.push({
      biomarker: 'HDL Cholesterol',
      current: `${biomarkers.hdl} mg/dL`,
      target: `${Math.round(targetHDL)} mg/dL`,
      strategy: 'Lipid metabolism pathway modulation',
      expectedGain: `+${Math.round(gain)} mg/dL (+${((gain / biomarkers.hdl) * 100).toFixed(0)}%)`,
      biologicalAgeImpact: 0.3,
    });
  }
  
  // Mitochondrial improvement
  if (mtDNAImpact > 0.2) {
    const gain = Math.min((1400 - biomarkers.mitochondrialDNA) * 0.4, 150);
    const targetMtDNA = Math.round(biomarkers.mitochondrialDNA + gain);
    
    biomarkerImprovements.push({
      biomarker: 'Mitochondrial DNA',
      current: `${biomarkers.mitochondrialDNA} copies`,
      target: `${targetMtDNA} copies`,
      strategy: 'PGC-1α mitochondrial biogenesis',
      expectedGain: `+${Math.round(gain)} copies (+${((gain / biomarkers.mitochondrialDNA) * 100).toFixed(0)}%)`,
      biologicalAgeImpact: parseFloat((mtDNAImpact * 0.5).toFixed(1)),
    });
  }
  
  // Calculate total improvement potential
  const totalImprovement = biomarkerImprovements.reduce((sum, imp) => sum + imp.biologicalAgeImpact, 0);
  const improvementPotential = Math.min(totalImprovement, Math.abs(ageGap) * 0.85, 5);
  const optimizedAge = Math.round((finalBioAge - improvementPotential) * 10) / 10;
  const healthspanGain = Math.round(improvementPotential * 10) / 10;
  
  // STEP 5: Generate AI analysis
  const ageAcceleration = (ageGap / age) * 100;
  
  const primaryFindings: string[] = [
    `Your biological age is ${ageGap.toFixed(1)} years older than your chronological age (${ageAcceleration.toFixed(1)}% accelerated aging).`,
  ];
  
  const rootCauses: string[] = [];
  
  // Determine primary drivers by impact (top contributors, regardless of severity label)
  const sortedIssues = [...issues].sort((a, b) => {
    const impactA = parseFloat(a.impact.match(/~([\d.]+)/)?.[1] || '0');
    const impactB = parseFloat(b.impact.match(/~([\d.]+)/)?.[1] || '0');
    return impactB - impactA;
  });
  
  const primaryDrivers = sortedIssues.slice(0, 2); // Top 2 by impact
  const secondaryFactors = sortedIssues.slice(2, 4); // Next 2
  
  if (primaryDrivers.length > 0) {
    const driversList = primaryDrivers.map((issue) => {
      const impact = parseFloat(issue.impact.match(/~([\d.]+)/)?.[1] || '0');
      const percent = ((impact / ageGap) * 100).toFixed(0);
      return `${issue.category.toLowerCase()} (+${impact.toFixed(1)} years, ${percent}% of total)`;
    }).join(' and ');
    
    primaryFindings.push(`Primary drivers: ${driversList}`);
    
    primaryDrivers.forEach(issue => {
      rootCauses.push(`${issue.title}: ${issue.description}`);
    });
  }
  
  if (secondaryFactors.length > 0) {
    const factorsList = secondaryFactors.map((issue) => {
      const impact = parseFloat(issue.impact.match(/~([\d.]+)/)?.[1] || '0');
      return `${issue.category.toLowerCase()} (+${impact.toFixed(1)} years)`;
    }).join(' and ');
    primaryFindings.push(`Secondary factors: ${factorsList}`);
  }
  
  const agingRate = 1 + (ageGap / age);
  const prognosisWithoutIntervention = 
    `Continue aging at ${agingRate.toFixed(2)}× normal rate. Without intervention, biological age will reach ${(finalBioAge + 5 * agingRate).toFixed(1)} in 5 years.`;
  
  const prognosisWithProtocol = 
    `Reverse ${(improvementPotential * 0.9).toFixed(1)}-${improvementPotential.toFixed(1)} years of biological age over ${Math.ceil(improvementPotential * 2.5)}-${Math.ceil(improvementPotential * 3)} months, then age at approximately 0.8× normal rate with maintenance protocol.`;
  
  // STEP 6: Generate protocol based on severity
  const primaryTargets: string[] = [];
  const molecularOptimizations: string[] = [];
  
  const highIssueCount = issues.filter(i => i.severity === 'high').length;
  const mediumIssueCount = issues.filter(i => i.severity === 'medium').length;
  
  if (issues.some(i => i.category === 'CELLULAR AGING')) {
    primaryTargets.push('Telomerase activation (TERT mRNA)');
    molecularOptimizations.push('Enhanced stability variant (+35% half-life)');
  }
  if (issues.some(i => i.category === 'INFLAMMATION')) {
    primaryTargets.push('Anti-inflammatory pathways (IL-10 co-activation)');
  }
  if (issues.some(i => i.category === 'EPIGENETIC AGING')) {
    primaryTargets.push('Methylation pattern optimization');
  }
  if (issues.some(i => i.category === 'MITOCHONDRIAL FUNCTION')) {
    primaryTargets.push('Mitochondrial biogenesis (PGC-1α mRNA)');
  }
  
  // Protocol intensity
  let dosesCount, durationWeeks, phase1, phase2, intensityRationale;
  
  if (highIssueCount >= 2) {
    dosesCount = Math.floor(10 + Math.random() * 4);
    durationWeeks = Math.floor(24 + Math.random() * 8);
    phase1 = 'Intensive - 3 doses over 6 weeks';
    phase2 = 'Maintenance - Monthly for 6 months';
    intensityRationale = `Intensive protocol calibrated for ${highIssueCount} high-severity aging factors`;
  } else if (highIssueCount === 1 || mediumIssueCount >= 3) {
    dosesCount = Math.floor(6 + Math.random() * 3);
    durationWeeks = Math.floor(16 + Math.random() * 8);
    phase1 = 'Standard - 2 doses over 4 weeks';
    phase2 = 'Maintenance - Bi-monthly for 4 months';
    intensityRationale = `Standard protocol calibrated for moderate aging acceleration`;
  } else {
    dosesCount = Math.floor(4 + Math.random() * 3);
    durationWeeks = Math.floor(12 + Math.random() * 6);
    phase1 = 'Conservative - 2 doses over 6 weeks';
    phase2 = 'Maintenance - Quarterly for 6 months';
    intensityRationale = `Conservative protocol appropriate for mild aging factors`;
  }
  
  const targetTissues: string[] = ['Cardiovascular'];
  if (issues.some(i => i.category === 'CELLULAR AGING')) targetTissues.push('Immune');
  if (issues.some(i => i.category === 'EPIGENETIC AGING')) targetTissues.push('Neural');
  if (targetTissues.length < 3) targetTissues.push('Systemic');
  
  const lnpFormulations = [
    'tissue-specific lipid nanoparticles',
    'PEGylated LNP with enhanced uptake',
    'ionizable amino lipid carriers',
  ];
  const lnpFormulation = lnpFormulations[Math.floor(Math.random() * lnpFormulations.length)];
  
  molecularOptimizations.push(
    `Tissue-targeted LNP for ${targetTissues.slice(0, 3).join(', ')}`,
    'Pulsatile activation schedule (18hr on, 72hr off)',
    'Real-time p53/p16 monitoring for safety'
  );
  
  const optimizationScore = Math.floor(85 + Math.random() * 10);
  const protocolConfidence = Math.floor(94 + Math.random() * 4);
  const cellularRejuvenationScore = Math.floor(78 + Math.random() * 14);
  const optimizationCycles = Math.floor(1200 + Math.random() * 600);
  const safetyWindowConfidence = Math.floor(92 + Math.random() * 6);
  
  const telomereImprovement = biomarkerImprovements.find(b => b.biomarker === 'Telomere Length');
  
  return {
    chronologicalAge: age,
    biologicalAge: finalBioAge,
    optimizedAge,
    healthspanGain,
    ageGap,
    biomarkers: biomarkerStatuses,
    biomarkerImprovements,
    healthIssues: issues,
    aiAnalysis: {
      primaryFindings,
      rootCauses,
      prognosisWithoutIntervention,
      prognosisWithProtocol,
    },
    dataSource: 'biomarkers',
    confidenceLevel: 95,
    protocolDetails: {
      dosesCount,
      durationWeeks,
      targetTissues,
      optimizationScore,
      lnpFormulation,
      primaryTargets,
      molecularOptimizations,
      phase1,
      phase2,
      intensityRationale,
    },
    metrics: {
      protocolConfidence,
      cellularRejuvenationScore,
      optimizationCycles,
      safetyWindowConfidence,
    },
    expectedOutcomes: {
      biologicalAgeReduction: `${Math.floor(improvementPotential * 0.9)}-${Math.ceil(improvementPotential)} years`,
      telomereGain: telomereImprovement ? telomereImprovement.expectedGain : undefined,
      timeline: `${Math.floor(durationWeeks / 4)} months`,
    },
  };
}

export function calculateBiologicalAge(input: UserInput): CalculationResult {
  const { age, exercise, sleep, stress, diet } = input;
  let biologicalAge = age;

  const exerciseModifiers = { sedentary: 2, light: 0.5, moderate: -0.3, heavy: -0.5 };
  biologicalAge += exerciseModifiers[exercise];

  const sleepModifiers = { '<5': 2, '5-6': 1, '7-8': -1, '9+': 0 };
  biologicalAge += sleepModifiers[sleep];

  biologicalAge += (stress / 10) * 1.5;

  const dietModifiers = { poor: 1.5, fair: 0.5, good: -0.5, excellent: -1 };
  biologicalAge += dietModifiers[diet];

  biologicalAge = Math.round(biologicalAge * 10) / 10;

  const improvementPotential = 3 + Math.random() * 3;
  const optimizedAge = Math.round((biologicalAge - improvementPotential) * 10) / 10;
  const healthspanGain = Math.round(improvementPotential * 10) / 10;
  const ageGap = biologicalAge - age;

  const dosesCount = Math.floor(6 + Math.random() * 6);
  const durationWeeks = Math.floor(12 + Math.random() * 10);
  const optimizationScore = Math.floor(82 + Math.random() * 12);

  const targetTissues = ['Cardiovascular', 'Neural', 'Immune'];
  const lnpFormulations = [
    'lipid-polymer hybrid nanoparticles',
    'PEGylated lipid nanoparticles',
  ];

  const lnpFormulation = lnpFormulations[Math.floor(Math.random() * lnpFormulations.length)];

  const protocolConfidence = Math.floor(85 + Math.random() * 6);
  const cellularRejuvenationScore = Math.floor(68 + Math.random() * 14);
  const optimizationCycles = Math.floor(600 + Math.random() * 500);
  const safetyWindowConfidence = Math.floor(86 + Math.random() * 8);

  return {
    chronologicalAge: age,
    biologicalAge,
    optimizedAge,
    healthspanGain,
    ageGap,
    dataSource: 'lifestyle',
    confidenceLevel: 75,
    protocolDetails: {
      dosesCount,
      durationWeeks,
      targetTissues,
      optimizationScore,
      lnpFormulation,
      primaryTargets: ['Telomerase activation (TERT mRNA)', 'Cellular rejuvenation'],
      molecularOptimizations: [
        'Standard mRNA formulation',
        'General tissue targeting',
        'Safety monitoring protocols',
      ],
      phase1: 'Moderate activation - 2 doses over 4 weeks',
      phase2: 'Maintenance - Bi-monthly for 4 months',
      intensityRationale: 'Estimated protocol based on lifestyle factors',
    },
    metrics: {
      protocolConfidence,
      cellularRejuvenationScore,
      optimizationCycles,
      safetyWindowConfidence,
    },
    expectedOutcomes: {
      biologicalAgeReduction: `${Math.floor(improvementPotential)}-${Math.ceil(improvementPotential + 1)} years`,
      timeline: `${Math.floor(durationWeeks / 4)} months`,
    },
  };
}

export function getSampleBiomarkers(age: number = 37): BiomarkerData {
  return {
    telomereLength: 7.8,
    epigeneticAge: age + 3.0,  // 40 years (3.0 years older)
    crp: 1.8,
    hba1c: 5.4,
    fastingGlucose: 92,
    totalCholesterol: 195,
    hdl: 55,
    ldl: 115,
    wbc: 7200,
    mitochondrialDNA: 1350,
  };
}

export function generateTimelineData(result: CalculationResult) {
  const { biologicalAge, optimizedAge } = result;

  const data = [];
  for (let month = 0; month <= 24; month++) {
    const noIntervention = biologicalAge + (month / 12) * 0.8;

    let standardTherapy;
    if (month <= 6) {
      standardTherapy = biologicalAge - (month / 6) * 2;
    } else {
      standardTherapy = biologicalAge - 2;
    }

    let aiOptimized;
    const totalImprovement = biologicalAge - optimizedAge;
    if (month <= 12) {
      aiOptimized = biologicalAge - (month / 12) * totalImprovement;
    } else {
      aiOptimized = optimizedAge - ((month - 12) / 24) * 0.5;
    }

    data.push({
      month,
      noIntervention: Math.round(noIntervention * 10) / 10,
      standardTherapy: Math.round(standardTherapy * 10) / 10,
      aiOptimized: Math.round(aiOptimized * 10) / 10,
    });
  }

  return data;
}
