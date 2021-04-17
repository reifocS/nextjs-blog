import Tag from './tag'
import styles from './tag.module.css'


export default function Tags({ tags }: { tags: string[] }) {
  return <ul className={styles.tags}>
    {tags.map(t => <Tag key={t} tag={t}/>)}
  </ul>
}