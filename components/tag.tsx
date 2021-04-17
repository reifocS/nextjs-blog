import styles from './tag.module.css'


export default function Tag({ tag }: { tag: string }) {
  return <li><span className={styles.tag}>{tag}</span></li>

}