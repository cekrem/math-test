const translations = {
  en: {
    title: 'Math Test',
    numberOfAssignments: 'Number of Assignments',
    correct: 'You got {correct} out of {total} correct!',
  },
  no: {
    title: 'Matteprøve',
    numberOfAssignments: 'Antall oppgaver',
    correct: 'Du fikk {correct} av {total} riktig!',
  },
};

const getLanguage = () => {
  const userLang = navigator.language || navigator.userLanguage;
  return userLang.startsWith('no') || userLang.startsWith('nb') ? 'no' : 'en';
};

export const localize = (key, params = {}) => {
  const lang = getLanguage();
  const text = translations[lang][key] || key;
  return Object.entries(params).reduce(
    (acc, [param, value]) => acc.replace(`{${param}}`, value),
    text,
  );
};
