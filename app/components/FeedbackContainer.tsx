"use client";

import React, { useState } from 'react';

import {
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import Link from 'next/link';

import styles from '../styles/feedbackContainer.module.scss';

const FeedbackContainer: React.FC = () => {
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);

  const handleYesClick = () => {
    setFeedbackGiven(true);
  };

  const handleNoClick = () => {
    setFeedbackGiven(false);
  };

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.inlineContainer}>
        <span className={styles.feedbackText}>Was this page helpful?</span>
        <button
          className={styles.feedbackButton}
          onClick={handleYesClick}
          disabled={feedbackGiven !== null}
        >
          <span className={styles.buttonText}>Yes</span>
          <ThumbsUp size={16} className={styles.icon} />
        </button>
        <button
          className={styles.feedbackButton}
          onClick={handleNoClick}
          disabled={feedbackGiven !== null}
        >
          <span className={styles.buttonText}>No</span>
          <ThumbsDown size={16} className={styles.icon} />
        </button>
        <Link href="/contact-us">
          <span className={styles.contactUsLink}>Contact us</span>
        </Link>
      </div>
      {feedbackGiven !== null && (
        <div className={styles.feedbackMessage}>
          {feedbackGiven ? (
            <p>Thank you for your feedback!</p>
          ) : (
            <p>
              We&apos;re sorry to hear that. Please{" "}
              <Link href="/contact-us">contact us</Link> with your feedback.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackContainer;
