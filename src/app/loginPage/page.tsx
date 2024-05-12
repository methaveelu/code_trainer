import SignInHero from "@/components/SignInHero";
import signInHero from '../../../public/signInHero.jpg'


export default async function LoginPage  () {
  
  return (
    <div>
      <SignInHero ImgData={signInHero} title='code trainer'/>
    </div>
  )
}

