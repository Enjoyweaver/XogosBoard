import clsx from "clsx";
import { ComponentProps } from "react";
import styles from "./Logo.module.css";
import Image from "next/image";
import icon from "@/app/icon.jpg"; // Make sure the path is correct

export function Logo({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx(className, styles.logo)} {...props}>
      <Image
        src={icon}
        alt="Xogos Gaming Logo"
        className={styles.icon}
        width={110}
        height={42}
      />
    </div>
  );
}
