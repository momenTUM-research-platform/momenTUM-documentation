import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const cards = [
  {
    title: 'Platform overview',
    text: 'Understand what momenTUM is and how the Designer, mobile app, backend, data storage, REDCap integration, and dashboard fit together.',
    to: '/docs/overview/platform-overview',
  },
  {
    title: 'Mobile app walkthrough',
    text: 'See how the participant-facing app turns study JSON into scheduled tasks, survey screens, PVT tasks, progress graphs, and submitted responses.',
    to: '/docs/walkthroughs/mobile-app-walkthrough',
  },
  {
    title: 'Example study',
    text: 'Walk through a concrete momenTUM study with modules, sections, questions, scheduling, and raw JSON.',
    to: '/docs/examples/example-study-v3',
  },
  {
    title: 'Study JSON',
    text: 'Explore how study properties, modules, sections, question types, alerts, graphs, and task parameters are represented in JSON.',
    to: '/docs/schemas/study-object',
  },
  {
    title: 'Question types',
    text: 'Inspect the participant-facing input types such as instruction, text, date/time, multiple choice, slider, media, yes/no, and photo.',
    to: '/docs/schemas/question-types',
  },
  {
    title: 'Sample data',
    text: 'See how question IDs from the study JSON map to submitted responses and dashboard views.',
    to: '/docs/sample-data/example-responses',
  },
];

export default function Home(): React.ReactNode {
  return (
    <Layout
      title="momenTUM Documentation"
      description="Interactive documentation for the momenTUM Research Platform"
    >
      <main className="home-page">
        <section className="home-hero">
          <p className="home-eyebrow">momenTUM Research Platform</p>

          <h1>Interactive documentation for study design, app behavior, and data flow.</h1>

          <p className="home-subtitle">
            A guided technical documentation site for understanding how momenTUM studies are
            defined as JSON, rendered in the mobile app, delivered to participants, and connected
            to response data.
          </p>

          <div className="home-actions">
            <Link className="button button--primary button--lg" to="/docs/overview/platform-overview">
              Start with the overview
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/examples/example-study-v3">
              Open example study
            </Link>
          </div>
        </section>

        <section className="home-card-grid">
          {cards.map((card) => (
            <Link key={card.title} className="home-card" to={card.to}>
              <span className="home-card-label">Open section</span>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </Link>
          ))}
        </section>

        <section className="home-note">
          <h2>What this site is for</h2>
          <p>
            This documentation is meant to support onboarding, student work, app walkthroughs, and
            future engineering handover. It combines written explanation with interactive examples
            so that study definitions, app screens, and response data can be understood together.
          </p>
        </section>
      </main>
    </Layout>
  );
}