const headerSizeCalculator = () => {
    const topbarElement = document.querySelector<HTMLElement>('.topbar');
    const topbarHeight = topbarElement?.offsetHeight || 0;

    const headerElement = document.querySelector<HTMLElement>('.header');
    const headerHeight = headerElement?.offsetHeight || 0;

    const navigationElement = document.querySelector<HTMLElement>('.navigation');
    const navigationHeight = navigationElement?.offsetHeight || 0;

    return topbarHeight + headerHeight + navigationHeight ;
};

export default headerSizeCalculator;