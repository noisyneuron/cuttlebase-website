export const config = {
  routes: [
    { 
      path: '/', 
      component: './pages/home',
      link: '',
      exact: true,
    },
    {
      path: '/team',
      component: './pages/team',
      link: 'Team',
      inHeader: true,
    },
    {
      path: '/info',
      component: './pages/info',
      link: 'Info',
      inHeader: true,
    },
    {
      path: '/downloads',
      component: './pages/downloads',
      link: 'Downloads',
      inHeader: true,
    },
    {
      path: '/3d-brain-histology',
      component: './pages/brain',
      link: '3D Brain & Histology',
      inTools: true,
      icon: 'assets/icons/brain.svg',
      key: 'brain',
    }, 
    {
      path: '/3d-cuttlefish',
      component: './pages/body',
      link: '3D Cuttlefish',
      inTools: true,
      icon: 'assets/icons/body.svg',
      key: 'body',
    },
    {
      path: '/embryonic-development',
      component: './pages/development',
      link: 'Embryonic Development',
      inTools: true,
      icon: 'assets/icons/development.svg',
      key: 'development',
    },
    {
      path: '/genome-transcriptome',
      component: './pages/genome',
      link: 'Genome & Transcriptome',
      inTools: true,
      icon: 'assets/icons/genome.svg',
      key: 'genome',
    }
  ],
  breakpoints: {
    isMobile: {
      query: '(max-width: 475px)',
      class: '-mobile',
    },
    isTablet: {
      query: '(min-width: 476px) and (max-width: 1024px)',
      class: '-tablet',
    },
    isLaptop: {
      query: '(min-width: 1025px) and (max-width: 1440px)',
      class: '-laptop',
    },
    isDesktop: {
      query: '(min-width: 1441px)',
      class: '-desktop',
    }
  }
}