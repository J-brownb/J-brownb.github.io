export const links = {
  email: 'jonjames.hodgson@gmail.com',
  github: 'https://github.com/J-brownb',
  linkedin: 'https://www.linkedin.com/in/jonny-hodgson/',
}

export const oneclick = {
  title: 'OneClickTools',
  kind: 'Live product',
  url: 'https://oneclicktools.co.uk/',
  summary:
    'Free calculators that just work. Quick, accurate answers for everyday money and maths, with results that update as you type, nothing to sign up for and nothing to install.',
  detail:
    'The site covers VAT, percentages, salary conversion, counting days to or from a date, and unit conversion. Every calculation runs in the browser, numbers are never stored, and each tool explains its method with worked examples.',
}

export const moneywise = {
  title: 'Moneywise',
  kind: 'Dissertation project',
  summary:
    'A personal finance web application built to improve financial literacy in the UK: budgeting, net worth, stock research and bite-size lessons in one place.',
  problem:
    'Financial literacy is a significant societal issue in the UK and around the world. Most tools either track money or teach about it, rarely both.',
  approach:
    'Moneywise pairs practical tools with a learning layer. Wireframes and a style tile were created in Figma first, and the name was chosen to cover both the financial and educational sides of the product.',
  stack: ['HTML', 'CSS', 'JavaScript', 'Chart.js', 'Stock data API', 'Figma'],
  shots: [
    { id: 'dark', label: 'Dashboard', src: '/img/mw-dashboard.webp', w: 1600, h: 1277 },
    { id: 'light', label: 'Light mode', src: '/img/mw-light.webp', w: 1600, h: 1146 },
    { id: 'home', label: 'Landing page', src: '/img/mw-home.webp', w: 1600, h: 570 },
  ],
}

export const projects = [
  {
    id: 'wellness',
    title: 'The Wellness Site',
    kind: 'University project · Year 2',
    summary:
      'A dynamic yoga site where members build their own routines, add and review poses, and explore poses across different styles of yoga.',
    stack: ['PHP', 'Smarty', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    features: ['Login and registration', 'Poses, favourites and custom routines', 'Community leaderboard', 'Moon phase API', 'Quote API'],
    notes: [
      ['Accounts', 'Members can add poses, build routines and earn points. Passwords are hashed and salted before they reach the database.'],
      ['Leaderboards', 'Uploading a pose, leaving a review, favouriting or adding a routine earns a “yoga point”. The top contributors are recognised on a community leaderboard.'],
    ],
    shots: [
      { label: 'Home', src: '/img/tws-home.webp', w: 775, h: 880 },
      { label: 'Leaderboards', src: '/img/tws-board.webp', w: 1000, h: 775 },
      { label: 'Register', src: '/img/tws-login.webp', w: 775, h: 880 },
    ],
    tint: '#f47c62',
  },
  {
    id: 'library',
    title: 'Fictional Library Co',
    kind: 'University project · Year 2',
    summary:
      'A library management system used by staff to run the catalogue and by members to browse it, with a working lending, returns and fines flow.',
    stack: ['PHP', 'MySQL'],
    features: ['Login system', 'Employee and customer access levels', 'Lending and returns', 'Fine management', 'Reviews'],
    notes: [
      ['Two account types', 'Employees can create, edit and delete books, authors and users. Customers can leave reviews, see their loans and fines, and manage their account.'],
      ['Lending & returns', 'Staff lend a book to any member for a set period. Marking it returned late generates a fine, which the member sees when they log in and can mark as paid.'],
    ],
    shots: [
      { label: 'Catalogue', src: '/img/flc-home.webp', w: 775, h: 880 },
      { label: 'Returns', src: '/img/flc-lending.webp', w: 775, h: 880 },
      { label: 'Employee', src: '/img/flc-employee.webp', w: 775, h: 880 },
    ],
    tint: '#b07ad1',
  },
]

export const skills = {
  marketing: ['SEO', 'PPC', 'Analytics', 'Content marketing', 'WordPress'],
  build: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'jQuery', 'Bootstrap 5', 'Chart.js', 'Figma', 'Web design', 'Cloudflare', 'cPanel'],
}
