import { useState } from 'react';
import logo from '../../../public/images/logo.png';
import Sun from '../../../public/images/Sun.png';
import SunMb from '../../../public/images/mb/Sun.png';
import bg from '../../../public/images/background.png';
import './home.css';
import { Link } from 'react-router-dom';
import { getCurrentProcess, queryMintEvents } from '../../contract/karma-token';

import HomeContentEng from './homeContentEng/homeContentEng';
import HomeContentCn from './homeContentCn/homeContentCn';
import Mountain from '../../components/Mountain/Mountain';

function Home() {
    const [selectedLang, setSelectedLang] = useState('en');
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    

    const handleLangToggle = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };

    const handleLangSelect = (lang) => {
        setSelectedLang(lang);  
        setIsSubmenuOpen(false);
    };
    const fetchContractData = async () => {
        try {
            const process = await getCurrentProcess();
            console.log('Current Process:', process);

            const mintEvents = await queryMintEvents();
            console.log('Mint Events:', mintEvents);
        } catch (error) {
            console.error('Error fetching contract data:', error);
        }
    };
    fetchContractData();
    return (
        <>
        <section className="mountain-container">
            <div className="bg">
            <img src={bg} alt="" loading="lazy" />
            </div>
            <div id="header">
                <Link to="/" className="logo">
                    <img src={logo} alt="karma-logo" loading="lazy" />
                </Link>
                <div className="nav">
                    <Link to="/faq" className="nav-faq">
                    Faq
                </Link>
                <div className="nav-language">
                    <div id="lang-toggle" onClick={handleLangToggle}>
                        Language
                    </div>
                    <div id="lang-submenu" className={isSubmenuOpen ? '' : 'hidden'}>
                    <div
                    data-lang="en"
                    className={`lang ${selectedLang === 'en' ? 'active' : ''}`}
                    onClick={() => handleLangSelect('en')}
                    >
                        ENG
                    </div>
                    <div
                    data-lang="cn"
                    className={`lang ${selectedLang === 'cn' ? 'active' : ''}`}
                    onClick={() => handleLangSelect('cn')}
                    >
                    汉语
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div id="container">

                <div className="title">
                    <span>KARMA</span>
                    <span>TODAY</span>
                </div>
                <div className="sun">
                    <img className="pc" src={Sun} alt="sun" loading="lazy" />
                    <img className="mb" src={SunMb} alt="sun" loading="lazy" />
                </div>
            </div>
            <Mountain />
        </section>
        <HomeContentEng
            className={`karma-content ${selectedLang === 'en' ? '' : 'hidden'}`}
            id="karma-content_en"
        />
        <HomeContentCn
            className={`karma-content ${selectedLang === 'cn' ? '' : 'hidden'}`}
            id="karma-content_cn"
        />
        </>
    );
}

export default Home;