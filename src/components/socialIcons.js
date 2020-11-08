import React from 'react';
import IconLinkedIn from './Icons/in';
import IconInstagram from './Icons/instagram';

const socialIcons = ({ iconClasses }) => {
  return (
    <>
      <a
        href='https://www.linkedin.com/in/cadekynaston/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <IconLinkedIn classes={`${iconClasses}`} />
      </a>
      <a
        href='https://www.instagram.com/cadekynaston'
        target='_blank'
        rel='noopener noreferrer'
      >
        <IconInstagram classes={`${iconClasses}`} />
      </a>
    </>
  );
};

export default socialIcons;
