export const headerSizeCalculator = (): number => {
  const topbarElement: HTMLElement | null = document.querySelector('.topbarWidgetArea');
  const topbarHeight: number = topbarElement?.offsetHeight || 0;

  const headerElement: HTMLElement | null = document.querySelector('.headerWidgetArea');
  const headerHeight: number = headerElement?.offsetHeight || 0;

  const navigationElement: HTMLElement | null = document.querySelector('.navigationWidgetArea');
  const navigationHeight: number = navigationElement?.offsetHeight || 0;

  return topbarHeight + headerHeight + navigationHeight;
};