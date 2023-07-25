import Image from "next/image";
import Link from "next/link";



export default function Footer() {
    return(
        <footer className="footer">
            <div className="container">
                <div className="footer__row">
                    <div className="footer__row_column">
                        <Image src="/footer-logo.png" alt="" width={113} height={85} />
                        <p className="footer-text footer-textBox">Наші розписи, кераміка та мозаїка нададуть додаткову красу Вашим інтер'єрам, допоможуть підкреслити їхній образ, висловити Вашу індивідуальність та розкрити внутрішній світ його мешканців.</p>
                    </div>
                    <div className="footer__row_column footer__row_columnAlignLeft">
                        <h2 className="footer-title">Pages</h2>
                        <ol className="footer__row_column-list">
                            <li>
                                <Link className="footer__row_column-list-link" href="">Головна</Link>
                            </li>
                            <li>
                                <Link className="footer__row_column-list-link" href="">Про нас</Link>
                            </li>
                            <li>
                                <Link className="footer__row_column-list-link" href="">Наші роботи</Link>
                            </li>
                            <li>
                                <Link className="footer__row_column-list-link" href="">Роботи партнерів</Link>
                            </li>
                            <li>
                                <Link className="footer__row_column-list-link" href="">Блог</Link>
                            </li>
                            <li>
                                <Link className="footer__row_column-list-link" href="">Контакти</Link>
                            </li>
                            <li>
                                <Link className="footer__row_column-list-link" href="">Блог</Link>
                            </li>
                        </ol>
                    </div>
                    <div className="footer__row_column footer__row_columnBox">
                        <p className="footer-text">Polska</p>
                        <p className="footer-text">04-088</p>
                        <p className="footer-text">Warszawa, Majdańska 16/27</p>
                        <p className="footer-text">P: (+48) 730 724 244</p>
                        <p className="footer-text">E: terracottaland22@gmail.com</p>
                        <Link href="https://www.liveinternet.ru/?terracottaland.eu">
                            <Image style={{marginTop: "7px"}} src="/footerLink.gif" alt="" width={88} height={31}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="footer-down">
                <p className="footer-text">ilfau47@gmail.com</p>
            </div>
        </footer>
    )
}