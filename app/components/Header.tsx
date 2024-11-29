"use client";
import React, { useState } from 'react';

import {
  ChevronDown,
  Globe,
  LogIn,
  Menu,
  Search,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/header.module.scss';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Desktop Header */}
        <div className={styles.desktopHeader}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/sc-logo-color.svg"
              alt="SafetyCulture"
              width={150}
              height={32}
            />
          </Link>

          <div className={styles.rightSection}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Search anything... (e.g. devices)"
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                <Search size={20} />
              </button>
            </div>

            <div className={styles.actions}>
              <div className={styles.languageSelector}>
                <button>
                  <Globe size={16} />
                  English (US)
                  <ChevronDown size={16} />
                </button>
              </div>
              <Link href="/login" className={styles.loginButton}>
                <LogIn size={16} />
                Log in
              </Link>
              <Link href="/contact" className={styles.contactButton}>
                Contact us
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className={styles.mobileHeader}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/sc-logo-color.svg"
              alt="SafetyCulture"
              width={150}
              height={32}
            />
          </Link>

          <div className={styles.mobileActions}>
            <button className={styles.searchButton}>
              <Search size={24} />
            </button>
            <button
              className={styles.menuButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className={styles.mobileNav}>
            <ul>
              <li>
                <Link href="/get-started">Get started</Link>
              </li>
              <li>
                <Link href="/using-safetyculture">Using SafetyCulture</Link>
              </li>
              <li>
                <Link href="/administration">Administration</Link>
              </li>
              <li>
                <Link href="/integrations">Integrations</Link>
              </li>
              <li>
                <Link href="/account-settings">Account settings</Link>
              </li>
              <li>
                <Link href="/fixing-problems">Fixing problems</Link>
              </li>
            </ul>
            <div className={styles.mobileLangSelector}>
              <button>
                <Globe size={20} />
                English (US)
                <ChevronDown size={16} />
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
