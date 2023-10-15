const defaultColorVariables:string = `
:root {
  --primary-text-color: #fff;
  --secondary-text-color: #b3b3b3;
  --tertiary-text-color: #8c8c8c;
  --primary-background-color: #000;
  --secondary-background-color: #0e0e0e;
  --tertiary-background-color: #151515;

  --dim-background-color: rgba(0, 0, 0, .6);
  --primary-active-color: #f90;
  --secondary-active-color: #6c757d;
  --primary-gradiant: linear-gradient(180deg, #fff, hsla(0, 0%, 100%, .6));

  --primary-text-shodow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  /*sidebar size*/
  --sidebar-desktop-width: 320px;
  /*borders*/
  --default-border-color: rgba(138, 145, 158, .2);
  --default-border: solid var(--default-border-color, #ccc) .2px;
  /*buttons*/
  --primary-button-link-background-color: #f90;
  --primary-button-link-text-color: #000;

  --secondary-button-link-background-color: #6c757d;
  --secondary-button-link-text-color: #fff;

  --success-button-link-background-color: #28a745;
  --success-button-link-text-color: #fff;

  --danger-button-link-background-color: #dc3545;
  --danger-button-link-text-color: #fff;

  --warning-button-link-background-color: #f90;
  --warning-button-link-text-color: #212529;

  --info-button-link-background-color: #117a8b;
  --info-button-link-text-color: #fff;

  --dark-button-link-background-color: #1b1b1b;
  --dark-button-link-border-color: #1b1b1b;
  --dark-button-link-text-color: #fff;

  --light-button-link-background-color: #f8f9fa;
  --light-button-link-border-color: #f8f9fa;
  --light-button-link-text-color: #212529;
}
`

export default defaultColorVariables