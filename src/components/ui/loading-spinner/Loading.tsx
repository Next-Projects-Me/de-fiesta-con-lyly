'use client';

import Image from "next/image";
import styles from "./Spinner.module.css";

interface Props {
    message?: string;
    className?: string;
}

export const LoadingSpinner = ({ message = "Cargando...", className }: Props) => {
    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.spinnerWrapper}>
                <div className={styles.ring}></div>
                <Image src="/imgs/Pinata-burrito.png" width={100} height={100} alt="Cargando" className={styles.logo} />
            </div>
            <p className={styles.message}>{message}</p>
        </div>
    )
}
