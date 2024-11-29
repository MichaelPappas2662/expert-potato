import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
     
        <div className={styles.headerDivider} />
        <div className={styles.topSection}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/sc-logo-color.svg"
              alt="SafetyCulture"
              width={150}
              height={32}
              className={styles.logo}
            />
          </Link>
          <div className={styles.storeButtons}>
            <Link href="https://apps.apple.com/app/safetyculture">
              <Image
                src="/app-store.svg"
                alt="Download on App Store"
                width={135}
                height={40}
                className={styles.storeButton}
              />
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=safetyculture">
              <Image
                src="/google-play-store.svg"
                alt="Get it on Google Play"
                width={135}
                height={40}
                className={styles.storeButton}
              />
            </Link>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.links}>
            <Link href="/status">Status</Link>
            <span className={styles.divider}>|</span>
            <Link href="/privacy">Privacy</Link>
            <span className={styles.divider}>|</span>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
            <span className={styles.divider}>|</span>
            <Link href="/security">Security</Link>
            <span className={styles.divider}>|</span>
            <span className={styles.copyright}>&copy; SafetyCulture 2023</span>
          </div>
          <div className={styles.socialLinks}>
            <Link href="#" aria-label="Instagram">
              <Image src="/instagram.svg" alt="Instagram" width={20} height={20} />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Image src="/twitter.svg" alt="Twitter" width={20} height={20} />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} />
            </Link>
            <Link href="#" aria-label="YouTube">
              <Image src="/youtube.svg" alt="YouTube" width={20} height={20} />
            </Link>
          </div>
        </div>
      
    </footer>
  );
};

export default Footer;
