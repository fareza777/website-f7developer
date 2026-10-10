import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
export default function NotFound() {
  return (
    <div className="container not-found">
      <span className="error-code">404</span>
      <h1>A world yet to be built.</h1>
      <p>We couldn’t find that page. Your next adventure is still out there.</p>
      <Link href="/" className="button button-primary">
        Back to home
        <ArrowRightIcon size={19} />
      </Link>
    </div>
  );
}
