import Navbar from "./navbar";
import Footer from "./footer";
import { ReactNodeProps } from "../type/type";

export default function Layout({children}:ReactNodeProps ) {
    const navbarHeight=80
    const footerHeight=30
    const bodyHeight= window.innerHeight -navbarHeight-footerHeight-100
    return (
        <>
            <Navbar />
            <div style={{minHeight:`${bodyHeight}px`,padding:"100px"}}>
                {children}
            </div>
            <Footer />
        </>
    )
}