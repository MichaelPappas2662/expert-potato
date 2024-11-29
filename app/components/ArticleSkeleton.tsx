import styles from '../styles/skeleton.module.scss';

export default function ArticleSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.breadcrumb}></div>
      <div className={styles.title}></div>
      <div className={styles.description}></div>
      <div className={styles.content}>
        {[1, 2, 3].map(i => (
          <div key={i} className={styles.paragraph}></div>
        ))}
      </div>
    </div>
  )
}