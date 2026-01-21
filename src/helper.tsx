export const openExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  export const handleNavigateToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 110; 

      window.scrollTo({
        top: element.getBoundingClientRect().top - offset,
        behavior: 'smooth'
      });
    }
  };
  