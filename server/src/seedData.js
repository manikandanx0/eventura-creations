const placeholder = (label) =>
  `https://via.placeholder.com/800x400/DAA3FF/150A35?text=${encodeURIComponent(label)}`;

export const seedProjects = [
  {
    slug: 'novatech-annual-summit-2024',
    title: 'NovaTech Annual Summit 2024',
    projectType: 'Corporate Conference',
    location: 'Bengaluru, India',
    year: 2024,
    description:
      "A two-day corporate summit bringing together NovaTech's leadership team, partners, and employees for strategy alignment and networking.",
    image: '/assets/images/projects/novatech.jpg',
    metrics: [
      { value: '500+', label: 'attendees' },
      { value: '98%', label: 'satisfaction' },
      { value: '0', label: 'schedule overruns' },
    ],
    hasCaseStudy: true,
    caseStudy: {
      client: 'NovaTech (Enterprise Software Company)',
      duration: '2 Days',
      nextSlug: 'lumen-smart-home-product-launch',
      sections: [
        {
          title: 'The Challenge',
          paragraphs: [
            "NovaTech needed to host its annual leadership and partner summit for over 500 attendees while managing multiple parallel sessions, executive keynotes, and networking opportunities. The key challenge was ensuring flawless coordination, strict timelines, and a professional atmosphere that reflected the company's brand.",
          ],
        },
        {
          title: 'Our Approach',
          paragraphs: [
            'Eventura Creations handled the event end-to-end, beginning with agenda structuring and venue layout planning. A dual-track schedule was designed to avoid congestion while maintaining smooth attendee movement.',
            'Key focus areas included:',
          ],
          listItems: [
            'Clear session flow and timing',
            'High-quality AV setup for presentations',
            'Efficient registration and on-ground coordination',
          ],
        },
        {
          title: 'Execution',
          content: [
            { type: 'image', src: placeholder('Conference+Setup') },
            {
              type: 'list',
              items: [
                'Designed a two-track session layout with dedicated support teams',
                'Managed stage design, lighting, and sound for keynote sessions',
                'Coordinated speaker schedules and rehearsals',
                'Implemented a streamlined registration and check-in process',
              ],
            },
            {
              type: 'paragraph',
              text: 'The event ran entirely on schedule across both days without any operational delays.',
            },
          ],
        },
        {
          title: 'Results & Impact',
          results: [
            { value: '500+', label: 'attendees' },
            { value: '12', label: 'keynote and breakout sessions' },
            { value: '98%', label: 'attendee satisfaction score' },
            { value: '0', label: 'schedule overruns' },
          ],
        },
        {
          title: 'Key Takeaways',
          paragraphs: [
            'A structured agenda and strong on-ground coordination are critical for large corporate events. Clear communication between teams ensured a smooth experience for both speakers and attendees.',
          ],
        },
      ],
    },
  },
  {
    slug: 'lumen-smart-home-product-launch',
    title: 'Lumen Smart Home Product Launch',
    projectType: 'Product Launch',
    location: 'Mumbai, India',
    year: 2023,
    description:
      "A high-energy launch event for Lumen's smart home product line, designed to showcase features through live demos.",
    image: '/assets/images/projects/lumen.png',
    metrics: [
      { value: '300', label: 'attendees' },
      { value: '40+', label: 'media mentions' },
      { value: '3×', label: 'website traffic' },
    ],
    hasCaseStudy: true,
    caseStudy: {
      client: 'Lumen (Consumer Technology Brand)',
      duration: '1 Day',
      nextSlug: 'novatech-annual-summit-2024',
      sections: [
        {
          title: 'The Challenge',
          paragraphs: [
            'Lumen required a launch event that would not only introduce their new smart home product line but also create excitement among media, influencers, and potential partners. The challenge was balancing brand storytelling, live demonstrations, and media coverage within a limited timeframe.',
          ],
        },
        {
          title: 'Our Approach',
          paragraphs: [
            'Eventura Creations developed a launch concept focused on interaction and visibility. The event layout was designed to guide attendees through product demo zones before the main reveal.',
            'Key focus areas included:',
          ],
          listItems: ['Audience engagement', 'Media-friendly setups', 'Smooth transitions between segments'],
        },
        {
          title: 'Execution',
          content: [
            { type: 'image', src: placeholder('Event+Execution') },
            {
              type: 'list',
              items: [
                'Designed an immersive stage reveal experience',
                'Set up interactive demo zones with guided walkthroughs',
                'Coordinated media and influencer attendance',
                'Managed live-streaming and event timing',
              ],
            },
            {
              type: 'paragraph',
              text: 'The event maintained high energy while allowing attendees to experience the product firsthand.',
            },
          ],
        },
        {
          title: 'Results & Impact',
          results: [
            { value: '300+', label: 'attendees' },
            { value: '40+', label: 'media mentions' },
            { value: '3×', label: 'increase in website traffic on launch day' },
            { value: 'High', label: 'post-event brand recall' },
          ],
        },
        {
          title: 'Key Takeaways',
          paragraphs: [
            'Interactive experiences significantly increase product understanding and recall. A well-planned event flow ensured both media and attendees engaged deeply with the product.',
          ],
        },
      ],
    },
  },
  {
    slug: 'arjun-meera-wedding',
    title: 'The Arjun–Meera Wedding',
    projectType: 'Wedding & Private Event',
    location: 'Udaipur, India',
    year: 2024,
    description:
      'A three-day destination wedding blending traditional ceremonies with modern design elements.',
    image: '/assets/images/projects/arjunMeera.jpg',
    metrics: [
      { value: '200+', label: 'guests' },
      { value: '5', label: 'themed events' },
      { value: '3', label: 'venues' },
    ],
    hasCaseStudy: false,
    caseStudy: null,
  },
  {
    slug: 'pulsefit-mall-brand-activation',
    title: 'PulseFit Mall Brand Activation',
    projectType: 'Brand Activation',
    location: 'Chennai, India',
    year: 2023,
    description:
      'A weekend brand activation aimed at increasing awareness and trials for PulseFit fitness products.',
    image: '/assets/images/projects/pulsefit.jpg',
    metrics: [
      { value: '1,200+', label: 'interactions' },
      { value: '35%', label: 'conversion rate' },
    ],
    hasCaseStudy: false,
    caseStudy: null,
  },
];
