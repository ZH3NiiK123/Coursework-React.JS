import React from "react";
import { Link } from "react-router-dom";
import "./styles/H&F.css";
import logo from "./styles/pic/Logo.png";
import fb from "./styles/pic/facebook.svg";
import inst from "./styles/pic/instagram.svg";
import "./mainPage";

export function NavBar() {
    return (
        <nav className='navBar'>
            <section className="logo">
                <img src={logo} alt="" width={"35vw"} />
            </section>

            <section className="interface">
                <p><a href="/#catalog">catalog</a></p>
                <p><Link to={{ pathname: "/favorites" }} >favourites</Link></p>
                {/* <p><Link href="./aboutUs.html">о нас</Link></p> */}
            </section>
            <section className='favourites'>
                <Link to={{ pathname: "/favorites" }} >⚝</Link>
            </section>
        </nav >
    );
}

export function Footer() {
    return (
        <footer>
            <div>
                <div className="footerLogo">
                    <img src={logo} alt='fd' />
                </div>
                <div className="footerNav">
                    <p><a href="/#catalog">catalog</a></p>
                    <p><Link href="./basket.html">favourites</Link></p>
                    {/* <p><Link href="./aboutUs.html">о нас</Link></p> */}
                </div>
                <div className="socialNetworks">
                    <img src={fb} alt='fd' />
                    <img src={inst} alt='fd' />
                </div>
            </div>
        </footer >
    );
}

