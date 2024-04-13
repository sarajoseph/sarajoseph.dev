import cv_es from '@cv_es';
import cv_en from '@cv_en';
import cv_ca from '@cv_ca';

const LANG = {
	CATALAN: 'ca',
	ENGLISH: 'en',
	SPANISH: 'es',
};

export const getI18N = ({
	currentLang = LANG.SPANISH,
}) => {
	if (currentLang === LANG.CATALAN) return {...cv_es, ...cv_ca};
	if (currentLang === LANG.ENGLISH) return {...cv_es, ...cv_en};
	return cv_es;
};