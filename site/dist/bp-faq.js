const faq = document.querySelector('[data-faq]');
const tools = faq.querySelectorAll('[data-faq-tools]');
const search = faq.querySelector('[data-faq-search]');
const filters = [...faq.querySelectorAll('[data-faq-filter]')];
const count = faq.querySelector('[role="status"]');
const empty = faq.querySelector('[data-faq-empty]');
const topics = [...faq.querySelectorAll('[data-faq-topic]')].map(section => ({
  section,
  id: section.dataset.faqTopic,
  questions: [...section.querySelectorAll('.bp-faq-question')].map(item => ({
    item,
    text: item.textContent.trim().toLowerCase(),
  })),
}));

let category = 'all';

function updateQuestions() {
  const query = search.value.trim().toLowerCase();
  let visibleCount = 0;
  for (const { section, id, questions } of topics) {
    const matchesCategory = category === 'all' || category === id;
    let topicCount = 0;
    for (const { item, text } of questions) {
      const visible = matchesCategory && text.includes(query);
      item.hidden = !visible;
      if (visible) topicCount++;
    }
    section.hidden = topicCount === 0;
    visibleCount += topicCount;
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
    if (!event.target.matches('.bp-faq-question[open]')) return;
    for (const item of faq.querySelectorAll('.bp-faq-question[open]')) {
      if (item !== event.target) item.open = false;
    }
  }, true);
}

updateQuestions();
for (const control of tools) control.hidden = false;
