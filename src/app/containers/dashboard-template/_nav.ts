export const navItems = [
  {
    name: 'Home',
    url: '/home',
    icon: 'icon-speedometer'
  },
  {
    name: 'Our Team',
    url: '/ourteam',
    icon: 'icon-people',
    children: [
      {
        name: 'Doctor A',
        url: '/base/cards',
        icon: 'icon-people'
      },
      {
        name: 'Doctor B',
        url: '/base/carousels',
        icon: 'icon-people'
      }
      ]
  },
  {
    name: 'Sinus Treatments',
    url: '/sinustreatments',
    icon: 'icon-user-follow',
    children: [
      {
        name: 'Treatment 1',
        url: '/base/cards',
        icon: 'icon-puzzle1'
      },
      {
        name: 'Treatment 2',
        url: '/base/carousels',
        icon: 'icon-puzzle1'
      },
      {
        name: 'Treatment 3',
        url: '/base/collapses',
        icon: 'icon-puzzle1'
      }]
  },
  {
    name: 'Allergy Treatments',
    url: '/allergytreatment',
    icon: 'icon-pie-chart',
    children: [
      {
        name: 'Allergy test',
        url: '/base/cards',
        icon: 'icon-puzzle1'
      },
      {
        name: 'Allergy test',
        url: '/base/carousels',
        icon: 'icon-puzzle1'
      },
      {
        name: 'Allergy test',
        url: '/base/collapses',
        icon: 'icon-puzzle1'
      }]
  },
  {
    name: 'Contact Us',
    url: '/contactus',
    icon: 'icon-pie-chart'
  },
];
