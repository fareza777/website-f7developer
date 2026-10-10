import { founderSocialLinks } from "@/lib/data";
import {
  ArrowUpRightIcon,
  XLogoIcon,
  ThreadsLogoIcon,
  LinkedinLogoIcon,
} from "./icons";

const socialIcons = {
  X: XLogoIcon,
  Threads: ThreadsLogoIcon,
  LinkedIn: LinkedinLogoIcon,
};

export function SocialLinks({
  iconSize = 18,
  arrowSize = 15,
  className,
}: {
  iconSize?: number;
  arrowSize?: number;
  className?: string;
}) {
  return founderSocialLinks.map(({ name, href }) => {
    const Icon = socialIcons[name];
    return (
      <a
        key={name}
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon size={iconSize} aria-hidden="true" />
        {name}
        <ArrowUpRightIcon size={arrowSize} aria-hidden="true" />
      </a>
    );
  });
}
