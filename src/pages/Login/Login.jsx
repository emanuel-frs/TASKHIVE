import styles from './login.module.css';
import dark from './dark.module.css';
import logoDark from '../../assets/novaLogoTaskHive.png';
import logo from '../../assets/novaLogoDark.png';
import { useContext, useState } from 'react';
import { ContrastContext } from '../../context/ContrastContext';
import Header from '../../components/Header/Header';

export default function Login() {
    const contrastContext = useContext(ContrastContext);
    const [registrar, setRegistrar] = useState(false);

    if (!contrastContext) {
        return null;
    }

    const { isHighContrast } = contrastContext;

    const handleRegistrar = (e) => {
        e.preventDefault();
        setRegistrar(true);
    }

    const handleCancelar = (e) => {
        e.preventDefault();
        setRegistrar(false);
    }

    return (
        <>
            <div className={`${styles.mainContaint} ${isHighContrast ? dark.mainContaint : ''}`}>
                <Header />
                <div className={`${styles.container} ${isHighContrast ? dark.container : ''}`}>
                    {registrar ? (
                        <form className={styles.formulario}>
                            <div className={styles.imagem}>
                                {isHighContrast ?
                                    <img src={logoDark} alt="Logo" className={styles.logo} /> :
                                    <img src={logo} alt="Logo" className={styles.logo} />
                                }
                            </div>
                            <div className={styles.inputs}>
                                <div className={styles.input}>
                                    <span className={`${styles.span} ${isHighContrast ? dark.span : ''}`}>
                                        Username:
                                    </span>
                                    <input type="text" placeholder="taskhive_123"
                                        className={`${styles.inputField} ${isHighContrast ? dark.input : ''}`} />
                                </div>
                                <div className={styles.input}>
                                    <span className={`${styles.span} ${isHighContrast ? dark.span : ''}`}>
                                        Email:
                                    </span>
                                    <input type="email" placeholder="taskhive@gmail.com"
                                        className={`${styles.inputField} ${isHighContrast ? dark.input : ''}`} />
                                </div>
                                <div className={styles.input}>
                                    <span className={`${styles.span} ${isHighContrast ? dark.span : ''}`}>
                                        Password:
                                    </span>
                                    <input type="password" placeholder="12345678"
                                        className={`${styles.inputField} ${isHighContrast ? dark.input : ''}`} />
                                </div>
                            </div>
                            <div className={styles.footerR}>
                                <div className={styles.buttonsR}>
                                    <button className={`${styles.entrar} ${isHighContrast ? dark.entrar : ''}`}>
                                        Sign up
                                    </button>
                                    <button className={`${styles.cancelar} ${isHighContrast ? dark.cancelar : ''}`} onClick={handleCancelar}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form className={styles.formulario}>
                            <div className={styles.imagem}>
                                {isHighContrast ?
                                    <img src={logoDark} alt="Logo" className={styles.logo} /> :
                                    <img src={logo} alt="Logo" className={styles.logo} />
                                }
                            </div>
                            <div className={styles.inputs}>
                                <div className={styles.input}>
                                    <span className={`${styles.span} ${isHighContrast ? dark.span : ''}`}>
                                        Email:
                                    </span>
                                    <input type="email" placeholder="taskhive@gmail.com"
                                        className={`${styles.inputField} ${isHighContrast ? dark.input : ''}`} />
                                </div>
                                <div className={styles.input}>
                                    <span className={`${styles.span} ${isHighContrast ? dark.span : ''}`}>
                                        Password:
                                    </span>
                                    <input type="password" placeholder="12345678"
                                        className={`${styles.inputField} ${isHighContrast ? dark.input : ''}`} />
                                </div>
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.checkbox}>
                                    <input type="checkbox" className={styles.check} />
                                    <span className={`${styles.span} ${isHighContrast ? dark.span : ''}`}>
                                        Remember me
                                    </span>
                                </div>
                                <div className={styles.buttons}>
                                    <button className={`${styles.entrar} ${isHighContrast ? dark.entrar : ''}`}>
                                        Sign in
                                    </button>
                                    <button className={`${styles.registrar} ${isHighContrast ? dark.registrar : ''}`} onClick={handleRegistrar}>
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
