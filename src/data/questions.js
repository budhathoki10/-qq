const QUESTIONS = [
  {
    id: 1,
    category: 'Marketing BBA',
    icon: 'M',
    question: 'Which of the following is a key difference between the microenvironment and the macroenvironment?',
    options: [
      'The microenvironment affects all businesses equally.',
      'The macroenvironment can be controlled by the company.',
      'The microenvironment consists of factors that directly affect a company’s daily operations.',
      'The macroenvironment only includes competitors.'
    ],
    correctIndex: 2
  },
  {
    id: 2,
    category: 'Marketing BBA',
    icon: 'M',
    question: 'A company changes its advertising campaign to promote eco-friendly packaging because consumers are becoming more environmentally conscious. Which macroenvironmental factor influenced this decision?',
    options: ['Political', 'Technological', 'Environmental', 'Economic'],
    correctIndex: 2
  },
  {
    id: 3,
    category: 'Marketing BBA',
    icon: 'M',
    question: 'Why is maintaining a good relationship with suppliers important for a business?',
    options: [
      'They help promote products through advertisements.',
      'They influence product quality, availability, and production costs.',
      'They determine customer preferences.',
      'They control government regulations.'
    ],
    correctIndex: 1
  },
  {
    id: 4,
    category: 'Marketing BBA',
    icon: 'M',
    question: 'Which of the following is considered part of the demand side of the microenvironment?',
    options: ['Competitors', 'Suppliers', 'Customers', 'Marketing agencies'],
    correctIndex: 2
  },
  {
    id: 5,
    category: 'Marketing BBA',
    icon: 'M',
    question: 'Why should marketers continuously monitor the marketing environment?',
    options: [
      'To eliminate all competitors.',
      'To avoid conducting market research.',
      'To identify opportunities, adapt to changes, and reduce potential threats.',
      'To control economic conditions.'
    ],
    correctIndex: 2
  },
  {
    id: 6,
    category: 'Current Affairs',
    icon: 'N',
    question: 'Which country was the first to recognize Nepal’s Federal Democratic Republic after the abolition of the monarchy?',
    options: ['China', 'India', 'United States', 'United Kingdom'],
    correctIndex: 1
  },
  {
    id: 7,
    category: 'Current Affairs',
    icon: 'N',
    question: 'Nepal became a member of the United Nations (UN) in which year?',
    options: ['1948', '1955', '1960', '1965'],
    correctIndex: 1
  },
  {
    id: 8,
    category: 'Current Affairs',
    icon: 'N',
    question: 'Nepal joined the World Trade Organization (WTO) in which year?',
    options: ['2002', '2004', '2006', '2008'],
    correctIndex: 1
  },
  {
    id: 9,
    category: 'Current Affairs',
    icon: 'N',
    question: 'Who became Nepal’s first Vice President?',
    options: ['Nanda Bahadur Pun', 'Parmananda Jha', 'Ram Sahaya Prasad Yadav', 'Bidhya Devi Bhandari'],
    correctIndex: 1
  },
  {
    id: 10,
    category: 'Current Affairs',
    icon: 'N',
    question: 'Who was the first President of the Federal Democratic Republic of Nepal?',
    options: ['Ram Baran Yadav', 'Bidhya Devi Bhandari', 'Khil Raj Regmi', 'Girija Prasad Koirala'],
    correctIndex: 0
  },
  {
    id: 11,
    category: 'Politics',
    icon: 'P',
    question: 'Who is serving as Nepal’s Minister for Foreign Affairs in 2026?',
    options: ['Narayan Kaji Shrestha', 'Pradeep Gyawali', 'Shankar Pokharel', 'Shishir Khanal'],
    correctIndex: 3
  },
  {
    id: 12,
    category: 'Politics',
    icon: 'P',
    question: 'Nepal has been negotiating with which global satellite internet company?',
    options: ['OneWeb', 'HughesNet', 'Starlink', 'Viasat'],
    correctIndex: 2
  },
  {
    id: 13,
    category: 'Politics',
    icon: 'P',
    question: 'Nepal’s diplomatic strategy in 2026 is best described as:',
    options: ['Pro-China only', 'Pro-India only', 'Balanced engagement with India and China', 'Neutral towards all countries'],
    correctIndex: 2
  },
  {
    id: 14,
    category: 'Politics',
    icon: 'P',
    question: 'Nepal aims to reduce dependence on imports mainly by:',
    options: ['Increasing remittances', 'Boosting domestic production', 'Raising taxes', 'Restricting tourism'],
    correctIndex: 1
  },
  {
    id: 15,
    category: 'Politics',
    icon: 'P',
    question: 'Which economic issue continues to be one of Nepal’s biggest challenges?',
    options: ['High exports', 'Trade deficit', 'Shortage of hydropower', 'Food surplus'],
    correctIndex: 1
  },
  {
    id: 16,
    category: 'Sports',
    icon: 'S',
    question: 'Which country hosted the first modern Olympic Games in 1896?',
    options: ['France', 'Italy', 'Greece', 'United Kingdom'],
    correctIndex: 2
  },
  {
    id: 17,
    category: 'Sports',
    icon: 'S',
    question: 'In badminton, what is the maximum number of points a player can score in a game before it must end?',
    options: ['21', '25', '30', '35'],
    correctIndex: 2
  },
  {
    id: 18,
    category: 'Sports',
    icon: 'S',
    question: 'Which country hosted the first FIFA World Cup in 1930?',
    options: ['Argentina', 'Brazil', 'Uruguay', 'Italy'],
    correctIndex: 2
  },
  {
    id: 19,
    category: 'Sports',
    icon: 'S',
    question: 'Which Nepali athlete won Nepal’s first-ever Olympic medal?',
    options: ['Deepak Bista', 'Palesha Goverdhan', 'Bidhan Lama', 'Sangina Baidya'],
    correctIndex: 1
  },
  {
    id: 20,
    category: 'Sports',
    icon: 'S',
    question: 'Which country has won the most ICC Men’s Cricket World Cup titles?',
    options: ['India', 'West Indies', 'Australia', 'England'],
    correctIndex: 2
  },
  {
    id: 21,
    category: 'Riddles',
    icon: 'R',
    question: 'I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What am I?',
    options: ['Fire', 'Echo', 'Shadow', 'Whistle'],
    correctIndex: 1
  },
  {
    id: 22,
    category: 'Riddles',
    icon: 'R',
    question: 'What has keys but can’t open locks?',
    options: ['A Map', 'A Piano', 'A Clock', 'A Book'],
    correctIndex: 1
  },
  {
    id: 23,
    category: 'Riddles',
    icon: 'R',
    question: 'What can travel around the world while staying in a corner?',
    options: ['A Stamp', 'A Satellite', 'A Plane', 'A Compass'],
    correctIndex: 0
  },
  {
    id: 24,
    category: 'Riddles',
    icon: 'R',
    question: 'What gets wetter the more it dries?',
    options: ['A Towel', 'A Sponge', 'Water', 'Soap'],
    correctIndex: 0
  },
  {
    id: 25,
    category: 'Riddles',
    icon: 'R',
    question: 'I have cities, but no houses; mountains, but no trees; and water, but no fish. What am I?',
    options: ['A Map', 'A Painting', 'A Dream', 'A Book'],
    correctIndex: 0
  }
]

export default QUESTIONS
