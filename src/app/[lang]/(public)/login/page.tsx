
import {Box} from "@mui/material"
import LoginForm from "./_components/loginForm"
import { getDictionary } from "@/dictionaries"

const LoginPage = async ({params}:{ params: Promise<{ lang: 'en' | 'fa' }>}) => {
   const lang = (await params).lang
    const tra = await getDictionary(lang)
  return(
    <Box sx={{direction:tra?.home?.dir}}>
     <LoginForm t={tra}/>
    </Box>
  )
}

export default LoginPage