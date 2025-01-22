export const headerSizeCalculator = (): number => {
  const topbarElement: HTMLElement | null = document.querySelector('.topbar-widget-area');
  const topbarHeight: number = topbarElement?.offsetHeight || 0;

  const headerElement: HTMLElement | null = document.querySelector('.header-widget-area');
  const headerHeight: number = headerElement?.offsetHeight || 0;

  const navigationElement: HTMLElement | null = document.querySelector('.navigation-widget-area');
  const navigationHeight: number = navigationElement?.offsetHeight || 0;

  return topbarHeight + headerHeight + navigationHeight;
};