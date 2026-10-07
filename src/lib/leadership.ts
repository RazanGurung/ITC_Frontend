// Leadership of the International Tamu (Gurung) Council (ITC).
// Source: board bios supplied by the council. Ages, birth dates, street
// addresses and family details are intentionally left out of public content.

export interface LeadershipMember {
  name: string;
  role: string;
  image: string;
  location: string;
  /** Short line shown on the card */
  summary: string;
  /** Fuller list shown in the featured layout */
  highlights: string[];
}

export const president = {
  name: 'Anand Tamu Gurung',
  role: 'President',
  organization: 'International Tamu (Gurung) Council (ITC)',
  image: '/images/team/anand-tamu-gurung.jpg',
  location: 'Kurseong, Darjeeling District, West Bengal, India',
  // From the bio supplied by the council. The supplied text breaks off mid-way
  // through "Social & Organizational Involvement"; add the rest when received.
  titles: [
    'President, International Tamu (Gurung) Council (ITC)',
    'President, All India Gurung Tamu Buddhist Organization',
  ],
  facts: [
    { label: 'Born', value: 'Darjeeling, India' },
    { label: 'Home', value: 'Kurseong, Darjeeling District, West Bengal, India' },
    { label: 'Education', value: 'Bachelor of Arts (B.A.)' },
    { label: 'Profession', value: 'Librarian, 27 years of professional experience' },
  ],
};

export const executives: LeadershipMember[] = [
  {
    name: 'Pradeep Konay Gurung',
    role: 'Vice President',
    image: '/images/team/pradeep-konay-gurung.jpg',
    location: 'Charlotte, North Carolina, USA',
    summary: 'Founder of the United Gurung Society of America; poet and writer.',
    highlights: [
      'Founder and present President, United Gurung Society of America',
      'Poet and writer',
      'Realtor, interpreter and businessman; BA, B.Ed',
    ],
  },
  {
    name: 'Rupa Gurung',
    role: 'Secretariat Secretary',
    image: '/images/team/rupa-gurung.jpg',
    location: 'South Korea · from Rupandehi, Nepal',
    summary: 'Fifteen years of work in cultural preservation and community service.',
    highlights: [
      'Immediate Past President & Chief Adviser, Tamu Dhin South Korea',
      '15 years in community development, social service and cultural preservation',
    ],
  },
  {
    name: 'Ganga Gurung',
    role: 'Treasurer',
    image: '/images/team/ganga-gurung.jpg',
    location: 'Lalitpur, Nepal',
    summary: 'Also Treasurer of the Gurung National Council.',
    highlights: [
      'Treasurer, Gurung National Council',
      'Council Member, International Sepak Takraw Federation',
      'Retired Inspector, Singapore Police; community service and social work',
    ],
  },
];

export const secretariat: LeadershipMember[] = [
  {
    name: 'Khushi Klhe Tamusyo',
    role: 'Secretariat Member',
    image: '/images/team/khushi-klhe-tamusyo.jpg',
    location: 'Israel · from Lamjung, Nepal',
    summary: 'Former President and Board of Trustees member, Tamu Samaj Israel.',
    highlights: [],
  },
];

export const councilMembers: LeadershipMember[] = [
  {
    name: 'Heupati Gurung',
    role: 'Council Member',
    image: '/images/team/heupati-gurung.jpg',
    location: 'Sydney, Australia',
    summary: 'Immediate Past President, Tamu Society Sydney.',
    highlights: [],
  },
  {
    name: 'Dinesh Gurung',
    role: 'Council Member',
    image: '/images/team/dinesh-gurung.jpg',
    location: 'Doha, Qatar',
    summary: 'President, Tamu (Gurung) Samaj Qatar.',
    highlights: [],
  },
  {
    name: 'Chandra B. Gurung',
    role: 'Council Member',
    image: '/images/team/chandra-b-gurung.jpg',
    location: 'West Sikkim, India',
    summary: 'Executive Director, Surya Shiksha Sadan Foundation; President, Lions Club of Kathmandu.',
    highlights: [],
  },
  {
    name: 'Om Bahadur Gurung',
    role: 'Council Member',
    image: '/images/team/om-bahadur-gurung.jpg',
    location: 'New York, USA',
    summary: 'President, The Gurung (Tamu) Society Inc. USA, established 2001.',
    highlights: [],
  },
];

export const heritageImages = [
  {
    src: '/images/heritage/tamu-heritage-dress.jpg',
    alt: 'Tamu women in traditional plaid headwear, gold jewellery and beaded necklaces',
    caption: 'Living dress and ornament',
  },
  {
    src: '/images/heritage/himalayan-homeland.jpg',
    alt: 'Snow-capped Himalayan peaks above the hills of the Tamu homeland',
    caption: 'The Himalayan homeland',
  },
  {
    src: '/images/heritage/highland-pastures.jpg',
    alt: 'A flock of sheep grazing on a highland pasture, a traditional Tamu way of life',
    caption: 'Pastoral highland life',
  },
];

// Milestone text is taken from the council document.
export const milestones = [
  {
    year: '2016',
    title: 'Historic First Tamu SAARC Conference',
    place: 'Dharan, Sunsari · 23–24 October 2016 (7–8 Kartik 2073 B.S.)',
    description:
      'The conference was conceptualized and envisioned by Mr. Resham Gurung, former Chairperson of the National House of Tamu (Gurung). The success of the conference encouraged Tamu organizations to strengthen their relationships beyond national boundaries and created a foundation for a wider international initiative.',
  },
  {
    year: '2019',
    title: 'First International Tamu Conference',
    place: 'Kathmandu, Nepal · 11–12 October 2019 (24–25 Ashwin 2076 B.S.)',
    description:
      'The conference was coordinated by Mr. Resham Gurung, former Chairperson of Tamu Hyula Chhoj Dhin Gurung Rastriya Parishad, with the support of a 251-member Main Organizing Committee and various subcommittees. It adopted the By-Laws (Constitution) of the International Tamu (Gurung) Council and the Kathmandu Declaration 2019, providing a formal foundation for an international network of Tamu organizations and communities under the guiding theme: “Unity, Identity and Prosperity”.',
  },
  {
    year: '2022',
    title: 'Second International Tamu (Gurung) Conference',
    place: 'Dentam, West Sikkim, India · 11–13 October 2022',
    description:
      'Successfully organized in association with the Gurung Association of Sikkim (GURAS). The conference concluded with the Dentam Declaration 2022, further strengthening the shared commitment to Tamu unity, identity, culture, and cooperation.',
  },
];

export const conferenceImages = [
  {
    src: '/images/conference2019/conference-2019-stage.jpg',
    alt: 'The stage at the Historic First International Tamu Conference, Kathmandu, October 2019',
    caption: 'Historic First International Tamu Conference, Kathmandu, 2019',
  },
  {
    src: '/images/conference2019/conference-2019-felicitation.jpg',
    alt: 'Dignitaries being felicitated with khada scarves at the 2019 conference',
    caption: 'Felicitation at the 2019 conference',
  },
];
