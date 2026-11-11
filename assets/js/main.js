(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'باز کردن منو' : 'بستن منو');
      navigation.classList.toggle('open', !isOpen);
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'باز کردن منو');
      });
    });
  }


  // Team directory: category filters and live text search.
  const memberGrid = document.getElementById('member-grid');
  const memberSearch = document.getElementById('member-search');
  const teamFilters = document.querySelectorAll('.team-filter');
  const teamEmpty = document.getElementById('team-empty');

  if (memberGrid) {
    let activeGroup = 'all';
    const memberCards = Array.from(memberGrid.querySelectorAll('.member-card'));

    const filterMembers = () => {
      const query = (memberSearch?.value || '').trim().toLocaleLowerCase();
      let visible = 0;

      memberCards.forEach((card) => {
        const matchesGroup = activeGroup === 'all' || card.dataset.group === activeGroup;
        const matchesQuery = !query || card.textContent.toLocaleLowerCase().includes(query);
        const show = matchesGroup && matchesQuery;
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (teamEmpty) teamEmpty.hidden = visible !== 0;
    };

    teamFilters.forEach((button) => {
      button.addEventListener('click', () => {
        activeGroup = button.dataset.filter || 'all';
        teamFilters.forEach((item) => {
          const selected = item === button;
          item.classList.toggle('is-active', selected);
          item.setAttribute('aria-pressed', String(selected));
        });
        filterMembers();
      });
    });

    if (memberSearch) memberSearch.addEventListener('input', filterMembers);
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
