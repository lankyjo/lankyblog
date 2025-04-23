import './styles.css'
import '@mantine/carousel/styles.css'
import BlogSection from '@/components/blogssection/BlogSection'
import CarouselServer from '@/components/carousel/CarouselServer'
export default function Home() {
  return (
    <>
      <CarouselServer />
      <BlogSection />
    </>
  )
}
