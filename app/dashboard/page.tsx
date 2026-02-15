import './dashboard.css'
import Image from 'next/image'
import jotdownBannerImg from '../images/BASE_BACKGROUND_borderless.jpg'
export default function Home() {
  return (
    <main className='.notebookFilter'>
      <div className='transparentGlass'></div>
      <div className='mainBanner'>
        <Image src={jotdownBannerImg} className='homepageImage' alt='homepageImage'></Image>
        <div className='homepageCoverup'></div>
        <div className='homepageHeadText'>We jot it down</div>
        <div className='homepageImageDesign2'></div>
        <div className='homepageImageDesign3'></div>
        <div className='homepageImageDesign'></div>
      
        <div className='homepageText'>Beat exam stress! We'll tackle your projects, so you can focus on studying. Connect with writers at Rs 59/5 pages. Tight on cash? Join us and write to earn. Scroll down for details!</div>
        <div className='homepageHeading2'>JOTDOWN</div>
      </div>
      <div className='productsBanner'>
          <div className='productsBannerHeading'>Our Products</div>
      </div>
      <div className='products'></div>
      <div className='writers'></div>
    </main>
  )
}
