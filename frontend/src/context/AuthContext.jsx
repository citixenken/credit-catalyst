import { useState, useCallback } from 'react';
import { AuthContext } from './AuthContextDef';
import { PERSONA_CREDENTIALS, getPersonaKey } from '../data/personaData';

const MOCK_USER = {
  id: 'MCH-2024-001',
  name: 'James Kariuki',
  email: 'james@karielec.co.ke',
  businessName: 'Kariuki Electronics',
  role: 'merchant',
  onboarded: true,
  avatar: null,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cc_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useCallback(async (email) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    // Check if this is a known persona email
    const knownPersona = PERSONA_CREDENTIALS.find((c) => c.email === email);
    let loggedInUser;
    if (knownPersona) {
      loggedInUser = {
        ...MOCK_USER,
        id: knownPersona.persona === 'good' ? 'MCH-2024-001' : knownPersona.persona === 'struggling' ? 'MCH-2024-112' : 'MCH-2024-047',
        email: knownPersona.email,
        name: knownPersona.name,
        businessName: knownPersona.business,
        persona: knownPersona.persona,
        onboarded: true,
        aiOptIn: knownPersona.persona === 'good',
        aiOptInDecided: knownPersona.persona === 'good',
      };
    } else {
      // Non-persona user — check localStorage for prior session
      const existing = localStorage.getItem('cc_user');
      const existingUser = existing ? JSON.parse(existing) : null;
      loggedInUser = existingUser && existingUser.email === email
        ? existingUser
        : { ...MOCK_USER, email, onboarded: false, persona: 'medium' };
    }
    setUser(loggedInUser);
    localStorage.setItem('cc_user', JSON.stringify(loggedInUser));
    setIsLoading(false);
    return loggedInUser;
  }, []);

  const signUp = useCallback(async (data) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const newUser = {
      ...MOCK_USER,
      name: data.name,
      email: data.email,
      businessName: data.businessName,
      onboarded: false,
    };
    setUser(newUser);
    localStorage.setItem('cc_user', JSON.stringify(newUser));
    setIsLoading(false);
    return newUser;
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('cc_user');
  }, []);

  const completeOnboarding = useCallback((onboardingData = {}) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        onboarded: true,
        businessName: onboardingData.businessName || prev.businessName,
        businessType: onboardingData.businessType || prev.businessType,
        registrationNumber: onboardingData.registrationNumber,
        location: onboardingData.location,
        name: onboardingData.fullName || prev.name,
        idNumber: onboardingData.idNumber,
        phone: onboardingData.phone,
        dob: onboardingData.dob,
        bankName: onboardingData.bankName,
        accountNumber: onboardingData.accountNumber,
        monthlyRevenue: onboardingData.monthlyRevenue,
        transactionChannels: onboardingData.transactionChannels,
        aiOptIn: onboardingData.aiOptIn ?? false,
        aiOptInDecided: true,
      };
      localStorage.setItem('cc_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateAiOptIn = useCallback((optIn) => {
    setUser((prev) => {
      const updated = { ...prev, aiOptIn: optIn, aiOptInDecided: true };
      localStorage.setItem('cc_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, completeOnboarding, updateAiOptIn }}>
      {children}
    </AuthContext.Provider>
  );
}


