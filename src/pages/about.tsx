import React from 'react';
import Link from 'next/link';

function AboutPage() {
  return (
    <div>
      About Page
      <Link href="/">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>Go to Home</a>
      </Link>
    </div>
  );
}

export default AboutPage;
