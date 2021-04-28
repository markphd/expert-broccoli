import Link from 'next/link';

export const PotLink = ({ potData }) => {
  const {name, price } = potData
  
  return <Link href="/pots/[potName]" as={`/pots/${name}`}>
    <a className="collection-cover-container">
      
      <img className="collection-cover" src={`/static/pots/cover/${name.split(' ').join('-').toLowerCase()}.jpg`} alt={name}/>
      <span className="collection-title">{name}</span>
      {/* <span className="gallery-view-details">ⓘ View details</span> */}
    </a>
  </Link>
}