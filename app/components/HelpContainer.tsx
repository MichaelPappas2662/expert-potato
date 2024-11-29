import React from 'react';

import {
  Mail,
  MessageSquare,
  Phone,
  Users,
} from 'lucide-react';
import Link from 'next/link';

import styles from '../styles/helpContainer.module.scss';

const buttons = [
  {
    label: "Live Chat",
    icon: MessageSquare,
    iconProps: { size: 16, "aria-hidden": true },
    href: "/contact-support",
    className: styles.helpButton,
  },
  {
    label: "Email",
    icon: Mail,
    iconProps: { size: 16, "aria-hidden": true },
    href: "/forum",
    className: styles.helpButton,
  },
  {
    label: "Phone",
    icon: Phone,
    iconProps: { size: 16, "aria-hidden": true },
    href: "/faqs",
    className: styles.helpButton,
  },
  {
    label: "Ask the community",
    icon: Users,
    iconProps: { size: 20, "aria-hidden": true },
    href: "/feedback",
    className: styles.communityButton,
  },
];

const HelpContainer: React.FC = () => (
  <div className={styles.helpContainer}>
    <h3 className={styles.helpTitle}>Need more help?</h3>
    <div className={styles.buttonGroup}>
      {buttons.map((button, index) => {
        const IconComponent = button.icon;
        return (
          <Link key={index} href={button.href} className={button.className}>
            <IconComponent {...button.iconProps} className={styles.icon} />
            <span className={styles.buttonText}>{button.label}</span>
          </Link>
        );
      })}
    </div>
  </div>
);

export default HelpContainer;
