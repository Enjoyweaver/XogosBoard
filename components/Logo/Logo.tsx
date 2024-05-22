import clsx from "clsx";
import { ComponentProps } from "react";
import styles from "./Logo.module.css";

export function Logo({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx(className, styles.logo)} {...props}>
      <svg
        className={styles.mark}
        fill="none"
        viewBox="0 0 32 32"
        xmlns="https://twitter.com/Xogos_Gaming/header_photo"
      >
        <path
          clipRule="evenodd"
          d="M21.657 8H2l5.657 5.6v7.733L21.657 8ZM10.343 24H30l-5.657-5.6v-7.733L10.343 24Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
      <span className={styles.wordmark}>Xogos Gaming</span>
    </div>
  );
}
