const faq = document.querySelector('[data-faq]');
const tools = faq.querySelector('[data-faq-tools]');
const search = faq.querySelector('[data-faq-search]');
const filters = [...faq.querySelectorAll('[data-faq-filter]')];
const count = faq.querySelector('[role="status"]');
const empty = faq.querySelector('[data-faq-empty]');
const questions = [...faq.querySelectorAll('[data-faq-category]')].map(item => ({
  item,
  category: item.dataset.faqCategory,
  text: item.textContent.trim().toLowerCase(),
}));

let category = 'all';

function updateQuestions() {
  const query = search.value.trim().toLowerCase();
  let visibleCount = 0;
  for (const question of questions) {
    const visible = (category === 'all' || category === question.category) && question.text.includes(query);
    question.item.hidden = !visible;
    if (visible) visibleCount++;
  }
  count.textContent = `${visibleCount} ${visibleCount === 1 ? 'question' : 'questions'} shown`;
  empty.hidden = visibleCount !== 0;
}

for (const filter of filters) {
  filter.addEventListener('click', () => {
    category = filter.dataset.faqFilter;
    for (const button of filters) button.setAttribute('aria-pressed', String(button === filter));
    updateQuestions();
  });
}

search.addEventListener('input', updateQuestions);

if (!('name' in HTMLDetailsElement.prototype)) {
  faq.addEventListener('toggle', event => {
    if (!event.target.matches('[data-faq-category][open]')) return;
    for (const { item } of questions) {
      if (item !== event.target) item.open = false;
    }
  }, true);
}

updateQuestions();
tools.hidden = false;
