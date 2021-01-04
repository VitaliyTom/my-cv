import { contentPortfolio } from './content_porfolio.js';
import { contentEducation } from './content_education.js';

const languageCode = document.querySelector('.language_code');
const languageButton = document.querySelector('.language_button');

const javaScript = document.querySelector('.java_script');
const java = document.querySelector('.java');

const portfolioList = document.querySelector('.portfolio_list');

const content = document.querySelector('.content');

if (portfolioList.children.length === 0) {
	portfolioList.insertAdjacentHTML('afterBegin', contentPortfolio.js.jsContent);
	document.querySelector('.first-name').insertAdjacentHTML('beforeEnd', contentPortfolio.js.frontEnd);
	content.insertAdjacentHTML('beforeEnd', contentEducation.js.jsContent);
}

// ----------------- Listener contentEducation ----------------

languageCode.addEventListener('click', (event) => {
	if (event.target.closest('.java_script')) {
		portfolioListRemove();
		contentEducationRemove();

		content.insertAdjacentHTML('beforeEnd', contentEducation.js.jsContent);

		portfolioList.insertAdjacentHTML('afterBegin', contentPortfolio.js.jsContent);
		document.querySelector('.position').remove();

		document.querySelector('.first-name').insertAdjacentHTML('beforeEnd', contentPortfolio.js.frontEnd);
		java.classList.remove('active');
		javaScript.classList.add('active');
	}

	if (event.target.closest('.java')) {
		const portfolioList = document.querySelector('.portfolio_list');
		portfolioListRemove();
		contentEducationRemove();

		content.insertAdjacentHTML('beforeEnd', contentEducation.java.javaContent);

		portfolioList.insertAdjacentHTML('afterBegin', contentPortfolio.java.javaContent);
		document.querySelector('.position').remove();
		document.querySelector('.first-name').insertAdjacentHTML('beforeEnd', contentPortfolio.java.BackEnd);
		javaScript.classList.remove('active');
		java.classList.add('active');
	}
});

// ----------------- Listener language ----------------

languageButton.addEventListener('click', (event) => {
	const modal = document.querySelector('.modal');
	const langAll = Array.from(document.querySelectorAll('.lang'));
	const pol = langAll[1];
	const rus = langAll[2];

	if (pol === event.target.closest('.lang') || rus === event.target.closest('.lang')) {
		modal.classList.add('active');
		setTimeout(() => {
			modal.classList.remove('active');
		}, 5000);
	} else {
		if (event.target.closest('.lang')) {
			langAll.forEach((el) => {
				el.classList.remove('active');
			});

			event.target.closest('.lang').classList.add('active');
		}
	}
});

function portfolioListRemove() {
	Array.from(portfolioList.children).forEach((el) => {
		el.remove();
	});
}

function contentEducationRemove() {
	Array.from(content.children).forEach((el) => {
		el.remove();
	});
}
