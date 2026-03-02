const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('../src/models/Job');

dotenv.config();

const seedJobs = [
  {
    title: 'Senior Product Designer',
    company: 'Dropbox',
    location: 'San Francisco, US',
    category: 'Design',
    description:
      'Lead product design initiatives across web and mobile. Collaborate with PM and engineering to ship user-centered experiences.',
  },
  {
    title: 'Frontend Engineer',
    company: 'Stripe',
    location: 'Remote',
    category: 'Engineering',
    description:
      'Build scalable React interfaces and improve design system quality. Work closely with API teams and product designers.',
  },
  {
    title: 'Backend Engineer',
    company: 'Notion',
    location: 'Dublin, Ireland',
    category: 'Technology',
    description:
      'Design and maintain Node.js services, optimize query performance, and improve reliability for high-traffic features.',
  },
  {
    title: 'Marketing Specialist',
    company: 'Canva',
    location: 'Sydney, Australia',
    category: 'Marketing',
    description:
      'Plan and execute campaign strategies, analyze acquisition channels, and coordinate with content and product teams.',
  },
  {
    title: 'Sales Executive',
    company: 'HubSpot',
    location: 'Boston, US',
    category: 'Sales',
    description:
      'Own full sales cycle from prospecting to closing enterprise deals. Maintain forecast accuracy and CRM hygiene.',
  },
  {
    title: 'Finance Analyst',
    company: 'PayPal',
    location: 'Berlin, Germany',
    category: 'Finance',
    description:
      'Support budgeting, variance analysis, and financial reporting. Partner with cross-functional teams for planning cycles.',
  },
  {
    title: 'HR Manager',
    company: 'Airbnb',
    location: 'London, UK',
    category: 'Human Resource',
    description:
      'Drive talent management, performance systems, and employee engagement programs across distributed teams.',
  },
  {
    title: 'Business Analyst',
    company: 'Shopify',
    location: 'Toronto, Canada',
    category: 'Business',
    description:
      'Translate business goals into measurable KPIs, build reports, and deliver recommendations for strategic decisions.',
  },
  {
    title: 'UI Designer',
    company: 'Figma',
    location: 'New York, US',
    category: 'Design',
    description:
      'Create polished UI concepts, component libraries, and responsive layouts aligned with product and brand standards.',
  },
  {
    title: 'Mobile Engineer',
    company: 'Uber',
    location: 'Amsterdam, Netherlands',
    category: 'Technology',
    description:
      'Develop performant mobile features, improve architecture, and ensure quality through testing and monitoring.',
  },
  {
    title: 'Growth Marketer',
    company: 'Slack',
    location: 'Paris, France',
    category: 'Marketing',
    description:
      'Run experiments across lifecycle funnels, optimize retention, and scale acquisition channels with data-driven insights.',
  },
  {
    title: 'Account Executive',
    company: 'Atlassian',
    location: 'Singapore',
    category: 'Sales',
    description:
      'Manage enterprise accounts, identify expansion opportunities, and build long-term customer partnerships.',
  },
];

const runSeed = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is missing in .env');
  }

  await mongoose.connect(mongoUri);

  const operations = seedJobs.map((job) => ({
    updateOne: {
      filter: { title: job.title, company: job.company },
      update: { $set: job },
      upsert: true,
    },
  }));

  const result = await Job.bulkWrite(operations, { ordered: false });
  const totalInCollection = await Job.countDocuments();

  console.log('Seed complete');
  console.log(`Matched: ${result.matchedCount}`);
  console.log(`Modified: ${result.modifiedCount}`);
  console.log(`Upserted: ${result.upsertedCount}`);
  console.log(`Total jobs in collection: ${totalInCollection}`);

  await mongoose.disconnect();
};

runSeed()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error('Seed failed:', error.message);
    try {
      await mongoose.disconnect();
    } catch (disconnectError) {
      // noop
    }
    process.exit(1);
  });
