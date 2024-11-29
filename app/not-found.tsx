import Link from 'next/link';

import styles from './styles/error.module.scss';

export default function NotFound() {
  return (
    <div className={styles.errorContainer}>
      <h1>404 - Article Not Found</h1>
      <p>The article you&apos;re looking for does&apos;nt exist or has been moved.</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}